'use strict';

import gulp from 'gulp';
import config from '../config';
import plumber from 'gulp-plumber';
import image from 'gulp-image';

gulp.task('img:release', () => {
  return gulp.src(config.path.src.img.files)
    .pipe(plumber({errorHandler: config.onError}))
    .pipe(image())
    .pipe(gulp.dest(config.path.dist.dir));
});