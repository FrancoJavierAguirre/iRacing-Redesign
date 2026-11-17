import { buildCodeMap } from './code-map.mjs';
import { executionDefaults } from './execution.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { configPath, defaults, render, resolveConfig } from './config.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
// En el proyecto, el runtime renderiza desde una copia sin procesar de las plantillas; en este repo, desde templates/.
const templateDir = fs.existsSync(path.join(here, 'runtime-templates')) ? path.join(here, 'runtime-templates') : path.join(here, '../templates');
const excluded = new Set(['user-memory', '.git', '.local', 'node_modules', 'dist', 'build', 'coverage', '.next', '.venv']);
export const hash = value => createHash('sha256').update(value).digest('hex');
const json = value => JSON.stringify(value, null, 2) + '\n';
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const exists = file => fs.existsSync(file);
const read = file => fs.readFileSync(file, 'utf8');
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export const normalizeEol = value => value.replace(/\r\n/g, '\n');
export const stages = ['repositorio', 'relevamiento', 'seleccion-roles', 'implementacion', 'verificacion', 'cierre'];
export const sddStages = ['specify', 'clarify', 'plan', 'tasks', 'analyze', 'implement'];
const sddDescriptions = {
  specify: ['Crear el spec de una feature (qué y por qué) desde la ficha de Cardenal', '<descripción de la necesidad>'],
  clarify: ['Resolver ambigüedades del spec con preguntas de a una antes de planificar', '<NNNN-slug, o vacío para el último spec>'],
  plan: ['Generar el plan técnico del spec sin escribir código', '<NNNN-slug, o vacío para el último spec>'],
  tasks: ['Descomponer el plan en tareas TDD con rol y archivos', '<NNNN-slug, o vacío para el último spec>'],
  analyze: ['Chequear consistencia spec-plan-tasks y cobertura antes de implementar', '<NNNN-slug, o vacío para el último spec>'],
  implement: ['Ejecutar las tareas del spec con TDD delegando por rol', '<NNNN-slug, o vacío para el último spec>']
};
const roleKeys = ['analyst', 'front', 'back', 'testing'];

// Archivos que generaba 0.x y que 1.0 ya no distribuye. Solo se retiran en upgrade.
const obsolete = ['.cardenal/templates/schemas/cardenal/schema.yaml', '.cardenal/templates/schemas/cardenal/templates/proposal.md',
  '.cardenal/templates/schemas/cardenal/templates/spec.md', '.cardenal/templates/schemas/cardenal/templates/design.md',
  '.cardenal/templates/schemas/cardenal/templates/tasks.md'];
const legacyIgnoreBlocks = ['# Cardenal: estado local y documentación privada\n/.local/sdd/\n/user-memory/\n/.cardenal/code-map.json\n/doc/private/\n'];

export function stagePrompt(target, stage) {
  if (!stages.includes(stage)) throw new Error(`Etapa inválida. Usar: ${stages.join(', ')}.`);
  return read(inside(rootPath(target), `.cardenal/prompts/${stage}.md`));
}

export function rootPath(target) {
  const root = fs.realpathSync(target);
  if (!fs.statSync(root).isDirectory()) throw new Error('El destino debe ser un directorio existente.');
  return root;
}

// No atravesar enlaces ni aceptar rutas ajenas al proyecto, incluso en fuentes.
export function inside(root, relative) {
  if (!nonempty(relative) || path.isAbsolute(relative) || relative.includes('\\') || relative.split('/').some(x => x === '..' || x === '.')) {
    throw new Error(`Ruta relativa inválida: ${relative}`);
  }
  const parts = relative.split('/');
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error(`Enlace no permitido: ${relative}`);
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return current;
}

function privatePath(relative) {
  return relative.split('/').some(p => excluded.has(p) || p === 'private' || p.startsWith('.env') || /secret|credential|\.pem$|\.key$/i.test(p));
}

// Fichas Markdown técnicas o privadas que sí pueden citarse como fuente (con hash), nunca credenciales.
export function technicalDoc(relative, config = defaults) {
  if (typeof relative !== 'string' || /secret|credential/i.test(relative)) return false;
  const bases = [config.docs.tech, config.docs.private].map(escape).join('|');
  return new RegExp(`^(?:${bases})/(?:[a-zA-Z0-9_-]+/)*[a-zA-Z0-9_-]+\\.md$`).test(relative);
}

export function inventory(target) {
  const root = rootPath(target);
  const files = [];
  let truncated = false;
  function walk(dir, prefix = '', depth = 0) {
    if (depth > 8) { truncated = true; return; }
    for (const item of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const rel = prefix + item.name;
      if (privatePath(rel) || item.isSymbolicLink()) continue;
      if (files.length >= 600) { truncated = true; return; }
      if (item.isDirectory()) walk(path.join(dir, item.name), rel + '/', depth + 1);
      else if (item.isFile()) files.push(rel);
    }
  }
  walk(root);
  return { files, truncated, note: 'Inventario de rutas; no infiere stack, negocio ni resultados de pruebas.' };
}

const emptyContext = () => ({
  schemaVersion: 1,
  sources: [],
  facts: [],
  questions: [],
  change: { actor: '', problem: '', outcome: '', scope: '', acceptance: '', valueSignal: '', evidence: [] }
});

const template = (relative, config) => render(read(path.join(templateDir, relative)), config);
const commandFile = (stage, config) => {
  const [description, hint] = sddDescriptions[stage];
  return `---\ndescription: ${description}\nargument-hint: "${hint}"\n---\n\n# /sdd:${stage}\n\nSeguir \`.cardenal/sdd/${stage}.md\` (Cardenal ${render('{{version}}', config)}) para: **$ARGUMENTS**\n\nCargar solo ese archivo y las fuentes que indique; no leer las demás etapas.\n`;
};
const skillFile = stage => `---\nname: sdd-${stage}\ndescription: ${sddDescriptions[stage][0]}.\n---\n\nSeguir \`.cardenal/sdd/${stage}.md\` con la necesidad o el slug indicado por el usuario. Cargar solo ese archivo y las fuentes que indique.\n`;

// Archivos administrados por Cardenal: se regeneran en upgrade porque no contienen datos del proyecto.
export function managedFiles(config) {
  const files = new Map([
    ['.cardenal/core.mjs', read(path.join(here, 'core.mjs'))],
    ['.cardenal/execution.mjs', read(path.join(here, 'execution.mjs'))],
    ['.cardenal/code-map.mjs', read(path.join(here, 'code-map.mjs'))],
    ['.cardenal/config.mjs', read(path.join(here, 'config.mjs'))],
    ['.cardenal/cli.mjs', read(path.join(here, 'cli.mjs'))],
    ['.cardenal/memory.mjs', read(path.join(here, 'memory.mjs'))],
    ['.cardenal/team.mjs', read(path.join(here, 'team.mjs'))],
    ['.cardenal/usage.mjs', read(path.join(here, 'usage.mjs'))],
    ['.cardenal/adapters.mjs', read(path.join(here, 'adapters.mjs'))],
    ['.cardenal/onboarding.mjs', read(path.join(here, 'onboarding.mjs'))]
  ]);
  for (const name of ['execution-policy', 'codex', 'fix', 'proyect']) files.set(`.cardenal/templates/${name}.md`, template(`${name}.md`, config));
  for (const role of [...roleKeys, 'forge']) files.set(`.cardenal/agents/${role}.md`, template(`agents/${role}.md`, config));
  for (const name of ['fix', 'proyect']) for (const base of ['.claude', '.agents', '.github']) files.set(`${base}/skills/${name}/SKILL.md`, template(`${name}.md`, config));
  const feature = template('feature.md', config), init = template('inicializate.md', config), skill = template('SKILL.md', config);
  const team = template('team.md', config), guide = template('context-guide.md', config);
  for (const [relative, content] of [
    ['.cardenal/templates/inicializate.md', init], ['.cardenal/templates/feature.md', feature],
    ['.cardenal/templates/ficha-mvp-del-equipo.md', template('ficha-mvp-del-equipo.md', config)],
    ['.cardenal/templates/team.md', team], ['.cardenal/team.md', team],
    ['.cardenal/templates/SKILL.md', skill], ['.cardenal/templates/context-guide.md', guide], ['.cardenal/README.md', guide],
    ['.claude/skills/feature/SKILL.md', feature], ['.agents/skills/feature/SKILL.md', feature], ['.github/skills/feature/SKILL.md', feature],
    ['.claude/skills/inicializate/SKILL.md', init], ['.agents/skills/inicializate/SKILL.md', init], ['.github/skills/inicializate/SKILL.md', init],
    ['.claude/skills/cardenal-relevar/SKILL.md', skill]
  ]) files.set(relative, content);
  for (const stage of stages) {
    const content = template(`prompts/${stage}.md`, config);
    files.set(`.cardenal/prompts/${stage}.md`, content);
    files.set(`.cardenal/templates/prompts/${stage}.md`, content);
  }
  for (const stage of sddStages) {
    files.set(`.cardenal/sdd/${stage}.md`, template(`sdd/${stage}.md`, config));
    files.set(`.claude/commands/sdd/${stage}.md`, commandFile(stage, config));
    files.set(`.agents/skills/sdd-${stage}/SKILL.md`, skillFile(stage));
    files.set(`.github/skills/sdd-${stage}/SKILL.md`, skillFile(stage));
  }
  for (const name of ['spec', 'plan', 'tasks']) files.set(`.cardenal/sdd/templates/${name}.md`, template(`sdd/templates/${name}.md`, config));
  // Copia sin procesar: permite regenerar con otra configuración sin el repo de Cardenal.
  const walk = (dir, prefix = '') => fs.readdirSync(dir, { withFileTypes: true }).flatMap(item => item.isDirectory() ? walk(path.join(dir, item.name), `${prefix}${item.name}/`) : [`${prefix}${item.name}`]);
  for (const relative of walk(templateDir)) files.set(`.cardenal/runtime-templates/${relative}`, read(path.join(templateDir, relative)));
  if (config.generateAgents) for (const role of roleKeys) files.set(`.claude/agents/${config.roles[role]}.md`, template(`agents/${role}.md`, config));
  if (config.generateAgents) files.set('.claude/agents/forge.md', template('agents/forge.md', config));
  // Fuera de .cardenal la marca distingue archivos propios de Cardenal de comandos o agentes del equipo con el mismo nombre.
  for (const [relative, content] of files) if (!relative.startsWith('.cardenal/') && !legacySkills.has(relative)) files.set(relative, content + managedMark);
  return files;
}

export const managedMark = '\n<!-- cardenal:managed -->\n';
// Skills que instalaba 0.x sin marca; upgrade puede reemplazarlas.
const legacySkills = new Set(['feature', 'inicializate'].flatMap(name => ['.claude', '.agents', '.github'].map(base => `${base}/skills/${name}/SKILL.md`)).concat('.claude/skills/cardenal-relevar/SKILL.md'));
const projectOwned = new Set(['.cardenal/execution-policy.json', '.cardenal/code-map.json', '.cardenal/config.json', '.cardenal/constitution.md', '.cardenal/context.json', '.cardenal/repository-context.json', '.cardenal/board.json']);
// upgrade reescribe solo lo que Cardenal instaló: su carpeta (salvo datos del proyecto), skills 0.x o archivos con la marca.
const upgradable = (relative, current) => (relative.startsWith('.cardenal/') && !projectOwned.has(relative)) || legacySkills.has(relative) || current.includes(managedMark.trim());

function projectFiles(root, config, stored) {
  const files = new Map();
  if (!exists(inside(root, '.cardenal/execution-policy.json'))) files.set('.cardenal/execution-policy.json', json(executionDefaults));
  // Esqueletos de documentación: se crean una vez y el asistente los completa desde fuentes observadas.
  const documents = {
    [`${config.docs.public}/README.md`]: '# Documentación del producto\n\nEstado: pendiente de relevamiento.\n\n- [Funcionalidades](funcionalidades.md)\n',
    [`${config.docs.public}/funcionalidades.md`]: '# Funcionalidades\n\nEstado: pendiente de relevamiento. Describir usuarios, objetivos, reglas y límites en lenguaje de producto. No afirmar capacidades no observadas.\n',
    [`${config.docs.tech}/README.md`]: '# Documentación técnica\n\nEstado: pendiente de relevamiento.\n\n- [Dominio e integración](sistema.md)\n- [Dependencias](dependencies/README.md)\n',
    [`${config.docs.tech}/sistema.md`]: '# Dominio e integración\n\nEstado: pendiente de relevamiento. Documentar módulos, contratos, datos, autenticación, reglas y límites con referencias al código. Sin secretos.\n',
    [`${config.docs.tech}/dependencies/README.md`]: '# Dependencias\n\nEstado: pendiente de relevamiento. Registrar propósito, versión observada, puntos de uso y enlaces a fichas breves. Preguntar por bibliotecas propias o que necesiten atención especial.\n',
    [`${config.docs.private}/README.md`]: `# Documentación confidencial\n\n${config.privateDocsTracked ? 'Carpeta versionada por convención del repo: no guardar claves, tokens ni datos personales reales.' : 'Carpeta ignorada por Git. Puede contener reglas comerciales confidenciales, acuerdos internos y fichas de bibliotecas propietarias en dependencies/. No guardar claves, tokens ni datos personales reales.'} La documentación técnica compartible vive en ${config.docs.tech}/.\n`,
    '.cardenal/constitution.md': template('constitution.md', config)
  };
  for (const [relative, content] of Object.entries(documents)) if (!exists(inside(root, relative))) files.set(relative, content);
  if (!stored) files.set(configPath, json(config));
  return files;
}

function trackedPrivate(root, config) {
  const paths = ['.local/sdd', 'user-memory', ...(config.privateDocsTracked ? [] : [config.docs.private])];
  try {
    const tracked = execFileSync('git', ['-C', root, 'ls-files', '--', ...paths], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    if (tracked.trim()) throw new Error('Hay archivos privados ya rastreados por Git. Revisarlos antes de integrar.');
  } catch (error) {
    if (error.message.startsWith('Hay archivos')) throw error;
    if (error.code !== 'ENOENT' && !String(error.stderr).includes('not a git repository')) throw error;
  }
}

function ignoredDocs(root, config) {
  try {
    execFileSync('git', ['-C', root, 'check-ignore', '-q', '--no-index', '--', `${config.docs.public}/README.md`], { stdio: 'pipe' });
    return [`${config.docs.public} está ignorado por .gitignore: la documentación compartida no se versionaría. Elegir otra ruta en ${configPath} o ajustar .gitignore.`];
  } catch { return []; }
}

// integrate crea lo que falta y rechaza diferencias; upgrade además reescribe archivos administrados por Cardenal.
export function integrate(target, { dryRun = false, upgrade = false } = {}) {
  const root = rootPath(target);
  const { config, stored } = resolveConfig(root);
  trackedPrivate(root, config);
  const managed = managedFiles(config);
  const generated = new Map([...managed, ...projectFiles(root, config, stored)]);
  const migrations = [];
  for (const name of ['context.json', 'repository-context.json', 'board.json']) {
    const oldPath = `doc/cardenal/${name}`, newPath = `.cardenal/${name}`;
    if (exists(inside(root, oldPath))) {
      const content = read(inside(root, oldPath));
      JSON.parse(content.replace(/^﻿/, ''));
      if (exists(inside(root, newPath)) && normalizeEol(read(inside(root, newPath))) !== normalizeEol(content)) throw new Error(`Conflicto de migración: ${oldPath} y ${newPath}. No se escribió ningún archivo.`);
      if (!exists(inside(root, newPath))) generated.set(newPath, content);
      migrations.push(oldPath);
    }
  }
  if (!generated.has('.cardenal/context.json') && !exists(inside(root, '.cardenal/context.json'))) generated.set('.cardenal/context.json', json(emptyContext()));
  if (!generated.has('.cardenal/repository-context.json') && !exists(inside(root, '.cardenal/repository-context.json'))) generated.set('.cardenal/repository-context.json', json({ schemaVersion: 1, sources: [], facts: [], questions: [] }));
  if (!generated.has('.cardenal/board.json') && !exists(inside(root, '.cardenal/board.json'))) generated.set('.cardenal/board.json', json({ schemaVersion: 1, agreements: {}, tasks: [] }));

  const actions = [];
  for (const [relative, content] of generated) {
    const file = inside(root, relative);
    if (!exists(file)) actions.push({ path: relative, content, operation: 'create' });
    else if (normalizeEol(read(file)) !== normalizeEol(content)) {
      if (!(upgrade && managed.has(relative) && upgradable(relative, read(file)))) throw new Error(`Conflicto: ${relative} ya tiene contenido diferente. No se escribió ningún archivo.${managed.has(relative) ? ' Si es una instalación anterior de Cardenal, usar upgrade.' : ''}`);
      actions.push({ path: relative, content, operation: 'update' });
    }
  }
  const removals = upgrade ? obsolete.filter(relative => exists(inside(root, relative))) : [];
  const ignoreFile = inside(root, '.gitignore');
  const originalIgnore = exists(ignoreFile) ? read(ignoreFile) : '';
  let ignore = originalIgnore;
  if (upgrade) for (const legacy of legacyIgnoreBlocks) ignore = normalizeEol(ignore).replace(legacy, '');
  // Al final para prevalecer sobre negaciones previas en este archivo.
  const block = `# Cardenal: estado local${config.privateDocsTracked ? '' : ' y documentación privada'}\n/.local/sdd/\n/user-memory/\n/.cardenal/code-map.json\n${config.privateDocsTracked ? '' : `/${config.docs.private}/\n`}`;
  if (!normalizeEol(ignore).endsWith(block)) ignore += (ignore && !ignore.endsWith('\n') ? '\n' : '') + block;
  if (ignore !== originalIgnore) actions.push({ path: '.gitignore', content: ignore, operation: exists(ignoreFile) ? 'append-ignore' : 'create' });
  if (!dryRun) {
    for (const action of actions) {
      const file = inside(root, action.path);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, action.content, { flag: action.operation === 'create' ? 'wx' : 'w' });
    }
    for (const relative of removals) fs.unlinkSync(inside(root, relative));
    for (const oldPath of migrations) fs.unlinkSync(inside(root, oldPath));
  }
  const codeMap = dryRun ? { pending: true } : buildCodeMap(root);
  const leftovers = upgrade && exists(inside(root, 'openspec')) ? ['openspec/ quedó intacto: contiene specs y cambios del proyecto. Migrar lo vigente a la documentación y specs/ antes de retirarlo.'] : [];
  return { dryRun, codeMap, config, migrated: migrations, removed: removals,
    changes: actions.map(({ path: p, operation }) => ({ path: p, operation })),
    warnings: [...ignoredDocs(root, config), ...leftovers],
    note: `No modifica instrucciones existentes (eso lo hace map-assistants con un bloque delimitado). Las specs viven en ${config.specs}/ y se producen con /sdd:*.` };
}

export function validate(target, { scope = 'change' } = {}) {
  if (!['change', 'repository'].includes(scope)) throw new Error('Ámbito de validación inválido.');
  const root = rootPath(target);
  const { config } = resolveConfig(root);
  const data = JSON.parse(read(inside(root, scope === 'repository' ? '.cardenal/repository-context.json' : '.cardenal/context.json')).replace(/^﻿/, ''));
  const errors = [], blockers = [];
  const error = message => errors.push(message);
  if (data.schemaVersion !== 1) error('schemaVersion debe ser 1.');
  for (const key of ['sources', 'facts', 'questions']) if (!Array.isArray(data[key])) error(`${key} debe ser una lista.`);
  if (errors.length) return { valid: false, ready: false, errors, blockers };
  const allIds = new Set();
  for (const item of [...data.sources, ...data.facts, ...data.questions]) {
    if (!item || !nonempty(item.id) || allIds.has(item.id)) error('Cada entrada necesita un ID único.');
    else allIds.add(item.id);
  }
  if (errors.length) return { valid: false, ready: false, errors, blockers };
  const sources = new Map(data.sources.map(s => [s.id, s]));
  for (const source of data.sources) {
    if (!['user', 'file'].includes(source.kind) || !nonempty(source.reference)) error(`${source.id}: tipo/referencia de fuente inválidos.`);
    if (source.kind === 'file') {
      try {
        if (privatePath(source.reference) && !technicalDoc(source.reference, config)) throw new Error('fuente privada o sensible no permitida en este registro compartido');
        const file = inside(root, source.reference);
        if (!fs.statSync(file).isFile()) throw new Error('no es archivo');
        if (hash(fs.readFileSync(file)) !== source.sha256) throw new Error('hash ausente u obsoleto');
      } catch (e) { error(`${source.id}: ${e.message}`); }
    }
  }
  const facts = new Map(data.facts.map(f => [f.id, f]));
  for (const fact of data.facts) {
    if (!['product', 'technical'].includes(fact.area) || !nonempty(fact.statement)) error(`${fact.id}: área o afirmación inválida.`);
    if (!['confirmed', 'observed', 'proposed', 'superseded'].includes(fact.status)) error(`${fact.id}: estado inválido.`);
    const source = sources.get(fact.source);
    if (fact.status === 'confirmed' && source?.kind !== 'user') error(`${fact.id}: confirmado requiere una fuente de usuario.`);
    if (fact.status === 'observed' && source?.kind !== 'file') error(`${fact.id}: observado requiere una fuente de archivo.`);
    if (fact.source && !source) error(`${fact.id}: fuente inexistente.`);
    if (fact.status === 'superseded' && (!facts.has(fact.replacedBy) || fact.replacedBy === fact.id || facts.get(fact.replacedBy)?.status === 'superseded')) error(`${fact.id}: indicar reemplazo vigente.`);
  }
  for (const question of data.questions) {
    if (!nonempty(question.question) || typeof question.blocking !== 'boolean' || !['open', 'resolved', 'deferred'].includes(question.status)) error(`${question.id}: pregunta inválida.`);
    if (question.status === 'resolved') {
      const answer = facts.get(question.resolution);
      if (!answer || answer.status !== 'confirmed') error(`${question.id}: resolución debe referenciar una decisión confirmada.`);
    } else if (question.blocking) blockers.push(`${question.id}: ${question.question}`);
  }
  if (scope === 'repository') {
    for (const area of ['product', 'technical']) if (!data.facts.some(f => f.area === area && ['observed', 'confirmed'].includes(f.status))) blockers.push(`Registrar contexto ${area} con fuente; si falta información, preguntar sobre el repositorio.`);
    return { valid: !errors.length, ready: !errors.length && !blockers.length, scope, errors, blockers, note: 'Relevamiento del repositorio; no requiere feature ni autoriza implementación.' };
  }
  const change = data.change;
  if (!change || typeof change !== 'object' || Array.isArray(change)) error('Falta ficha change.');
  else {
    for (const field of ['actor', 'problem', 'outcome', 'scope', 'acceptance', 'valueSignal']) if (!nonempty(change[field])) blockers.push(`Completar change.${field}.`);
    if (!Array.isArray(change.evidence)) error('change.evidence debe ser una lista de IDs de hechos.');
    else {
      for (const id of change.evidence) if (!facts.has(id) || !['confirmed', 'observed'].includes(facts.get(id).status)) error(`Evidencia de cambio no vigente o no confirmada/observada: ${id}`);
      const chosen = change.evidence.map(id => facts.get(id)).filter(Boolean);
      if (!chosen.some(f => f.area === 'product' && f.status === 'confirmed')) blockers.push('Falta evidencia confirmada de producto para este cambio.');
      if (!chosen.some(f => f.area === 'technical' && f.status === 'observed')) blockers.push('Falta evidencia técnica observada para este cambio.');
    }
  }
  return { valid: !errors.length, ready: !errors.length && !blockers.length, errors, blockers,
    note: 'Ready indica consistencia estructural para revisión. No demuestra veracidad, suficiencia semántica ni aprobación humana del cambio.' };
}
