import fs from 'node:fs';
import path from 'node:path';

export const version = '1.0.0';
export const configPath = '.cardenal/config.json';

// Valores por defecto de proyectos nuevos. La configuración pertenece al proyecto: se crea una vez y no se sobrescribe.
export const defaults = Object.freeze({
  schemaVersion: 1,
  docs: { public: 'docs/public', tech: 'docs/tech', private: 'docs/private' },
  privateDocsTracked: false,
  specs: 'specs',
  roles: { analyst: 'analyst', front: 'front', back: 'back', testing: 'testing' },
  generateAgents: true,
  qualityGates: []
});

const safeRelative = value => typeof value === 'string' && /^[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*$/.test(value);
const roleName = value => typeof value === 'string' && /^[a-z][a-z0-9-]{0,40}$/.test(value);

// Instalaciones 0.x usaban doc/public y doc/tech; se respetan en lugar de mover documentación existente.
export function detectLayout(root) {
  const has = relative => fs.existsSync(path.join(root, ...relative.split('/')));
  for (const base of ['docs', 'doc']) {
    for (const name of ['public', 'Public']) {
      if (has(`${base}/${name}`)) return { public: `${base}/${name}`, tech: `${base}/tech`, private: `${base}/private` };
    }
    if (has(`${base}/tech`)) return { public: `${base}/public`, tech: `${base}/tech`, private: `${base}/private` };
  }
  return { ...defaults.docs };
}

export function checkConfig(config) {
  const errors = [];
  if (config.schemaVersion !== 1) errors.push('schemaVersion debe ser 1.');
  for (const key of ['public', 'tech', 'private']) if (!safeRelative(config.docs?.[key])) errors.push(`docs.${key} debe ser una ruta relativa simple.`);
  if (!safeRelative(config.specs)) errors.push('specs debe ser una ruta relativa simple.');
  for (const key of Object.keys(defaults.roles)) if (!roleName(config.roles?.[key])) errors.push(`roles.${key} debe ser un nombre de agente en minúsculas.`);
  if (typeof config.privateDocsTracked !== 'boolean') errors.push('privateDocsTracked debe ser booleano.');
  if (typeof config.generateAgents !== 'boolean') errors.push('generateAgents debe ser booleano.');
  if (!Array.isArray(config.qualityGates) || config.qualityGates.some(g => typeof g !== 'string' || !g.trim())) errors.push('qualityGates debe ser una lista de comandos.');
  return errors;
}

export function resolveConfig(root) {
  const file = path.join(root, '.cardenal', 'config.json');
  const stored = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8').replace(/^﻿/, '')) : null;
  const base = { ...defaults, docs: stored ? { ...defaults.docs } : detectLayout(root) };
  const config = { ...base, ...stored, docs: { ...base.docs, ...stored?.docs }, roles: { ...defaults.roles, ...stored?.roles } };
  const errors = checkConfig(config);
  if (errors.length) throw new Error(`Configuración inválida en ${configPath}: ${errors.join(' ')}`);
  return { config, stored: Boolean(stored) };
}

const gatesText = gates => gates.length ? gates.map(g => `\`${g}\``).join(', ') : 'los quality gates del repo (tests, chequeo de tipos y lint que el proyecto defina)';

// Las plantillas usan {{clave}}; un marcador desconocido es un error de plantilla, no texto a publicar.
export function render(template, config) {
  const values = {
    'docs.public': config.docs.public,
    'docs.tech': config.docs.tech,
    'docs.private': config.docs.private,
    'docs.privatePolicy': config.privateDocsTracked ? `${config.docs.private} se versiona según la convención del repo` : `${config.docs.private} queda local e ignorado por Git para información confidencial`,
    specs: config.specs,
    'roles.analyst': config.roles.analyst,
    'roles.front': config.roles.front,
    'roles.back': config.roles.back,
    'roles.testing': config.roles.testing,
    qualityGates: gatesText(config.qualityGates),
    version
  };
  return template.replace(/\{\{([a-zA-Z.]+)\}\}/g, (match, key) => {
    if (!Object.hasOwn(values, key)) throw new Error(`Marcador desconocido en plantilla: ${match}`);
    return values[key];
  });
}
