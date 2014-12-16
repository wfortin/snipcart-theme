var gulp = require('gulp'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    runseq = require('run-sequence');

var configs = {
    paths: {
        index: './index.html',
        fonts: './fonts/**/*',
        less: './less/',
        dest: './'
    },
    ports: {
        staticServer: 5555
    }
};

gulp.task('serve', function (next) {
    var staticServer = connect();
    staticServer.use(serveStatic(configs.paths.dest)).listen(configs.ports.staticServer, next);
});

gulp.task('styles', function () {
    gulp.src([
            configs.paths.less + 'snipcart-theme.less'
    ])
    .pipe(less())
    //.pipe(minifyCss())
    .pipe(autoprefixer({
        browsers: ['IE >= 8', 'last 6 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('default', function () {
    runseq('styles', 'serve');
});
