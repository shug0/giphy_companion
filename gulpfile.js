var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

var scss_files = 'scss/main.scss';
var jsx_files = 'js/app.jsx';
const css_folder ='css';


gulp.task('babel', () => {
    return browserify({
        entries: [jsx_files]
    })
    .transform(babelify.configure({
        presets : ["es2015", "react"]
    }))
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("./dist"))
});


// -------------------------------------
//   Task: Compile & minify SCSS
// -------------------------------------


gulp.task('styles', function () {
    return gulp.src(scss_files)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'))
});

// -------------------------------------
//   Task: Compile & minify SCSS & JS
// -------------------------------------


gulp.task('build', () => {
    return browserify({
        entries: [jsx_files]
    })
        .transform(babelify.configure({
            presets : ["es2015", "react"]
        }))
        .bundle()
        .pipe(source("app.min.js"))
        .pipe(gulp.dest("./dist"))
});



// -------------------------------------
//   Task: Compile SCSS & Watch changes
// -------------------------------------

gulp.task('dev', ['styles', 'babel'], function() {
    gulp.watch(scss_files, ['styles']);
    gulp.watch('js/**/*.jsx', ['babel']);
});