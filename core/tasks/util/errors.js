'use strict';

const gutil = require('gulp-util');
const browserSync = require('browser-sync');

const ERROR_TYPES = {
  sass: 'sass',
  jade: 'jade'
};

const ERROR_TITLES = {
  [ERROR_TYPES.sass]: 'Sass error',
  [ERROR_TYPES.jade]: 'Jade error'
};

let errors = {
  [ERROR_TYPES.sass]: null,
  [ERROR_TYPES.jade]: null
};

module.exports = {
  errorTypes: ERROR_TYPES,
  displayError: function (type, err) {
    err.type = type;
    err.title = ERROR_TITLES[type];
    errors[type] = err;
    gutil.log(gutil.colors.red(err));
    gutil.beep();
    browserSync.reload();
  },
  clearError: function (type) {
    errors[type] = null;
  },
  getFirstError() {
    for (const error in errors) {
      if (errors[error]) {
        return errors[error];
      }
    }
  }
};
