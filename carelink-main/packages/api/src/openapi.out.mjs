import { logger } from 'packages/utils/src/logger';
import { writeFileSync } from 'node:fs';
import { openapi } from './openapi.js';
writeFileSync('packages/api/openapi.json', JSON.stringify(openapi, null, 2));
logger.log('openapi.json written');
