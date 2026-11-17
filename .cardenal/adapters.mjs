import fs from 'node:fs';
import path from 'node:path';
import { inside, rootPath, normalizeEol } from './core.mjs';
import { render, resolveConfig } from './config.mjs';

const agentsBlock = '## Cardenal\nAplicar primero .cardenal/templates/execution-policy.md; en Codex tambien .cardenal/templates/codex.md.\nPara relevar el repositorio usar .cardenal/templates/inicializate.md (/inicializate); para trabajar una feature usar .cardenal/templates/feature.md (/feature). /feature orquesta relevamiento, roles, verificación y cierre; spec, plan, tareas e implementación se ejecutan con /sdd:* (fuente: .cardenal/sdd/<etapa>.md) en {{specs}}/<NNNN-slug>/. Roles: analyst = {{roles.analyst}}, front = {{roles.front}}, back = {{roles.back}}, testing = {{roles.testing}}. Inicializate no exige una feature. Trabajar en la rama y checkout actuales; no crear ramas, worktrees o PR ni cambiar ramas o hacer merge salvo pedido explícito. Cargar solo el prompt de la etapa activa en .cardenal/prompts y las fuentes pertinentes; no releer todas las guías. Preguntar dudas que alteren comportamiento o selección de roles antes del trabajo dependiente; usar QA manual por defecto; automatizado solo por pedido explicito. No inventar decisiones, pruebas, agentes ni revisiones. Al iniciar una conversación leer {{docs.public}}/README.md y {{docs.tech}}/README.md si existen, luego solo fichas y dependencies pertinentes. Respetar .cardenal/constitution.md. Documentar cada feature implementada en ambas audiencias, no solo en {{specs}}/. Los JSON de control viven en .cardenal; la documentación Markdown vive en {{docs.public}} y {{docs.tech}}; {{docs.privatePolicy}}; user-memory es local e ignorado por Git. No copiar secretos ni transcripciones. Validar estructura y comportamiento por separado. Solo contadores del proveedor acreditan consumo de tokens.';
const begin = '<!-- cardenal:adapter:start -->', end = '<!-- cardenal:adapter:end -->';

// Reemplaza solo el bloque delimitado de Cardenal; el resto de cada archivo de instrucciones se conserva.
export function mapAssistants(target, { dryRun = false, upgrade = false } = {}) {
  const root = rootPath(target);
  const { config } = resolveConfig(root);
  const blocks = {
    'AGENTS.md': render(agentsBlock, config),
    'CLAUDE.md': '@AGENTS.md\n\nCardenal: importación compatible para sesiones que no cargan AGENTS.md directamente. No duplicar el contenido común aquí.',
    '.github/copilot-instructions.md': 'Para el workflow de Cardenal, leer [AGENTS.md](../AGENTS.md) en la raíz del repositorio. Mantener allí las reglas comunes; no copiar la memoria privada en instrucciones compartidas.'
  };
  const actions = [];
  for (const [relative, content] of Object.entries(blocks)) {
    const file = inside(root, relative);
    const original = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    const block = `${begin}\n${content}\n${end}\n`;
    const text = normalizeEol(original);
    const start = text.indexOf(begin), stop = text.indexOf(end);
    if (start !== -1 || stop !== -1) {
      if (text.includes(normalizeEol(block))) continue;
      if (!upgrade || start === -1 || stop < start) throw new Error(`Bloque existente diferente en ${relative}; revisar antes de cambiarlo${upgrade ? '' : ' o usar upgrade'}.`);
      const after = text.slice(stop + end.length).replace(/^\n/, '');
      actions.push({ relative, file, content: text.slice(0, start) + block + after });
    } else actions.push({ relative, file, content: original + (original && !original.endsWith('\n') ? '\n' : '') + '\n' + block });
  }
  if (!dryRun) for (const action of actions) { fs.mkdirSync(path.dirname(action.file), { recursive: true }); fs.writeFileSync(action.file, action.content); }
  return { dryRun, changed: actions.map(a => a.relative),
    runtimes: { astra: 'Codex → AGENTS.md + .agents/skills', claude: 'Claude Code/Desktop Code → CLAUDE.md importa AGENTS.md; /sdd:* en .claude/commands y agentes por rol en .claude/agents', copilot: 'Copilot → .github/copilot-instructions.md + AGENTS.md donde se soporte' },
    note: 'Preserva instrucciones existentes fuera del bloque de Cardenal. No cambia modelo, permisos ni settings globales. Probar descubrimiento en cada entorno.' };
}
