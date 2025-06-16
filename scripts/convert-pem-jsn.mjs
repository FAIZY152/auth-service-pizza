import fs from 'fs';
import rsaPemToJwk from 'rsa-pem-to-jwk';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = fs.readFileSync(
  path.join(__dirname, '../keys/private.pem'),
  'utf8',
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const jwk = rsaPemToJwk(privateKey, { use: 'sig' }, 'public');

console.log(JSON.stringify(jwk));
