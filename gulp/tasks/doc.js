'use strict';

import gulp from 'gulp';
import config from '../config';
import yuidoc from 'gulp-yuidoc';

// uses yui to generate documentation to doc/api.json
gulp.task('doc', () => {
  return gulp.src(config.path.src.dir)
    .pipe(yuidoc.parser(config.yuidoc.parser, 'api.json'))
    .pipe(yuidoc.reporter())
    .pipe(yuidoc.generator(config.yuidoc.render))
    .pipe(gulp.dest(config.path.doc));
});