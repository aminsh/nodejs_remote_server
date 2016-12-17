var gulp = require('gulp'),
    concat = require('gulp-concat'),
    soucemaps = require('gulp-sourcemaps'),
    bundle = require('gulp-bundle-assets');

gulp.task('app', function () {
    gulp.src([
            '../app/directives/widgets.module.js',
            '../app/directives/CustomDirectives.js',
            '../app/app.js',
            '../app/directives/nvr*.js',
            '../app/**/*.js'
        ])
        .pipe(soucemaps.init())
        .pipe(concat('app.all.js'))
        .pipe(soucemaps.write())
        .pipe(gulp.dest('dist'));
});

var plugins = require('./plugins');

gulp.task('plugins', function () {
    gulp.src(plugins)
        .pipe(soucemaps.init())
        .pipe(concat('plugins.all.js'))
        .pipe(soucemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('css-bundle', function () {
    gulp.src('./bundle.config.js')
        .pipe(bundle())
        .pipe(gulp.dest('dist/content'))
});

gulp.task('default', ['app', 'css-bundle']);