const gulp = require("gulp");
const sass = require("gulp-sass");
let cleanCSS = require("gulp-clean-css");
var concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");

function style() {
    return gulp
        .src("./scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./css"));
}
function minify() {
    return gulp
        .src("css/*.css")
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: "ie11" }))
        .pipe(gulp.dest("./css/min/"));
}
function concatcss() {
    gulp.src("./css/min/*.css")
        .pipe(concat("./minified/all.min.css"))
        .pipe(gulp.dest("./css/"));
}

function watch() {
    gulp.watch("./scss/*.scss", style);
    gulp.watch("./css/*.css").on("change", minify);
    gulp.watch("./css/min").on("change", concatcss);
}
exports.style = style;
exports.minify = minify;
exports.concatcss = concatcss;
exports.watch = watch;
