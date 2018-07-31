const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');

//DEV SERVER
gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'node_modules/font-awesome/scss/font-awesome.scss',
        'src/scss/*.scss'
    ])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest('src/css'));
});

gulp.task('js', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('src/fonts'));
});

gulp.task('dev', ['js', 'serve', 'font-awesome', 'fonts'])


//DIST SERVER

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
});

gulp.task('sassDIST', () => {
    return gulp.src([
        'src/css/*.css',
        'src/scss/*.scss'
    ])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('jsDIST', () => {
    return gulp.src([
        'src/js/jquery.min.js',
        'src/js/popper.min.js',
        'src/js/bootstrap.min.js'
    ])
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('fontsDIST', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', () => {
    return gulp.src('src/img/**/*.{gif,jpg,png,svg,pdf}')
        .pipe(gulp.dest('dist/img'))
});

gulp.task('serve', ['sassDIST'], () => {
    browserSync.init({
        server: './dist'
    });

    gulp.watch('src/scss/**/*.scss', ['sassDIST'], cb => cb).on('change', browserSync.reload);
    gulp.watch('src/img/**/*.png', ['img'], cb => cb);
    gulp.watch('src/**/*.html', ['html'], cb => cb).on('change', browserSync.reload);
});

gulp.task('dev', [
    'js',
    'html',
    'sass',
    'fonts',
    'img'])

gulp.task('start', [
    'fontsDIST',
    'jsDIST',
    'serve'])