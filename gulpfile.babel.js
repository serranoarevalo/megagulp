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

function watch() {}

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gPug())
    .pipe(gulp.dest(routes.pug.dest));

function clean() {}

function server() {}

function img() {}
