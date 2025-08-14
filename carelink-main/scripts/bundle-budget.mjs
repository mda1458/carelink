import { logger } from 'packages/utils/src/logger';
import fs from 'node:fs';
import path from 'node:path';
import gzipSize from 'gzip-size';

const apps = (process.env.APPS || '@carelink/web,@carelink/platform,@carelink/telehealth,@carelink/app')
  .split(',').map(s => s.trim());

const ROUTE_BUDGET = 250 * 1024; // 250KB gz
const CHUNK_BUDGET = 120 * 1024; // 120KB gz

const failures = [];

for (const app of apps) {
  const name = app.split('/')[1];
  const nextDir = path.join(process.cwd(), 'apps', name, '.next');

  if (!fs.existsSync(nextDir)) {
    failures.push(`[${app}] .next not found (did you build this app?)`);
    continue;
  }

  const files = [];
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (p.endsWith('.js')) files.push(p);
    }
  })(nextDir);

  for (const f of files) {
    const src = fs.readFileSync(f);
    const gz = gzipSize.sync(src);
    const rel = f.replace(nextDir + path.sep, '');

    const isRoute = rel.includes('/app/') && rel.endsWith('.js');
    if (isRoute && gz > ROUTE_BUDGET) failures.push(`[${app}] ROUTE ${rel} = ${(gz/1024).toFixed(1)}KB > 250KB`);
    if (gz > CHUNK_BUDGET) failures.push(`[${app}] CHUNK ${rel} = ${(gz/1024).toFixed(1)}KB > 120KB`);
  }
}

if (failures.length) {
  console.error('Bundle budget failures:\n' + failures.join('\n'));
  process.exit(1);
}
logger.log('Bundle budgets OK for apps:', apps.join(', '));
