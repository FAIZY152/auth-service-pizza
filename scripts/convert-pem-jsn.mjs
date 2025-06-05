import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import rsaPemToJwk from 'rsa-pem-to-jwk';

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = fs.readFileSync(
  path.join(__dirname, '../keys/private.pem'),
  'utf8',
);

const jwk = rsaPemToJwk(privateKey, { use: 'sig' }, 'public');

console.log(JSON.stringify(jwk));
