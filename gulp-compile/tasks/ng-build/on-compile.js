const gulp = require('gulp')
const concat = require('gulp-concat');
const rename = require("gulp-rename");

const globals = require('../../globals')
const Log = require('../../Log')
const log = new Log('ng-build.on-compile')

const concatAndCopyProductionFilesInDist = ()  => {
  gulp.src([
    `${globals.config.paths.ngDist.browser.relative}/runtime.js`,
    `${globals.config.paths.ngDist.browser.relative}/polyfills.js`,
    `${globals.config.paths.ngDist.browser.relative}/vendor.js`
  ])
  .pipe(concat('vendors.js'))
  .pipe(gulp.dest(`${globals.config.paths.dist.browser.relative}/`))

  gulp.src([
    `${globals.config.paths.ngDist.browser.relative}/main.js`
  ])
  .pipe(rename(`app.js`))
  .pipe(gulp.dest(`${globals.config.paths.dist.browser.relative}/`))
}

const copyProductionFilesInDist = () => {
  gulp.src([
    `${globals.config.paths.ngDist.browser.relative}/runtime.js`,
    `${globals.config.paths.ngDist.browser.relative}/polyfills.js`,
    `${globals.config.paths.ngDist.browser.relative}/vendor.js`,
    `${globals.config.paths.ngDist.browser.relative}/main.js`,
  ])
  .pipe(gulp.dest(`${globals.config.paths.dist.browser.relative}/`))
}

const copyDevFilesInDist = ()  => {
  gulp.src([
    `${globals.config.paths.ngDist.browser.relative}/runtime.js`,
    `${globals.config.paths.ngDist.browser.relative}/runtime.js.map`,
    `${globals.config.paths.ngDist.browser.relative}/polyfills.js`,
    `${globals.config.paths.ngDist.browser.relative}/polyfills.js.map`,
    `${globals.config.paths.ngDist.browser.relative}/vendor.js`,
    `${globals.config.paths.ngDist.browser.relative}/vendor.js.map`,
    `${globals.config.paths.ngDist.browser.relative}/main.js`,
    `${globals.config.paths.ngDist.browser.relative}/main.js.map`
  ])
  .pipe(gulp.dest(`${globals.config.paths.dist.browser.relative}/`))
}

module.exports = {
  concatAndCopyProductionFilesInDist,
  copyProductionFilesInDist,
  copyDevFilesInDist
}