const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

const globals = require('../../globals')

module.exports = () => {
  let stream = gulp.src([`${globals.config.paths.src.relative}/index.scss`, `${globals.config.paths.src.relative}/vendors.scss`])

  if (globals.config.sourceMaps) {
    stream = stream.pipe(sourcemaps.init())
  }

  stream = stream.pipe(
    sass({
      includePaths: [globals.config.paths.src.relative],
      outputStyle: globals.config.uglify ? 'compressed' : 'expanded'
    }).on('error', sass.logError)
  )

  if (globals.config.sourceMaps) {
    stream = stream.pipe(sourcemaps.write('./'))
  }

  return stream.pipe(gulp.dest(globals.config.paths.dist.browser.relative))
}
