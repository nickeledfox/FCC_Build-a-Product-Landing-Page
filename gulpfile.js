const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const ttf2woff = require("gulp-ttf2woff");
const del = require("del");
const concat = require("gulp-concat");
const pug = require("gulp-pug");

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    port: 3000,
    notify: false,
  });
};

const pughtml = () => {
  return src("src/pug/index.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("./"))
    .pipe(browserSync.stream());
};

const styles = () => {
  return src("src/scss/main.scss")
    .pipe(
      scss({
        outputStyle: "compressed",
        includePath: ["./node_modules"],
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    )
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
};

const images = () => {
  return src("src/assets/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/assets/images"));
};

const fonts = () => {
  src("src/assets/fonts/**/*").pipe(ttf2woff()).pipe(dest("dist/assets/fonts"));
  return src("src/assets/fonts/**/*")
    .pipe(ttf2woff2())
    .pipe(dest("src/assets/fonts"));
};

const clean = () => {
  return del("dist");
};

const build = () => {
  return src(
    [
      "dist/css/style.min.css",
      "src/assets/fonts*.woff, *.woff2",
      "./index.html",
    ],
    { base: "src" }
  ).pipe(dest("dist"));
};

const watching = () => {
  watch(["src/scss/**/*.scss"], styles);
  watch(["src/*.html"], pughtml).on("change", browserSync.reload);
  watch(["src/pug/**/*.pug"], pughtml).on("change", browserSync.reload);
};

exports.fonts = fonts;
exports.styles = styles;
exports.watching = watching;
exports.images = images;
exports.clean = clean;
exports.browsersync = browsersync;
exports.pughtml = pughtml;

exports.build = series(clean, images, pughtml, build, fonts);
exports.default = parallel(styles, browsersync, watching);
