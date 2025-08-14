import { logger } from 'packages/utils/src/logger';
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const allow = JSON.parse(fs.readFileSync('scripts/license-allowlist.json','utf8')).allow;

function run(cmd){ return execSync(cmd, {stdio: ['ignore','pipe','pipe']}).toString(); }

const out = run('npx license-checker --json');
const data = JSON.parse(out);
const bad = [];
for (const [pkg, info] of Object.entries(data)) {
  const lic = (info.licenses || '').toString();
  if (!allow.includes(lic)) bad.push({pkg, lic});
}
if (bad.length){
  console.error('Disallowed licenses found:');
  for (const b of bad) console.error(`${b.pkg} -> ${b.lic}`);
  process.exit(1);
}
logger.log('Licenses OK');
