var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('connect', function () {
    return connect.server({
        port: 9999,
        root: ['./', 'public'],
        livereload: true
    });
});

gulp.task('sass', function () {
    return gulp.src('./public/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'extended' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./public/sass/**/*'], ['sass']);
});

gulp.task('default', ['sass','connect', 'watch']);