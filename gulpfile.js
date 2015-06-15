/**
 * ES6 Transpiler script for gulp
 *
 * @author Julien Vincent
 */

/*| ------------ INCLUDES ------------ |*/
var gulp = require("gulp");
var tag = require('yargs').argv;
var _if = require('gulp-if');
var bundle = require('gulp-es6-module-transpiler');
var transpile = require('gulp-es6-transpiler');
var minify = require('gulp-uglify');

/*| ------------ SOURCE INPUT AND OUTPUT ------------ |*/
var paths = {
    js: './src/piarm/**/*.js',
    out: './src/build'
};
/*| ------------ FILES TO BE COPIED TO ./src/build ------------ |*/
var files = [
    './src/piarm/.env'
];

/*| ------------ BUILDER ------------ |*/
gulp.task('build', function () {
    gulp.src('./src/piarm/piarm.js')
        .pipe(bundle({
            formatter: 'bundle',
            basePath: './src/piarm/'
        }))
        .pipe(transpile({
            "disallowUnknownReferences": false,
            "disallowDuplicated": false
        }))
        .pipe(_if(tag.min, minify()))
        .pipe(gulp.dest(paths.out));
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