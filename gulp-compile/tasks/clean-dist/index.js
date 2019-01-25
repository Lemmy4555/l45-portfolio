const del = require('del');

let variables = require('@gulp-compile/globals')

module.exports = () => {
  return del([
    `${variables.config.paths.dist.relative}/**/*`,
  ]);
}