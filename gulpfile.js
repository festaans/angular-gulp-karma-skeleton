var gulp          = require('gulp');
var os            = require('os');
var connect       = require('gulp-connect');
var open          = require('gulp-open');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var minifyHTML    = require('gulp-minify-html');
var minifyCSS     = require('gulp-minify-css');
var cdnizer       = require("gulp-cdnizer");
var sourcemaps    = require('gulp-sourcemaps');
var sass          = require('gulp-sass');

var karma = require('gulp-karma');
//Servers
var browser = os.platform() === 'linux' ? 'google-chrome' : (
  os.platform() === 'darwin' ? 'google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
gulp.task('connectDev', function () {
  connect.server({
    root: 'dev',
    port: 8888,
    livereload: true
  });
  //options for open
  var options = {
    uri: 'http://localhost:8888',
    app: browser
  };
  //open
  gulp.src(__filename)
  .pipe(open(options));
});
//sass
gulp.task('sass', function () {
  gulp.src('./dev/styles/sass/app.scss')
  .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dev/styles/'))
  .pipe(connect.reload());
});
//watchDev
gulp.task('watchDev', function () {
  gulp.watch(['./dev/**/*.scss'], ['sass']);
  gulp.watch(['./dev/**/*.controller.js'], ['createAppJS']);
  gulp.watch(['./dev/**/*.factory.js'], ['createAppJS']);
  gulp.watch(['./dev/**/*.state.js'], ['createAppJS']);
  gulp.watch(['./dev/**/*.start.js'], ['createAppJS']);
  gulp.watch(['./dev/**/*.end.js'], ['createAppJS']);
  gulp.watch(['./dev/**/app.js'], ['test']);
  gulp.watch(['./test/unit/**/*.spec.js'], ['test']);
});
//concat scripts
gulp.task('createAppJS', function() {
  gulp.src([
    './dev/**/app.start.js',
    './dev/**/stateProvider.start.js',
    './dev/**/*.state.js',
    './dev/**/stateProvider.end.js',
    './dev/**/*.template.js',
    './dev/**/*.directive.js',
    './dev/**/*.service.js',
    './dev/**/*.factory.js',
    './dev/**/*.controller.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest('./dev/scripts/'));
});
//test
var testFiles = [
  './dev/bower_components/angular/angular.min.js',
  './dev/bower_components/angular-mocks/angular-mocks.js',
  './dev/bower_components/angular-ui-router/release/angular-ui-router.min.js',
  './dev/scripts/app.js',
  './test/unit/**/*.spec.js'
];
gulp.task('test', function() {
  // Be sure to return the stream
  gulp.src(testFiles)
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log("Report available at test/results/unit/index.html");
    });
});

gulp.task('default', ['connectDev', 'sass', 'watchDev', 'createAppJS']);
