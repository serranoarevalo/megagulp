import gulp from "gulp";
import gPug from "gulp-pug";
import del from "del";
import webserver from "gulp-webserver";
import image from "gulp-image";

const routes = {
  css: {},
  pug: {
    src: "src/*.pug",
    dest: "dest"
  },
  js: {},
  img: {
    src: "src/img/*",
    dest: "dest/img"
  }
};

function js() {}

function styles() {}

const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gPug())
    .pipe(gulp.dest(routes.pug.dest));

const watch = () => {
  gulp.watch(routes.pug.src, pug);
};

const clean = () => del("dest/");

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

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug]);

const live = gulp.parallel([server, watch]);

export const dev = gulp.series([prepare, assets, live]);
