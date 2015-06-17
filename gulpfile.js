/*
 |--------------------------------------------------------------------------
 | Gulp compile script
 |
 |  Commands:
 |
 | - gulp (Run the default build function)
 | - gulp watch (Watch files for changes and build on a change)
 |
 | Flags:
 |  --min (bundle the es5 build into a single, minified out file)
 |  --debug (Build and output pretty, source mapped errors to console)
 |--------------------------------------------------------------------------
 */


/*| ------------ INCLUDES ------------ |*/
var gulp = require("gulp");
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var flag = require('yargs').argv;
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
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(_if(flag.debug, transpile()))
        .pipe(transpile())
        .pipe(sourcemaps.write(paths.sourcemaps))
        .pipe(gulp.dest(paths.out));

    // Not functioning as expected... yet
    gulp.src(paths.tranpiled)
        .pipe(_if(flag.min, bundle({
            formatter: 'bundle',
            basePath: paths.out
        })))
        .pipe(_if(flag.min, minify()))
        .pipe(_if(flag.min, gulp.dest(paths.min)));
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
    gulp.start('build');
    gulp.start('copy');
    watch(paths.js, function () {
        gulp.start('build');
        gulp.start('copy')
    })
});
gulp.task('default', ['build', 'copy']);