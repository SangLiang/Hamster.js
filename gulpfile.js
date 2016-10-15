var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver  = require('gulp-webserver'); 

gulp.task('sass',function(){
	return gulp.src('./public/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch',function(){
	gulp.watch("./public/sass/*.scss",['sass']);
});

gulp.task('webserver',function(){
	gulp.src('./')
	    .pipe(webserver({
	      livereload: true,
	      directoryListing: true,
	      open: 'http://127.0.0.1:8000/index.html',
	    }));
});

gulp.task('default',function(){
	gulp.run('sass');
	gulp.run('watch');
	gulp.run('webserver');
});

