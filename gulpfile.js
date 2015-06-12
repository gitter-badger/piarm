/**
 * ES6 Transpiler script for gulp
 *
 * @author Julien Vincent
 */

var gulp = require("gulp");
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
    browserify({
        entries: './src/piarm/piarm.js',
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('piarm.js'))
        .pipe(gulp.dest('./src/build'));
});