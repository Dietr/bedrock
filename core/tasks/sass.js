const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const paths = require('../paths');
const errors = require('./util/errors');

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
      this.err = err;
      errors.displayError(errors.errorTypes.sass, err);
      this.emit('end');
    })
    .pipe(postcss(processors))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist.css))
    .on('end', function (err) {
      console.log('end:', this);
    });
};
