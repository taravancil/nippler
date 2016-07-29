var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify-html', function() {
  return gulp.src('html/*')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build-css', function() {
  return gulp.src('css/*')
    .pipe(cssmin())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('build/css'));
})

gulp.task('build',  ['minify-html', 'build-css']);
