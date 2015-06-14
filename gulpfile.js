/**
 * ES6 Transpiler script for gulp
 *
 * @author Julien Vincent
 */

var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var stream = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var paths = {
    js: './src/piarm/**/*.js'
};

gulp.task('build', function () {
    browserify({
        entries: './src/piarm/piarm.js',
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(stream('piarm.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./src/build'));
});

gulp.task('watch', function () {
    gulp.watch(paths.js, ['build']);
});

gulp.task('default', ['build']);