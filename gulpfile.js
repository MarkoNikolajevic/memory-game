const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const pump = require("pump");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
require("babel-register");

// Optimize images
gulp.task("optimizeImg", () =>
  gulp.src("src/assets/img/*")
    .pipe(imagemin({
      progressive: true,
      verbose: true
    }))
    .pipe(gulp.dest("dist/assets/img"))
);

// Convert images into webp format
gulp.task("webpImg", () =>
  gulp.src("dist/assets/img/*")
    .pipe(webp())
    .pipe(gulp.dest("dist/assets/img/"))
);

// Compile sass and minify
gulp.task("sass", () =>
  gulp.src("src/assets/style/sass/**/*.sass")
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: "last 5 versions"
    }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("dist/assets/style/css"))
    .pipe(browserSync.stream())
);

// Minify js files
gulp.task("minifyJs", (cb) =>
  pump([
    gulp.src("src/assets/js/*.js"),
    sourcemaps.init(),
    babel({
      presets: ["env"]
    }),
    uglify(),
    rename({
      suffix: ".min"
    }),
    sourcemaps.write("."),
    gulp.dest("dist/assets/js"),
    browserSync.stream()
  ], cb)
);

// Browser Sync

gulp.task("serve", ["sass", "minifyJs"], function() {
  browserSync.init({
    server: {
      index: "index.html"
    }
  });
  gulp.watch("src/assets/style/sass/**/*.sass", ["sass"]);
  gulp.watch("src/assets/js/*.js", ["minifyJs"]);
  gulp.watch("index.html").on("change", browserSync.reload);
});

// Default
gulp.task("default", ["serve"]);
