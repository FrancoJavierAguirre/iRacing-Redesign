import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

export const executionDefaults = {
  schemaVersion: 1,
  qa: { mode: 'manual', browser: false },
  runtime: { mode: 'host', docker: 'explicit_only' },
  agents: { mode: 'cardenal_only', maxConcurrent: 1, lowerTierRoles: ['forge', 'front', 'back'] },
  context: { reload: 'changed_only' }, workflow: { resume: 'first_incomplete' },
  verification: { scope: 'affected_only', repeat: 'relevant_change_or_failure' },
  retry: { sameFailure: 1 }, scope: { newFindings: 'record_and_classify' },
  completion: { stop: 'acceptance_met' },
  registry: { forge: '.cardenal/agents/forge.md', front: '.cardenal/agents/front.md', back: '.cardenal/agents/back.md', analyst: '.cardenal/agents/analyst.md', testing: '.cardenal/agents/testing.md' },
  providers: {}
};
const text = v => typeof v === 'string' && v.trim().length > 0;
const read = file => JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
// Fail closed on traversal and symlinks, including parent directories.
function local(root, relative) {
  if (!text(relative) || path.isAbsolute(relative) || relative.includes('\\') || relative.split('/').some(p => !p || p === '.' || p === '..')) throw new Error('Ruta local invalida.');
  let current = fs.realpathSync(root);
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error('No se permiten enlaces.');
  }
  return current;
}
export function validateExecution(p) {
  const errors = [];
  if (p?.schemaVersion !== 1) errors.push('schemaVersion debe ser 1.');
  for (const [section, key, expected] of [
    ['qa','mode','manual'], ['qa','browser',false], ['runtime','mode','host'], ['runtime','docker','explicit_only'],
    ['agents','mode','cardenal_only'], ['context','reload','changed_only'], ['workflow','resume','first_incomplete'],
    ['verification','scope','affected_only'], ['verification','repeat','relevant_change_or_failure'],
    ['scope','newFindings','record_and_classify'], ['completion','stop','acceptance_met']
  ]) if (p?.[section]?.[key] !== expected) errors.push(`${section}.${key}: default requerido ${expected}; permisos por contrato, no globales.`);
  if (!Number.isInteger(p?.agents?.maxConcurrent) || p.agents.maxConcurrent < 1 || p.agents.maxConcurrent > 4) errors.push('maxConcurrent debe estar entre 1 y 4.');
  if (!Number.isInteger(p?.retry?.sameFailure) || p.retry.sameFailure < 0 || p.retry.sameFailure > 1) errors.push('sameFailure debe ser 0 o 1.');
  if (!Array.isArray(p?.agents?.lowerTierRoles) || !['forge','front','back'].every(r => p.agents.lowerTierRoles.includes(r))) errors.push('Forge, Front y Back requieren modelo inferior.');
  for (const role of ['forge','front','back','analyst','testing']) if (!/^\.cardenal\/agents\/[a-z][a-z0-9-]*\.md$/.test(p?.registry?.[role] ?? '')) errors.push(`Agente Cardenal requerido: ${role}.`);
  if (!p?.providers || typeof p.providers !== 'object' || Array.isArray(p.providers)) errors.push('providers debe ser un catalogo.');
  for (const [provider, catalog] of Object.entries(p?.providers ?? {})) {
    if (!text(provider) || !text(catalog?.reference) || !Array.isArray(catalog?.models)) { errors.push('Catalogo requiere reference y models.'); continue; }
    const ids = new Set();
    for (const m of catalog.models) {
      if (!text(m?.id) || ids.has(m.id) || !Number.isInteger(m.tier) || m.tier < 0 || !Array.isArray(m.roles) || !m.roles.every(text)) errors.push(`Modelo invalido/duplicado en ${provider}.`);
      ids.add(m?.id);
    }
  }
  return { valid: !errors.length, errors };
}
export function loadExecution(root) {
  const file = local(root, '.cardenal/execution-policy.json');
  const policy = fs.existsSync(file) ? read(file) : structuredClone(executionDefaults);
  const result = validateExecution(policy);
  if (!result.valid) throw new Error(result.errors.join('\n'));
  return policy;
}
// Latest ordered instruction wins. Events refer to this contract only; never reuse a past task's consent.
function permission(contract, capability) {
  let allowed = false;
  for (const event of contract.instructions ?? []) {
    if (event.capability === capability && text(event.reference) && typeof event.allowed === 'boolean') allowed = event.allowed;
  }
  return allowed;
}
export function checkAction(policy, contract, action) {
  contract ??= {}; action ??= {};
  const errors = [...validateExecution(policy).errors];
  if (!text(contract?.taskId) || !text(contract?.objective) || !text(contract?.acceptance)) errors.push('Contrato requiere taskId, objective y acceptance.');
  if (!Array.isArray(contract?.instructions) || contract.instructions.some(e => !text(e?.reference) || !['docker','qa','browser','checks'].includes(e?.capability) || typeof e.allowed !== 'boolean')) errors.push('instructions invalidas.');
  if (!['edit','check','qa','browser','docker','dispatch','close'].includes(action?.kind)) errors.push('Accion desconocida.');
  if (contract?.acceptanceMet === true && action?.kind !== 'close') errors.push('Aceptacion cumplida: detener, no ampliar trabajo.');
  if (['qa','browser','docker'].includes(action?.kind) && !permission(contract, action.kind)) errors.push(`${action.kind} requiere permiso vigente explicito.`);
  if (action?.kind === 'browser' && !permission(contract,'qa')) errors.push('Navegador QA requiere autorizacion QA.');
  const checks = (contract?.instructions ?? []).filter(e => e.capability === 'checks');
  if (['check','qa','browser'].includes(action?.kind) && checks.at(-1)?.allowed === false) errors.push('El usuario pidio no repetir pruebas.');
  if (action?.kind === 'check') {
    if (action.scope !== 'affected_only' || !text(action.check) || !text(action.fingerprint)) errors.push('Check requiere nombre, alcance afectado y fingerprint de fuentes.');
    if ((contract.verifications ?? []).some(v => v.fingerprint === action.fingerprint && v.check === action.check && v.result === 'passed')) errors.push('Evidencia vigente: no repetir check.');
  }
  if (action?.kind === 'dispatch' && (!Number.isInteger(action.activeAgents) || action.activeAgents < 0 || action.activeAgents >= policy.agents.maxConcurrent)) errors.push('Limite de agentes o contador invalido.');
  if (action?.sameFailureRetries !== undefined && (!Number.isInteger(action.sameFailureRetries) || action.sameFailureRetries < 0 || action.sameFailureRetries > policy.retry.sameFailure)) errors.push('Cambiar hipotesis o informar bloqueo; no repetir el mismo fallo.');
  if (action?.kind === 'close' && (contract?.acceptanceMet !== true || !text(contract?.humanApprovalReference))) errors.push('Cierre requiere aceptacion y aprobacion humana real.');
  return { allowed: !errors.length, errors };
}
export function dispatchPlan(root, request) {
  const policy = loadExecution(root);
  const gate = checkAction(policy, request.contract, { kind: 'dispatch', activeAgents: request.activeAgents });
  if (!gate.allowed) throw new Error(gate.errors.join('\n'));
  const role = request.role;
  if (!Object.hasOwn(policy.registry, role)) throw new Error('Rol no registrado en Cardenal.');
  if (role === 'testing' && !permission(request.contract,'qa')) throw new Error('Testing requiere QA explicito.');
  const guidePath = policy.registry[role];
  const guide = fs.readFileSync(local(root, guidePath), 'utf8');
  const catalog = policy.providers[request.provider];
  const parent = catalog?.models.find(m => m.id === request.coordinatorModel);
  if (!parent || !text(request.runtimeReference) || !Array.isArray(request.availableModels) || request.modelSelectionSupported !== true) throw new Error('Falta catalogo/coordinador o capacidad real de seleccionar modelo; no heredar ni inventar agentes.');
  const candidates = catalog.models.filter(m => request.availableModels.includes(m.id) && m.roles.includes(role) && (!policy.agents.lowerTierRoles.includes(role) || m.tier < parent.tier));
  candidates.sort((a,b) => a.tier-b.tier || a.id.localeCompare(b.id));
  if (!candidates.length) throw new Error('No hay modelo inferior compatible disponible; informar bloqueo sin fallback al coordinador.');
  return { role, guidePath, guideSha256: createHash('sha256').update(guide).digest('hex'), provider: request.provider, model: candidates[0].id,
    coordinatorModel: parent.id, catalogReference: catalog.reference, runtimeReference: request.runtimeReference,
    context: { taskId: request.contract.taskId, objective: request.contract.objective, acceptance: request.contract.acceptance },
    instructions: 'Invocar el agente registrado de Cardenal con este modelo y su guia; transmitir solo tarea, fuentes pertinentes y contrato vigente. No crear una persona generica, no delegar recursivamente, no heredar todo el historial. Si el runtime no puede, informar bloqueo.',
    executed: false };
}
export function executionCommand(command, root, requestFile) {
  const policy = loadExecution(root);
  if (command === 'policy-check') return { ...validateExecution(policy), policy };
  const request = read(local(root, requestFile));
  if (command === 'flow-status') {
    if (!Array.isArray(request.stages) || request.stages.some(s => !text(s?.id) || typeof s.complete !== 'boolean' || (s.complete && !text(s.evidence)))) throw new Error('Etapas requieren id, complete y evidence si completas.');
    const next = request.stages.find(s => !s.complete);
    return { next: next?.id ?? 'review', instruction: next ? 'Retomar solo esta etapa y sus dependencias pendientes.' : 'No reiniciar etapas; solicitar check humano si falta.' };
  }
  return command === 'dispatch-plan' ? dispatchPlan(root, request) : checkAction(policy, request.contract, request.action);
}
