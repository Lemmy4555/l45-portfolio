const del = require('del');

let variables = require('../../globals')

module.exports = () => {
  return del([
    `${variables.config.paths.dist.relative}/**/*`,
  ]);
}