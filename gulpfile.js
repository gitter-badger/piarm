/**
 * ES6 Transpiler script for gulp
 *
 * @author Julien Vincent
 */

/*
 |--------------------------------------------------------------------------
 | Commands:
 |
 | - gulp
 | - gulp watch
 |
 | Tags:
 | - --min
 |--------------------------------------------------------------------------
 */


/*| ------------ INCLUDES ------------ |*/
var gulp = require("gulp");
var tag = require('yargs').argv;
var _if = require('gulp-if');
var transpile = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var bundle = require('gulp-es6-module-transpiler');
var minify = require('gulp-uglify');

/*| ------------ SOURCE INPUT AND OUTPUT ------------ |*/
var paths = {
    js: './src/piarm/**/*.js',
    sourcemaps: './sourcemaps',
    tranpiled: './src/build/piarm.js',
    out: './src/build',
    min: './src/build/min'
};
/*| ------------ FILES TO BE COPIED TO ./src/build ------------ |*/
var files = [
    './src/piarm/.env'
];

/*| ------------ BUILDER ------------ |*/
gulp.task('build', function () {
    gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(transpile())
        .pipe(sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.out));

    // Not functioning as expected... yet
    gulp.src(paths.tranpiled)
        .pipe(_if(tag.min, bundle({
            formatter: 'bundle',
            basePath: paths.out
        })))
        .pipe(_if(tag.min, minify()))
        .pipe(_if(tag.min, gulp.dest(paths.min)));
});

/*| ------------ COPY ------------ |*/
gulp.task('copy', function () {
    files.forEach(function (file) {
        gulp.src(file)
            .pipe(gulp.dest(paths.out))
    });
});

/*| ------------ RUNNABLE ------------ |*/
gulp.task('watch', function () {
    gulp.watch(paths.js, ['build', 'copy']);
});
gulp.task('default', ['build', 'copy']);