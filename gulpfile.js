const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const pump = require('pump');
const rename = require("gulp-rename");
const browserSync = require('browser-sync').create();

const scss_main_file = 'components/main.scss';
const scss_files_to_watch = 'components/**/*.scss';
const jsx_main_file = 'components/**/*.jsx';
const jsx_files_to_watch = 'components/**/*.jsx';


gulp.task('babel', () => {
    return browserify({ entries: jsx_main_file })
    .transform(babelify.configure({ presets : ["es2015", "react"] }))
    .bundle()
    .pipe(source("app.js"))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});


gulp.task('styles', function () {
    return gulp.src(scss_main_file)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
});


gulp.task('minifyJs', function (cb) {
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
    gulp.watch(scss_files_to_watch, ['styles']);
    gulp.watch(jsx_files_to_watch, ['babel']);
});