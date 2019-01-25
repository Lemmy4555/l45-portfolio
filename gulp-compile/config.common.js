const path = require('path')
const basePath = path.resolve(__dirname, '..')

config = {
  srcFolder: 'src',
  distFolder: 'dist',
  paths: {
    cwd: {
      absolute: basePath,
      relative: '.'
    }
  },
  serverPort: 3000
}
config.paths.src = {}
config.paths.src.relative = `./${config.srcFolder}`
config.paths.src.absolute = path.resolve(basePath, config.srcFolder)

config.paths.assets = {}
config.paths.assets.relative = `${config.paths.src.relative}/assets`

config.paths.dist = {}
config.paths.dist.relative = `./${config.distFolder}`
config.paths.dist.absolute = path.resolve(basePath, config.distFolder)

config.paths.ngDist = {}
config.paths.ngDist.relative = `./ng-build`
config.paths.ngDist.absolute = path.resolve(basePath, "ng-build")


module.exports = config