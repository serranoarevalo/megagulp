import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import webserver from "gulp-webserver";
import image from "gulp-image";
import sass from "gulp-sass";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import babelify from "babelify";
import bro from "gulp-bro";
import uglify from "gulp-uglify";
import ghPages from "gulp-gh-pages";

sass.compiler = require("node-sass");

const routes = {
  css: {
    watch: "src/scss/*",
    src: "src/scss/style.scss",
    dest: "dest/css"
  },
  pug: {
    src: "src/*.pug",
    dest: "dest"
  },
  js: {
    watch: "src/js/*",
    src: "src/js/main.js",
    dest: "dest/js"
  },
  img: {
    src: "src/img/*",
    dest: "dest/img"
  }
};

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env"]
          })
        ]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(routes.js.dest));

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        flexbox: true,
        grid: "autoplace"
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gPug())
    .pipe(gulp.dest(routes.pug.dest));

const watch = () => {
  gulp.watch(routes.pug.src, pug);
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const clean = () => del(["dest/", ".publish"]);

const server = () =>
  gulp.src("dest").pipe(
    webserver({
      livereload: true
    })
  );

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const upload = () => gulp.src("dest/**/*").pipe(ghPages());

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles, js]);

const live = gulp.parallel([server, watch]);

export const dev = gulp.series([prepare, assets, live]);

export const build = gulp.series([prepare, assets]);

export const deploy = gulp.series([build, upload, clean]);
