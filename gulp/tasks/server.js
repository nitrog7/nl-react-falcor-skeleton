'use strict';

import gulp from 'gulp';
import config from '../config';
import exec from 'gulp-exec';
import util from 'gulp-util';


gulp.task('server:dev', () => {
  let options = {
    continueOnError: false,
    pipeStdout: true
  };

  let reportOptions = {
    err: true,
    stderr: true,
    stdout: true
  };

  return gulp.src(config.path.server.dev)
    .pipe(exec('nodemon --watch model --watch bin <%= file.path %>', options))
    .pipe(exec.reporter(reportOptions));
});
