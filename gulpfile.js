var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var del = require("del");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var cache = require("gulp-cache");

gulp.task("sass", function() {
    return gulp.src("./app/sass/**/*.scss",)
    .pipe(sass({outputStyle:"compressed"}).on("error", sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task("browser-sync", function() {
    browserSync({
        server: {
            baseDir: "./app"
        },
        notify: false
    })
})

gulp.task("watch", function() {
    gulp.watch("./app/sass/*.scss", gulp.series("sass"));
    gulp.watch("./app/*.html").on("change", browserSync.reload);
})

gulp.task("clean", function() {
    return del.sync("dist");
})
gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task("build", ["clean", "sass", "img"], function() {
    return gulp.src('app/css/**/*').pipe(gulp.dest('dist/css'));
    return gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
    return gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));
    return gulp.src('app/*.html').pipe(gulp.dest('dist'));
})

gulp.task("default", gulp.parallel("watch" ,"browser-sync"));