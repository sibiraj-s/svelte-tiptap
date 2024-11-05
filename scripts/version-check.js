import fs from 'node:fs/promises';
import path from 'node:path';

const readJson = async (fileName) => {
  const filePath = path.join(import.meta.dirname, fileName);
  const file = await fs.readFile(filePath, 'utf8');
  return JSON.parse(file);
};

const pkg = await readJson('../package.json');
const pkgLock = await readJson('../package-lock.json');

if (pkg.version !== pkgLock.version) {
  throw new Error('Manifest version mismatch with lock file');
}
