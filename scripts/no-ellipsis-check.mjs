import { globby } from 'globby';
import fs from 'node:fs/promises';

const files = await globby([
  '**/*.*',
  '!**/node_modules/**','!**/.next/**','!**/dist/**','!**/out/**',
  '!scripts/no-ellipsis-check.mjs'
]);

const offenders = [];
const reUnicode = /\u2026/;                 // real ellipsis …
const reCommentEllipsis = /\/\/\s*\.\.\./;  // // ...
const reBlockCommentEllipsis = /\/\*[^*]*\.\.\.[\s\S]*?\*\//; // /* ... */

for (const f of files) {
  const t = await fs.readFile(f, 'utf8').catch(()=> '');
  // Only flag unicode ellipsis or ... in comments. Ignore spread syntax `{...x}` etc.
  if (reUnicode.test(t) || reCommentEllipsis.test(t) || reBlockCommentEllipsis.test(t)) {
    offenders.push(f);
  }
}

if (offenders.length) {
  console.error('Ellipsis placeholders (… or comment "...") found in:\n' + offenders.join('\n'));
  process.exit(1);
}
console.log('No placeholder ellipses detected.');
