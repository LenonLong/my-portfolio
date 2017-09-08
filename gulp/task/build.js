var gulp      = require('gulp'),
imagemin      = require('gulp-imagemin'),
del           = require('del'),
usemin        = require('gulp-usemin'),
rev           = require('gulp-rev'),
cssnano       = require('gulp-cssnano'),
uglify        = require('gulp-uglify'),
browserSync   = require('browser-sync').create();


gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
    // changed to dist folder
      baseDir: "docs"
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], function(){
  return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ];

  return gulp.src(pathsToCopy)
  .pipe(gulp.dest("./docs"));
});

gulp.task('optimizeImages',['deleteDistFolder'], function() {
  // copy any files to its destination
  return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      mutipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start("usemin");
});


// if we want to copy any file to our dist folder/ this will refresh the list below
gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src("./app/index.html")
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest("./docs"));
});


gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);
