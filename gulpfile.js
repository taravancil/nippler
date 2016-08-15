var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var babel = require('rollup-plugin-babel');
var rollup = require('rollup').rollup;
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var intoStream = require('into-stream');

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
    .pipe(reload({stream: true}));
})

gulp.task('build-js', function() {
  return rollup({
    entry: './js/index.js',
    plugins: [
      babel({
        exclude: ['node_modules']
      })
    ]
  }).then(function(bundle) {
      var result = bundle.generate({
        format: 'cjs'
      });

      var bundler = browserify(intoStream(result.code));

      bundler.bundle()
        .on('error', gutil.log.bind(gutil))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/js/'))
        .pipe(reload({stream: true}));
    });
});

gulp.task('build', ['minify-html', 'build-css', 'build-js']);

gulp.task('server', function() {
  browserSync({
    server: 'build'
  });
});

gulp.task('start', ['build', 'server']);

gulp.task('watch', ['build', 'server'], function() {
  gulp.watch('css/*', ['build-css']);
  gulp.watch('html/*', ['minify-html', reload]);
  gulp.watch('js/**', ['build-js']);
});
