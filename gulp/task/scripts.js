var gulp    = require('gulp'),
    webpack = require('webpack');


gulp.task('scripts', function(callback) {
  // config the path for webpack. / make it error-proof
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if(err) {
      // convert err message to a string.
      console.log(err.toString());
    }
    console.log(stats.toString());
    callback();
  });
});
