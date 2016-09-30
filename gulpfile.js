var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');


var scss_files = 'scss/main.scss';
const css_folder ='css';



// -------------------------------------
//   Task: Minify & Concat : JS
// -------------------------------------

gulp.task('compress', function() {
    gulp.src('js/*.js')
        .pipe(concat('app.js'))
        .pipe(minify({
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('js/min'))
});


// -------------------------------------
//   Task: Compile & minify SCSS
// -------------------------------------


gulp.task('styles', function () {
    return gulp.src(scss_files)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(css_folder))
});

// -------------------------------------
//   Task: Compile & minify SCSS & JS
// -------------------------------------

gulp.task('build', ['styles', 'compress'], function() {
    console.log('Build complete !')
});


// -------------------------------------
//   Task: Compile SCSS & Watch changes
// -------------------------------------

gulp.task('dev', ['styles'], function() {
    gulp.watch(scss_files, ['styles']);
});