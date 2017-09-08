var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    browserSync   = require('browser-sync').create();

gulp.task('watch', function(){

  browserSync.init({
    notify: false,
    server: {
      // where our html lives
      baseDir: "app"
    }
  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });

  watch('./app/assets/styles/**/*.css', function() {
    gulp.start('cssInject');
  });
// watching any javascript file /so we don't have to refresh gulp scripts
  watch('./app/assets/scripts/**/*.js', function() {
    // we created a new variable
    gulp.start('scriptsRefresh');
  });

});

// browserSync
gulp.task('cssInject',['styles'], function() {
  // point to where our css lives
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});

// set up that new var: 'scriptsRefresh', and it has a dependency
gulp.task('scriptsRefresh', ['scripts'], function() {
  browserSync.reload();
});
