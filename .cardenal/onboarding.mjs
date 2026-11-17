import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { inside, rootPath, integrate, inventory } from './core.mjs';
import { mapAssistants } from './adapters.mjs';

// Sin dependencias externas: los specs viven en specs/<NNNN-slug>/ y se producen con /sdd:*.
const assistants = new Set(['claude', 'astra', 'codex', 'copilot']);

export function initialize(target, { assistant, session = 'inicio', dryRun = false, detail = false } = {}) {
  const root = rootPath(target);
  const detected = [['claude', '.claude'], ['codex', '.agents'], ['copilot', '.github/copilot-instructions.md']].filter(([, p]) => fs.existsSync(inside(root, p))).map(([a]) => a);
  if (!assistant) return { ready: false, candidates: detected, questions: ['¿Qué asistente usás: claude, astra/codex o copilot? Las carpetas existentes no prueban cuál está activo.'] };
  if (!assistants.has(assistant)) throw new Error('Asistente inválido: claude, astra, codex o copilot.');
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/.test(session)) throw new Error('Identificador local inválido.');
  // Preflight completo de archivos propios antes de escribir.
  const preview = integrate(root, { dryRun: true });
  mapAssistants(root, { dryRun: true });
  const local = inside(root, `user-memory/sessions/${session}`);
  const plan = { assistant, session, ...(detail ? { inventory: inventory(root) } : {}), memory: path.relative(root, local), warnings: preview.warnings, ready: false };
  if (dryRun) return { ...plan, dryRun: true };
  try { execFileSync('git', ['-C', root, 'rev-parse', '--show-toplevel'], { stdio: 'pipe' }); }
  catch (error) {
    if (!String(error.stderr).includes('not a git repository')) throw error;
    execFileSync('git', ['-C', root, 'init'], { stdio: 'pipe' });
  }
  integrate(root);
  mapAssistants(root);
  // No crear memoria hasta comprobar exclusión real, incluso con negaciones anidadas.
  execFileSync('git', ['-C', root, 'check-ignore', '--quiet', '--', `${local}/checkpoint.json`], { stdio: 'pipe' });
  fs.mkdirSync(local, { recursive: true });
  return { ...plan, setupComplete: true, next: 'Cargar prompt repositorio y ejecutar validate-repo. No se requiere una feature. Después usar /feature para iniciar un cambio (spec, plan e implementación vía /sdd:*).' };
}

// Actualiza una instalación anterior: regenera archivos de Cardenal y su bloque de instrucciones; conserva datos y documentación.
export function upgrade(target, { dryRun = false } = {}) {
  const root = rootPath(target);
  if (!fs.existsSync(inside(root, '.cardenal'))) throw new Error('No hay una instalación de Cardenal para actualizar; usar inicializate.');
  // Preflight de ambos pasos antes de escribir cualquiera.
  const preview = integrate(root, { dryRun: true, upgrade: true });
  const instructions = mapAssistants(root, { dryRun: true, upgrade: true }).changed;
  if (dryRun) return { ...preview, instructions };
  const result = integrate(root, { upgrade: true });
  mapAssistants(root, { upgrade: true });
  return { ...result, instructions };
}
