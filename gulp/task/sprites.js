var gulp    = require('gulp'),
// npm install gulp-svg-sprites@1.3.1 --save-dev
  svgSprite = require('gulp-svg-sprite'),
//  instal gulp-rename
  rename    = require('gulp-rename'),
  // npm install del **to delete any sprite folder**
  del       = require('del');

var config = {
  mode: {
    css: {
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css'
        }
      }
    }
  }
}

  gulp.task('beginClean', function() {
    return del(['./app/temp/sprite', './app/assests/images/sprites']);
  });


  gulp.task('createSprite', ['beginClean'], function() {
    // create the path
    return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    // we create a folder in our temp /and we point it there
    .pipe(gulp.dest('./app/temp/sprite/'));
  });

  gulp.task('copySpriteGraphic', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
      .pipe(gulp.dest('./app/assets/images/sprites'));
  });

  gulp.task('copySpriteCSS', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/*.css')
    // we can rename a file / by using the gulp-rename
      .pipe(rename('_sprite.css'))
      .pipe(gulp.dest('./app/assets/styles/modules'));
  });

  gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
    return del('./app/temp/sprite');
  });

  gulp.task('icons', ['beginClean','createSprite', 'copySpriteGraphic','copySpriteCSS', 'endClean']);
