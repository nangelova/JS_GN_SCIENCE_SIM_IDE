'use strict';


var paths = (function () {

    var appDir = 'app';
    var jsDir = appDir + '/js';
    var viewsDir = appDir + '/views';
    var scssDir = appDir + '/views/';
    var cssDir = appDir + '/css';
    var assetsDir = appDir + '/assets';
    var buildDir = 'build';
    var reportsDir = 'reports';

    return {
        appDir: appDir,
        jsDir: jsDir,
        scssDir: scssDir,
        cssDir: cssDir,
        buildDir: buildDir,
        assetsDir: assetsDir,
        reportsDir: reportsDir,

        bowerComponentsDir: appDir + '/bower_components',

        dirsToCopyOnBuild: [assetsDir],

        htmlFiles: appDir + '/{*,**/*}.html',
        reportFiles: reportsDir + '/*.html',
        jsFiles: jsDir + '/{*,**/*}.js',
        viewsFiles: viewsDir + '/{*,**/*}.js',
        assetFiles: assetsDir + '/{*,**/*}',
        scssFiles: scssDir + '/{*,**/*}.scss',
        cssFiles: cssDir + '/{*,**/*}.css',
        jasmineFiles: 'test/jasmine/{*,**/*}.js',

        bowerFile: './bower.json',
        appJsFile: jsDir + '/app.js'
    };
})();

var _ = require('lodash');
var gulp = require('gulp');
var prompt = require('prompt');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var markdown = require('gulp-markdown');
var rename = require('gulp-rename');
var fs = require('fs-extra');
var lazypipe = require('lazypipe');
var gulpif = require('gulp-if');
var exec = require('exec');
var Q = require('q');
var minifyCSS = require('gulp-minify-css');
var flatten = require('gulp-flatten');


gulp.task('init', function (onDone) {

    var promptValues = [
        {
            name: 'appName',
            validator: /^[a-zA-Z]+$/,
            message: 'Name to use for ng-app',
            warning: 'App name must include only letters.'
        },
        {
            description: 'Text to use for the <title> tag',
            name: 'titleText'
        }
    ];

    prompt.start();
    prompt.get(promptValues, function (err, result) {

        gulp.src([paths.bowerFile, paths.jsFiles, paths.viewsFiles, paths.htmlFiles, paths.appJsFile, paths.scssFiles, paths.jasmineFiles], {base: '.'})
            .pipe(replace(/xxAppName/g, result.appName))
            .pipe(replace(/xxTitleText/g, result.titleText))
            .pipe(replace(/xxReplacedWithEmptyStrOnInit/g, ''))
            .pipe(replace(/<!-- delete-on-init -->(.|\n)*<!-- end-delete-on-init -->\n/g, ''))
            .pipe(replace(/\/\/ delete-on-init(.|\n)*\/\/ end-delete-on-init\n/g, ''))
            .pipe(gulp.dest('.'))
            .on('end', onDone);
    });
});


// Build tasks.

gulp.task('clean', _.partial(fs.removeSync, paths.buildDir));
gulp.task('build-start', ['clean'], _.partial(fs.ensureDirSync, paths.buildDir));


gulp.task('build-dirs', ['build-start'], function () {

    var promises = _.map(paths.dirsToCopyOnBuild, function (dir) {
        return Q.nfcall(exec, ['cp', '-R', dir, paths.buildDir]);
    });

    return Q.all(promises);
});


gulp.task('build', ['build-dirs', 'compile-scss'], function () {

    var minifyJs = lazypipe()
        .pipe(ngAnnotate)
        .pipe(uglify);

    var minCSS = lazypipe()
        .pipe(minifyCSS, {rebase: false});

    var assets = useref.assets();
    return gulp.src([paths.htmlFiles, '!' + paths.bowerComponentsDir + '{,/**}'])
        .pipe(assets)
        .pipe(gulpif('*.js', minifyJs()))
        .pipe(gulpif('*.css', minCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('build'));
});

// Compile tasks.

gulp.task('compile-scss', function () {

    return gulp.src( paths.scssFiles )
        .pipe( sass() )
        .pipe( flatten() )
        .pipe( gulp.dest(paths.cssDir) );
});


gulp.task('compile-readme', function () {

    return gulp.src('README.md')
        .pipe(markdown())
        .pipe(rename(paths.reportsDir + '/readme.html'))
        .pipe(gulp.dest('.'));
});


// Test and run tasks.

gulp.task('lint', function () {

    return gulp.src([paths.jsFiles, paths.viewsFiles, paths.jasmineFiles])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('dev', ['compile-scss', 'compile-readme'], function () {

    browserSync.init(
        [
            paths.htmlFiles,
            paths.jsFiles,
            paths.viewsFiles,
            paths.cssFiles,
            paths.reportFiles,
            '!' + paths.bowerComponentsDir
        ],
        {
            server: {
                baseDir: [paths.appDir, paths.reportsDir],
            },
            port : 3000,
            notify: true,
            open: false,
            // XXX: https://github.com/shakyShane/browser-sync/issues/68
            ghostMode: false
        }
    );

    gulp.watch( paths.scssFiles, ['compile-scss'] );
    // gulp.watch( [paths.jsFiles, paths.viewsFiles, paths.jasmineFiles ], ['lint'] );
});


gulp.task('default', ['dev']);
