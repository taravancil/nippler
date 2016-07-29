var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

gulp.task('minify-html', function() {
  return gulp.src('html/*')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('build-css', function() {
  return gulp.src('css/*')
    .pipe(cssmin())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}));
})

gulp.task('build', ['minify-html', 'build-css']);

gulp.task('server', function() {
  browserSync({
    server: 'build'
  });
});

gulp.task('watch', ['build', 'server'], function() {
  gulp.watch('css/*', ['build-css']);
  gulp.watch('html/*', ['minify-html', browserSync.reload()]);
});
