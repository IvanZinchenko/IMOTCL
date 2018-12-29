var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");

gulp.task("sass", function() {
    return gulp.src("./app/sass/**/*.scss",)
    .pipe(sass({outputStyle:"expanded"}).on("error", sass.logError))
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

gulp.task("default", gulp.parallel("sass" ,"watch" ,"browser-sync"));