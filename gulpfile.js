var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var pump = require('pump');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();

var scss_files = 'components/main.scss';
var jsx_files = 'components/app.jsx';


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
    .pipe(browserSync.stream());
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
        .pipe(browserSync.stream())
});

// -------------------------------------
//   Task: Compile & minify SCSS & JS
// -------------------------------------

gulp.task('min', function (cb) {
    pump([
            gulp.src('dist/app.js'),
            uglify(),
            rename("app.min.js"),
            gulp.dest('./dist')
        ],
        cb
    );
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "localhost:8080"
    });
});

// -------------------------------------
//   Task: Compile SCSS & Watch changes
// -------------------------------------

gulp.task('dev', ['browser-sync', 'styles', 'babel'], function() {
    gulp.watch(scss_files, ['styles']);
    gulp.watch('js/**/*.jsx', ['babel']);
});