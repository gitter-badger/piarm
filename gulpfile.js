/**
 * ES6 Transpiler script for gulp
 *
 * @author Julien Vincent
 */

var gulp = require("gulp");
var del = require('del');
var fs = require('fs');
var tag = require('yargs').argv;
var _if = require('gulp-if');
var bundle = require('gulp-es6-module-transpiler');
var transpile = require('gulp-es6-transpiler');
var minify = require('gulp-uglify');

var paths = {
    js: './src/piarm/**/*.js',
    out: './src/build/src/*/**'
};

var files = [
    './src/build/src/piarm/piarm.js',
    './src/build/src/piarm/piarm.js.map',
    './src/piarm/.env'
];

gulp.task('build', function () {
    gulp.src('./src/piarm/piarm.js')
        .pipe(bundle({
            formatter: 'bundle',
            basePath: './'
        }))
        .pipe(transpile())
        .pipe(_if(tag.min, minify()))
        .pipe(gulp.dest('./src/build'));
});

gulp.task('copy', function () {
    files.forEach(function (file) {
        gulp.src(file)
            .pipe(gulp.dest('./src/build'))
    });
    del(['./src/build/src']);
});

gulp.task('watch', function () {
    gulp.watch(paths.js, ['build', 'copy']);
});

gulp.task('default', ['build', 'copy']);