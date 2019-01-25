const gulp = require('gulp')
const fs = require('fs')

const variables = require('@gulp-compile/globals')
const Log = require('@gulp-compile/Log')
const log = new Log('font-awesome')

module.exports = () => {
  const dist = variables.config.paths.dist.absolute
  return Promise.all([
    nodeModuleAssetCopy('@fortawesome/fontawesome-free', 'webfonts', 'fa-*.*', `${dist}/webfonts`),
    nodeModuleAssetCopy('jstree', 'dist/themes/default', '*px.png', `${dist}/etc/designs/ddp-cms/assets/images`)
  ])
}

const nodeModuleAssetCopy = (nodeModuleName, assetFolderRelativePath, assetFilesWildcard, destPath) => {
  return new Promise((resolve, reject) => {
    const moduleDir = `${variables.config.paths.cwd.relative}/node_modules/${nodeModuleName}/${assetFolderRelativePath}`
    
    if (!fs.existsSync(moduleDir)) {
      const error = `${moduleDir} non esiste, verificare che ${nodeModuleName} sia installato: npm i ${nodeModuleName}`
      console.error(log.message(error))
      return reject(error)
    }

    if (fs.readdirSync(moduleDir).length == 0) {
      const error = `${moduleDir} è vuota, verificare che ${nodeModuleName} sia installato: npm i ${nodeModuleName}`
      console.error(log.message(error))
      return reject(error)
    }

    const filesWildcard = `${moduleDir}/${assetFilesWildcard}`

    return gulp.src(filesWildcard).pipe(gulp.dest(destPath)).on('end', () => {
      console.info(log.message(copySuccess), filesWildcard, destPath)
      resolve()
    })
  })
}

const copySuccess =
`
%s
  copiato correttamente in:
%s`