import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Config from '../src/config/fileImport'; // Adjust the path as necessary
import rsaPemToJwk from 'rsa-pem-to-jwk';

// ES module replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = Config.PRIVATE_KEY;
if (!privateKey) {
  throw new Error('PRIVATE_KEY is not defined in the configuration.');
}

const jwk = rsaPemToJwk(privateKey, { use: 'sig' }, 'public');

console.log(JSON.stringify(jwk));
