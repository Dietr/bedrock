const gulp = require('gulp');
const sass = require('gulp-sass');
const gutil = require('gulp-util');
const notifier = require('node-notifier');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const paths = require('../paths');
const browserSync = require('./browser-sync');

module.exports = function () {
  const processors = [
    autoprefixer({browsers: ['last 2 versions']}) // IE10+
  ];

  return gulp.src([
      paths.content.scss.allMainFiles,
      paths.core.scss.prototype
    ])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', function (err) {
      notifier.notify({
        title: 'SASS error',
        message: err.message
      });
      gutil.log(gutil.colors.red(err));
      gutil.beep();
      global.error = {
        type: 'Sass',
        message: err.message
      };
      browserSync.reload();
      this.emit('end');
    })
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css));
};
