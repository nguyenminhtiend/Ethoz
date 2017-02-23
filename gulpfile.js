var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var gulpIf = require('gulp-if');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject-string');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var minifyHTML = require('gulp-minify-html');


gulp.task('connect', function () {
    return connect.server({
        port: 8888,
        root: ['./', 'public'],
        livereload: true
    });
});

gulp.task('connect-prod', function () {
    return connect.server({
        port: 9999,
        root: ['dist'],
        livereload: true
    });
});

gulp.task('html-prod', function () {
    return gulp.src('./dist/*.html')
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    return gulp.src('./public/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'extended' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

gulp.task('build-js-css', function () {
    return gulp.src('./public/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-html', function () {
    return gulp.src('./public/app/**/*.html')
        .pipe(minifyHTML({
            quotes: true
        }))
        .pipe(templateCache('templates.min.js', {
            module: 'main.module',
            root: 'app/',
            standAlone: false
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build-img', function () {
    return gulp.src('./public/img/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build-fonts', function () {
    return gulp.src(['bower_components/components-font-awesome/fonts/*', 'bower_components/bootstrap/fonts/*'])
        .pipe(gulp.dest('dist/fonts'));
});


gulp.task('build-clean', function () {
    return gulp.src(['./dist', './public/css'], {read: false})
        .pipe(clean());
});

gulp.task('move-templateCache', function () {
    return gulp.src('./dist/index.html')
        .pipe(inject.before('</html>', '<script src="js/templates.min.js"></script>\n'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function (cb) {
    gulpSequence('build-clean',
        'sass',
        ['build-js-css', 'build-html', 'build-img', 'build-fonts'],
        'move-templateCache',
        cb
    );
});

gulp.task('watch', function () {
    gulp.watch(['./public/sass/**/*'], ['sass']);
});

gulp.task('default', ['sass','connect', 'watch']);
gulp.task('run-prod', ['connect-prod', 'html-prod']);