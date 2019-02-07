const gulp = require('gulp')
const zip = require('gulp-zip');

const globals = require('../../globals')


module.exports = () => {
  return gulp.src(globals.config.paths.dist.browser.relative)
      .pipe(zip(`cms-custom-${globals.readVersion()}.zip`))
      .pipe(gulp.dest('./zip'))
}
