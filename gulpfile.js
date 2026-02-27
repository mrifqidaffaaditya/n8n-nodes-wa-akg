const gulp = require('gulp');

gulp.task('build:icons', function () {
    return gulp.src(['nodes/**/*.svg', 'nodes/**/*.png'])
        .pipe(gulp.dest('dist/nodes'));
});
