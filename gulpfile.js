var gulp        = require('gulp');
var browserSync = require('browser-sync');
var prefix      = require('gulp-autoprefixer');
var sass        = require('gulp-sass');

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('browser-reload', function() {
  browserSync.reload();
});

gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function () {
    gulp.watch('_scss/**/*.scss', ['sass']);
    // uncomment the following line to watch JS files 
    // gulp.watch(['js/*.js', 'js/*.json'], ['browser-reload']);
    gulp.watch('*.html', ['browser-reload']);
});

gulp.task('default', ['browser-sync', 'watch']);
