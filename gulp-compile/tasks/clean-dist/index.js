const del = require('del');

let variables = require('../../globals')

module.exports = (config) => {
  let path = null
  switch (config) {
    case 'browser': path = `${variables.config.paths.dist.browser.relative}/**/*`; break;
    case 'server': path = `${variables.config.paths.dist.server.relative}/**/*`; break;
    default: path = `${variables.config.paths.dist.relative}/**/*`; break;
  }

  return del([
    path
  ]);
}