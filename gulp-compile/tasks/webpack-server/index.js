const gulp = require('gulp')
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('../../../webpack.server.config.js');

const globals = require('../../globals')
const Log = require('../../Log')
const log = new Log('webpack-server')

module.exports = () => {
  if (globals.config.watch) {
    webpackConfig.watch = true
  }
  return gulp.src('.')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(globals.config.paths.dist.server.relative));
}
