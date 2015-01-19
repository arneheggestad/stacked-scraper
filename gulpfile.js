var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    scriptPaths = [
      'gulpfile.js', 'index.js', 'lib/*.js',
      '!test/**'
                  ]
    ;

gulp.task('jshint', function () {
  gulp.src(scriptPaths)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish-ex'), { verbose: true });
});

gulp.task('jscs', function () {
  return gulp.src(scriptPaths)
    .pipe(jscs());
});

gulp.task('quality', [ 'jshint', 'jscs' ], function () {
  gulp.watch(scriptPaths, [ 'jshint', 'jscs' ]);
});
