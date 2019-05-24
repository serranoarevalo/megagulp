import gulp from "gulp";
import gPug from "gulp-pug";
import webserver from "gulp-webserver";

const routes = {
  css: {},
  pug: {
    src: "src/*.pug",
    dest: "dest"
  },
  js: {}
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

function clean() {}

function server() {
  gulp.src("dest").pipe(
    webserver({
      livereload: true
    })
  );
}

function img() {}

export const dev = gulp.series([pug, gulp.parallel([server, watch])]);
