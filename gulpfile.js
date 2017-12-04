const browserify = require('browserify');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');

const entryPoint = './src/index.js';
const browserDir = './';
const sassWatchPath = './styles/**/*.scss';
const jsWatchPath = './src/**/*.js';
const htmlWatchPath = './**/*.html';

gulp.task('js', function () {
    return browserify(entryPoint, { debug: true, extensions: ['es6'] })
        .transform('babelify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: { baseDir: browserDir }
    };

    return browserSync(config);
});

gulp.task('sass', function () {
  return gulp.src(sassWatchPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({ stream: true }))
    });
});

gulp.task('build', ['js', 'sass']);
gulp.task('run', ['js', 'sass', 'watch', 'browser-sync']);
