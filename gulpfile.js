var gulp             = require('gulp'),
    uglify           = require('gulp-uglify'),
    sass             = require('gulp-sass'),
    autoprefixer     = require('gulp-autoprefixer'),
    concat           = require('gulp-concat'),
    del              = require('del'),
    mainBowerFiles   = require('main-bower-files'),
    runSequence      = require('run-sequence'),
    gulpWatch        = require("gulp-watch"),
    templateCache    = require('gulp-angular-templatecache'),
    minifyHtml       = require('gulp-minify-html'),
    coffee           = require("gulp-coffee"),
    connect          = require('gulp-connect');




var SERVER_CONFIG = {
  port: "3000",
  root: "./_build"
};

var SRC = {
  styles: "./app/**/*.scss",
  scripts: "./app/**/*.coffee",
  images: "./app/images/**/*",
  indexHTML: "./app/index.html",
  vendorScripts: "./public/components/**/*.js",
  vendorStyles: "./public/components/**/*.css",
  html: "./app/**/*.html",
  bowerDir: "./public/components",
  "fonts": "./public/components/ionicons/fonts/*.{ttf,woff,eof,svg}"

};

var DEST =  {
  styles: "./_build/css",
  scripts: "./_build/js",
  html : "./_build",
  images: "./_build/images",
  indexHTML: "./_build",
  vendorScripts: "./_build/js",
  vendorStyles: "./_build/css",
  "fonts": "./_build/fonts"
};


// Start Up Server
gulp.task('connect', function() {
  connect.server({
    root: SERVER_CONFIG.root,
    livereload: true,
    port: SERVER_CONFIG.port
  })
});

// Watch for assets changes in DEV
// use gulpWatch beause default watch will not watch for new or deleted files

gulp.task('watch', function () {
  gulpWatch(SRC.styles, function () {
   gulp.start('app-styles');
  });
  gulpWatch(SRC.scripts,  function () {
   gulp.start("app-scripts");
  });
  gulpWatch([SRC.html, "!"+SRC.indexHTML],  function () {
   gulp.start("build-html");
  });
  gulpWatch(SRC.indexHTML,  function () {
   gulp.start("copy-index");
  });
  gulpWatch(SRC.vendorScripts,  function () {
   gulp.start("vendor-scripts");
  });
  gulpWatch(SRC.vendorStyles,  function () {
   gulp.start("vendor-styles");
  });
});


// Util Tasks
gulp.task('clean-build', function (callback) {
  return del(['./_build/'], callback);
});



// Build Assets
gulp.task("bundle-assets", [ "build-scripts", "build-styles", "build-html", "icons"]);
gulp.task("build-scripts", ["app-scripts", "vendor-scripts"]);
gulp.task("build-styles", ["app-styles", "vendor-styles"]);

gulp.task('app-styles', function () {
    gulp.src(SRC.styles)
        .pipe(sass())
        .pipe(
          autoprefixer('last 3 version')
        )
        .pipe(concat("build.css"))
        .pipe(gulp.dest(DEST.styles))
        .pipe(connect.reload());
});

gulp.task('app-scripts', function () {
    gulp.src(SRC.scripts)
        .pipe(coffee())
        .pipe(concat('build.js'))
        .pipe(gulp.dest(DEST.scripts))
        .pipe(connect.reload());

});

gulp.task('icons', function() {
  gulp.src(SRC.fonts)
  .pipe(gulp.dest(DEST.fonts));
});


// BUILD HTML TEMPLATES

gulp.task('build-html', [ "build-templates", "copy-index", "copy-images"]);

gulp.task('build-templates', function () {
    gulp.src([SRC.html, ("!"+ SRC.indexHTML)])
        .pipe(gulp.dest(DEST.html));
});

gulp.task('copy-index', function() {
    gulp.src(SRC.indexHTML)
        .pipe(gulp.dest(DEST.indexHTML))
        .pipe(connect.reload());
});


gulp.task('copy-images', function() {
    gulp.src(SRC.images)
        .pipe(gulp.dest(DEST.images))
        .pipe(connect.reload());
});


// Vendor Assets
gulp.task('vendor-scripts', function() {
    gulp.src(
        mainBowerFiles({
          paths: { bowerDirectory: SRC.bowerDir},
          filter: "**/*.js"
        })
      )
      .pipe(concat("lib.js"))
      .pipe(gulp.dest(DEST.vendorScripts))
      .pipe(connect.reload());
});

gulp.task('vendor-styles', function() {
    gulp.src(
        mainBowerFiles({
          paths: { bowerDirectory: SRC.bowerDir},
          filter: "**/*.css"
        })
      )
      .pipe(concat("lib.css"))
      .pipe(gulp.dest(DEST.vendorStyles))
      .pipe(connect.reload());
});

// CLI Tasks, High level tasks called from command line

gulp.task("dev",  function (callback) {
  runSequence(
    "clean-build",
    ["bundle-assets","connect",'watch'],
    callback
  )
});




//Deefault task
gulp.task('default', ["dev"]);






