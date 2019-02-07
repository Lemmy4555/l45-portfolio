const gulp = require('gulp')
const nunjucksRender = require('gulp-nunjucks-render')

const globals = require('../../globals')

module.exports = () => {
  return gulp
    .src(`${globals.config.paths.src.absolute}/index.html`)
    .pipe(
      nunjucksRender({
        data: { 
          production: globals.config.production,
          concatProdFiles: globals.config.concatProdFiles
        },
        envOptions: {
          lstripBlocks: true,
          trimBlocks: true,
          tags: {
            blockStart: '<%',
            blockEnd: '%>',
            variableStart: '<$',
            variableEnd: '$>',
            commentStart: '<#',
            commentEnd: '#>'
          }
        }
      })
    )
    .pipe(gulp.dest(globals.config.paths.dist.browser.absolute))
}
