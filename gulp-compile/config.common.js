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
config.paths.dist.browser = {}
config.paths.dist.browser.relative = `${config.paths.dist.relative}/browser`
config.paths.dist.browser.absolute = path.resolve(config.paths.dist.absolute, 'browser')
config.paths.dist.server = {}
config.paths.dist.server.relative = `${config.paths.dist.relative}/server`
config.paths.dist.server.absolute = path.resolve(config.paths.dist.absolute, 'server')

config.paths.ngDist = {}
config.paths.ngDist.relative = `./ng-build`
config.paths.ngDist.absolute = path.resolve(basePath, "ng-build")
config.paths.ngDist.browser = {}
config.paths.ngDist.browser.relative = `${config.paths.ngDist.relative}/browser`
config.paths.ngDist.browser.absolute = path.resolve(config.paths.ngDist.absolute, 'browser')
config.paths.ngDist.server = {}
config.paths.ngDist.server.relative = `${config.paths.ngDist.relative}/server`
config.paths.ngDist.server.absolute = path.resolve(config.paths.ngDist.absolute, 'server')


module.exports = config