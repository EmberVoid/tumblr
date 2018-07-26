/* Gulpfile.js */
let gulp = require('gulp')
let gutil =  require('gulp-util')
let sass = require('gulp-sass')
let webserver = require('gulp-webserver');
let path = require('path')

/* tasks */
// gulp.task(
//   name : String,
//   deps : [] :: optional,
//   cb : fn
// )

/* Styles task */
gulp.task('styles', () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: [
                path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
                path.join(__dirname, 'src/scss')]
            , outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
})

gulp.task('img', () => {
    return gulp.src('src//**/*.png')
        .pipe(gulp.dest('dist/'))
})

gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['styles'],cb => cb)
    gulp.watch('src/**/*.html', ['html'],cb => cb)
    gulp.watch('src/img/**/*.png', ['img'],cb => cb)
})

gulp.task('server', () => {
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            open: true
        }))
})

gulp.task('start', [
    'html',
    'styles',
    'server',
    'watch'
], cb => cb)