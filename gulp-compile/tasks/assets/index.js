const gulp = require('gulp')
const changed = require('gulp-changed')

const variables = require('../../globals')

module.exports = () => {
  return gulp
    .src(`${variables.config.paths.assets.relative}/**/*.*`)
    .pipe(
      changed(`${variables.config.paths.dist.browser.relative}/assets/`, {
        hasChanged: (stream, sourceFile, destPath) => {
          return changed.compareLastModifiedTime(stream, sourceFile, destPath)
        }
      })
    )
    .pipe(gulp.dest(`${variables.config.paths.dist.browser.relative}/assets/`))
}
