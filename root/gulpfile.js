const gulp = require('gulp');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const terser = require('gulp-terser');

async function clean() {
    return del.sync('dist');
}

//gulp.task('clean', async () => del.sync('dist'));

async function html() {
    return gulp
        .src('./app/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'));
}

async function js() {
    return gulp
        .src('app/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
       .pipe(terser())
        .pipe(gulp.dest('./dist'));
}

const build = gulp.series(clean, gulp.parallel(html, js));

exports.clean = clean;
exports.html = html;
exports.js = js;
exports.build = build;
exports.default = build;
