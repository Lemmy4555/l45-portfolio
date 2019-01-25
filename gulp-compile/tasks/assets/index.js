const gulp = require('gulp')
const changed = require('gulp-changed')

const variables = require('@gulp-compile/globals')

module.exports = () => {
  return gulp
    .src(`${variables.config.paths.assets.relative}/**/*.*`)
    .pipe(
      //changed(`${variables.config.paths.dist.relative}/etc/designs/ddp-cms/assets/`, {
      changed(`${variables.config.paths.dist.relative}/assets/`, {
        hasChanged: (stream, sourceFile, destPath) => {
          return changed.compareLastModifiedTime(stream, sourceFile, destPath)
        }
      })
    )
    .pipe(gulp.dest(`${variables.config.paths.dist.relative}/assets/`))
}
