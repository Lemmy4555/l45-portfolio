const gulp = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')

const variables = require('../../globals')

module.exports = () => {
  let stream = gulp.src([`${variables.config.paths.src.relative}/index.scss`, `${variables.config.paths.src.relative}/vendors.scss`])

  if (variables.config.sourceMaps) {
    stream = stream.pipe(sourcemaps.init())
  }

  stream = stream.pipe(
    sass({
      includePaths: [variables.config.paths.src.relative],
      outputStyle: variables.config.uglify ? 'compressed' : 'expanded'
    }).on('error', sass.logError)
  )

  if (variables.config.sourceMaps) {
    stream = stream.pipe(sourcemaps.write('./'))
  }

  return stream.pipe(gulp.dest(variables.config.paths.dist.browser.relative))
}
