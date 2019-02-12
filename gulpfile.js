require('module-alias/register')

const gulp = require('gulp')
const runSequence = require('run-sequence')

const browserSyncTask = require('./gulp-compile/tasks/browser-sync')
const sassTask = require('./gulp-compile/tasks/sass')
const ngBuildTask = require('./gulp-compile/tasks/ng-build')
const onNgBuildCompile = require('./gulp-compile/tasks/ng-build/on-compile')
const webpackServerTask = require('./gulp-compile/tasks/webpack-server')
const htmlTask = require('./gulp-compile/tasks/html')
const nodeModulesAssetsTask = require('./gulp-compile/tasks/node-modules-assets')
const assetsTask = require('./gulp-compile/tasks/assets')
const cleanDistTask = require('./gulp-compile/tasks/clean-dist')
const printConfigTask = require('./gulp-compile/tasks/print-config')
const setConfigTask = require('./gulp-compile/tasks/set-config')
const readVersionTask = require('./gulp-compile/tasks/read-version')
const releaseTask = require('./gulp-compile/tasks/release')
const zipTask = require('./gulp-compile/tasks/zip')
const expressTask = require('./gulp-compile/tasks/express')

let globals = require('./gulp-compile/globals')

gulp.task('release', () => {
  return releaseTask()
})

gulp.task('read-version', () => {
  return readVersionTask()
})

gulp.task('set-config:prod', () => {
  return setConfigTask('production')
})

gulp.task('set-config:dev', () => {
  return setConfigTask('development')
})

gulp.task('set-config:analyze', () => {
  return setConfigTask('analyze')
})

gulp.task('print-config', () => {
  return printConfigTask()
})

gulp.task('config:dev', () => {
  globals.config = require('./gulp-compile/config.dev')
})

gulp.task('clean-dist:all', () => {
  return cleanDistTask('all')
})

gulp.task('clean-dist:browser', () => {
  return cleanDistTask('browser')
})

gulp.task('clean-dist:server', () => {
  return cleanDistTask('server')
})

gulp.task('html', () => {
  return htmlTask()
})

gulp.task('node-modules-assets', () => {
  return nodeModulesAssetsTask()
})

gulp.task('sass', () => {
  return sassTask()
})

gulp.task('scripts:browser', () => {
  let task = null
  let onCompile = null
  if (globals.config.production) {
    task = 'l45-portfolio:build:production'
    if (globals.config.concatProdFiles) {
      onCompile = onNgBuildCompile.concatAndCopyProductionFilesInDist
    } else {
      onCompile = onNgBuildCompile.copyProductionFilesInDist
    }
  } else {
    task = 'l45-portfolio:build'
    onCompile = onNgBuildCompile.copyDevFilesInDist
  }

  return ngBuildTask(task, onCompile)
})

gulp.task('scripts:server', () => {
  let task = null
  if (globals.config.production) {
    task = 'l45-portfolio:server:production'
  } else {
    task = 'l45-portfolio:server'
  }

  return ngBuildTask(task, null)
})

gulp.task('server-scripts', () => {
  return webpackServerTask()
})

gulp.task('assets', () => {
  return assetsTask()
})

gulp.task('browser-sync', () => {
  return browserSyncTask()
})

gulp.task('zip', () => {
  return zipTask()
})

gulp.task('express', () => {
  return expressTask()
})

gulp.task('sass:watch', () => {
  return gulp.watch('./src/**/*.scss', gulp.series('sass'))
})

gulp.task('html:watch', () => {
  return gulp.watch('./src/index.html', gulp.series('html'))
})

gulp.task('assets:watch', () => {
  return gulp.watch('./src/assets/**/*.*', gulp.series('assets'))
})

gulp.task('build:browser', done => {
  gulp.series(
    gulp.parallel('scripts:browser', 'html', 'node-modules-assets', 'sass', 'assets'),
  )(done)
})

gulp.task('build:server', done => {
  gulp.series(
    'scripts:server',
    'server-scripts'
  )(done)
})

gulp.task('build:browser:dev', done => {
  setConfigTask('development')
  gulp.series(
    'print-config',
    'clean-dist:browser',
    'build:browser'
  )(done)
})

gulp.task('build:server:dev', done => {
  setConfigTask('development')
  gulp.series(
    'print-config',
    'clean-dist:server',
    'build:server'
  )(done)
})

gulp.task('build:all:dev', done => {
  setConfigTask('development')
  gulp.series(
    'print-config',
    'clean-dist:all',
    gulp.parallel('build:browser', 'build:server')
  )(done)
})

gulp.task('build:browser:prod', done => {
  setConfigTask('production')
  gulp.series(
    'print-config',
    'clean-dist:browser',
    'build:browser'
  )(done)
})

gulp.task('build:server:prod', done => {
  setConfigTask('production')
  gulp.series(
    'print-config',
    'clean-dist:server',
    'build:server'
  )(done)
})

gulp.task('build:all:prod', done => {
  setConfigTask('production')
  gulp.series(
    'print-config',
    'clean-dist:all',
    gulp.parallel('build:browser', 'build:server')
  )(done)
})

gulp.task('build:browser:prod:release', done => {
  setConfigTask('production')
  gulp.series(
    'print-config',
    'clean-dist:browser',
    'release',
    'build:browser',
    'zip',
  )(done)
})

gulp.task('build:browser:dev:serve', done => {
  setConfigTask('development')
  globals.config.watch = true
  gulp.series(
    'print-config',
    'clean-dist:browser',
    'build:browser',
    gulp.parallel('html:watch', 'sass:watch', 'assets:watch', 'browser-sync'),
  )(done)
})

gulp.task('build:server:dev:serve', done => {
  setConfigTask('development')
  gulp.series(
    'print-config',
    'clean-dist:server',
    'build:server',
    'express'
  )(done)
})

gulp.task('build:browser:prod:serve', done => {
  setConfigTask('production')
  globals.config.watch = true
  gulp.series(
    'print-config',
    'clean-dist:browser',
    'build:browser',
    gulp.parallel('html:watch', 'sass:watch', 'assets:watch', 'browser-sync'),
  )(done)
})

gulp.task('build:server:prod:serve', done => {
  setConfigTask('production')
  gulp.series(
    'print-config',
    'clean-dist:server',
    'build:server',
    'express'
  )(done)
})

gulp.task('default', gulp.series('build:browser:dev:serve'))