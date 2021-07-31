const pkg = require('../package.json')
const pkgLock = require('../package-lock.json')

if (pkg.version !== pkgLock.version) {
  throw new Error('Manifest version mismatch with lock file')
}
