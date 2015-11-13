'use strict';

import gulp from 'gulp';
import config from '../config';
import runSequence from 'gulp-run-sequence';
import del from 'del';
import vinylPaths from 'vinyl-paths';

gulp.task('default', ['dev']);
gulp.task('dev', (done) => {
  runSequence(
    'clean',
    'css:watch',
    'server:dev',
    done
  );
});

gulp.task('deploy', (done) => {
  runSequence(
    'clean',
    ['css:release', 'js:release'],
    'build-html',
    done
  );
});

// Deletes all files in the output path
gulp.task('clean', () => {
  return gulp.src([
      config.absolute(config.path.dist.dir) + '/*',
      config.absolute(config.path.tmp) + '/*'
    ], {dot: true, read: false})
    .pipe(vinylPaths(del));
});
