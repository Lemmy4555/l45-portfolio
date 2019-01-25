const gulp = require('gulp')
const spawn = require('child_process').spawn
const concat = require('gulp-concat');
const rename = require("gulp-rename");

const globals = require('@gulp-compile/globals')
const Log = require('@gulp-compile/Log')
const log = new Log('ng-build')

module.exports = () => {
  let compileTimeout = null

  return new Promise((resolve, reject) => {
    let params = ['build']
    if (globals.config.watch) {
      params.push('--watch')
    }
    if (globals.config.sourcemaps) {
      params.push('--source-map')
    }
    if (globals.config.production) {
      params.push('--prod')
    }
    
    ngBuild = spawn('ng', params, { shell: true })

    ngBuild.stdout.on('data', (data) => {
      console.info(log.message(data.toString()))
      
      if (compileTimeout) {
        clearTimeout(compileTimeout)
        compileTimeout = null
      }
      compileTimeout = setTimeout(() => {
        if (globals.config.production) {
          concatAndCopyProductionFilesInDist()
        } else {
          copyDevFilesInDist()
        }
      }, 1000)
      
    })

    ngBuild.stderr.on('data', (data) => {
      console.error(log.message(data.toString()))
    })

    ngBuild.on('exit', function (code) {
      const error = `exit con codice: ${code.toString()}`
      console.error(log.message(error))
      reject(error)
    })

    console.info(log.message("Build di Angular in background"))
    resolve()
  })
}

const concatAndCopyProductionFilesInDist = ()  => {
  gulp.src([
    `${globals.config.paths.ngDist.relative}/runtime.js`,
    `${globals.config.paths.ngDist.relative}/polyfills.js`,
    `${globals.config.paths.ngDist.relative}/vendor.js`
  ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(`${globals.config.paths.dist.relative}/`))

  gulp.src([
    `${globals.config.paths.ngDist.relative}/main.js`
  ])
  .pipe(rename(`app.js`))
  .pipe(gulp.dest(`${globals.config.paths.dist.relative}/`))
}

const copyDevFilesInDist = ()  => {
  gulp.src([
    `${globals.config.paths.ngDist.relative}/runtime.js`,
    `${globals.config.paths.ngDist.relative}/runtime.js.map`,
    `${globals.config.paths.ngDist.relative}/polyfills.js`,
    `${globals.config.paths.ngDist.relative}/polyfills.js.map`,
    `${globals.config.paths.ngDist.relative}/vendor.js`,
    `${globals.config.paths.ngDist.relative}/vendor.js.map`,
    `${globals.config.paths.ngDist.relative}/main.js`,
    `${globals.config.paths.ngDist.relative}/main.js.map`
  ])
  .pipe(gulp.dest(`${globals.config.paths.dist.relative}/`))
}