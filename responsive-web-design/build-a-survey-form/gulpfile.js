const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const minifyHtml = require('gulp-minify-html');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const minifyCss = require('gulp-minify-css');


async function clean() {
    return del.sync('dist');
}

async function html() {
    return gulp
        .src('./app/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
}

async function js() {
    return gulp
        .src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(gulp.dest('dist'));
}

async function css() {
    return gulp
        .src('app/**/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'));
}

async function fonts() {
    return gulp
        .src('app/**/*.ttf')
        .pipe(gulp.dest('dist'));
}

async function start() {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
        startPath: '?fcc-test=true'
    });

    gulp.watch('./app/**/*.+(ttf|html|css|js)').on("change", browserSync.reload);
}

const build = gulp.series(clean, gulp.parallel(html, js, css, fonts));

exports.clean = clean;
exports.html = html;
exports.js = js;
exports.css = css;
exports.fonts = fonts;
exports.build = build;

exports.start = start;
exports.default = start;