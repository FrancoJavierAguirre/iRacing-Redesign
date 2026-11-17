import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const excluded = new Set(['.git','.next','.astro','.cardenal','.agents','.claude','.github','node_modules','dist','build','coverage','release','user-memory','docs','doc','ai','specs','test','tests','__tests__']);
const code = /\.(?:[cm]?[jt]sx?|astro|vue|svelte|html|css|scss)$/;
const sha = value => createHash('sha256').update(value).digest('hex');
const cachePath = root => path.join(root,'.cardenal','code-map.json');
function ensureCacheDir(root) {
  const dir = path.join(root,'.cardenal');
  if (fs.existsSync(dir) && fs.lstatSync(dir).isSymbolicLink()) throw new Error('No usar .cardenal enlazado.');
  fs.mkdirSync(dir,{recursive:true});
  if (fs.existsSync(cachePath(root)) && fs.lstatSync(cachePath(root)).isSymbolicLink()) throw new Error('No usar code-map enlazado.');
}
function route(file) {
  const parts = file.split('/');
  const app = parts.lastIndexOf('app');
  if (app >= 0 && /^(page|route)\.[jt]sx?$/.test(parts.at(-1))) return '/' + parts.slice(app+1,-1).filter(p => !/^\(.*\)$/.test(p) && !p.startsWith('@')).join('/');
  const pages = parts.lastIndexOf('pages');
  if (pages >= 0) return '/' + parts.slice(pages+1).join('/').replace(/\.(?:[jt]sx?|astro|vue)$/,'').replace(/(^|\/)index$/,'');
  return null;
}
export function buildCodeMap(target) {
  const root = fs.realpathSync(target); ensureCacheDir(root);
  let previous;
  try { previous = JSON.parse(fs.readFileSync(cachePath(root),'utf8')); } catch { /* derived cache: rebuild */ }
  const old = new Map(previous?.schemaVersion === 1 && Array.isArray(previous.files) ? previous.files.map(f => [f.path,f]) : []);
  const files = []; let parsed = 0, reused = 0, skippedLarge = 0;
  function walk(dir, prefix='') {
    for (const entry of fs.readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
      if (entry.isSymbolicLink() || entry.name.startsWith('.') || excluded.has(entry.name)) continue;
      const relative = prefix + entry.name, absolute = path.join(dir,entry.name);
      if (entry.isDirectory()) { walk(absolute, relative+'/'); continue; }
      if (!code.test(entry.name) || /\.(?:test|spec)\.[jt]sx?$/.test(entry.name)) continue;
      const stat = fs.statSync(absolute);
      if (stat.size > 512*1024) { skippedLarge++; continue; }
      const cached = old.get(relative);
      if (cached && cached.size === stat.size && cached.mtimeMs === stat.mtimeMs) { files.push(cached); reused++; continue; }
      const content = fs.readFileSync(absolute,'utf8'); parsed++;
      const symbols = []; const imports = [];
      for (const [index,line] of content.split(/\r?\n/).entries()) {
        const symbol = line.match(/^\s*(?:export\s+(?:default\s+)?)?(?:async\s+)?(?:function|class|interface|type|const|let|enum)\s+([A-Za-z_$][\w$]*)/);
        if (symbol) symbols.push({name:symbol[1],line:index+1});
        for (const match of line.matchAll(/(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)['"]([^'"]+)['"]/g)) imports.push(match[1]);
      }
      files.push({path:relative,size:stat.size,mtimeMs:stat.mtimeMs,sha256:sha(content),route:route(relative),symbols:symbols.slice(0,150),imports:[...new Set(imports)].slice(0,100)});
    }
  }
  walk(root);
  const result = {schemaVersion:1,files};
  if (JSON.stringify(previous) !== JSON.stringify(result)) fs.writeFileSync(cachePath(root),JSON.stringify(result)+'\n');
  return {file:'.cardenal/code-map.json',files:files.length,parsed,reused,skippedLarge};
}
export function findCode(target, query, limit=8) {
  if (typeof query !== 'string' || !query.trim()) throw new Error('Indicar ruta, simbolo o termino.');
  if (!Number.isInteger(limit) || limit < 1 || limit > 20) throw new Error('Limite entre 1 y 20.');
  const root = fs.realpathSync(target);
  const refresh = buildCodeMap(root); // missing/stale maps are regenerated, deleted files disappear
  const map = JSON.parse(fs.readFileSync(cachePath(root),'utf8'));
  const q = query.toLowerCase();
  const matches = map.files.map(f => {
    const symbols = f.symbols.filter(s => s.name.toLowerCase().includes(q));
    const score = (f.path.toLowerCase().includes(q)?3:0)+(f.route?.toLowerCase().includes(q)?5:0)+(symbols.length?4:0)+(f.imports.some(i=>i.toLowerCase().includes(q))?1:0);
    return {score,path:f.path,route:f.route,symbols:symbols.slice(0,8),imports:f.imports.slice(0,8)};
  }).filter(f=>f.score).sort((a,b)=>b.score-a.score || a.path.localeCompare(b.path));
  return {refresh,total:matches.length,matches:matches.slice(0,limit),note:'Indice heuristico, no AST: confirmar archivo antes de editar. No incluye contenido, secretos, tests ni dependencias instaladas. Imports son referencias, no resolucion de aliases.'};
}
