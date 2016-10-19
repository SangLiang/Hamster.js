var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Load plugins
var $ = require('gulp-load-plugins')();

// 样式文件
gulp.task('sass', function () {
	return gulp.src('./public/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('webserver', function () {
	return gulp.src('./')
		.pipe(webserver({
			livereload: true,
			directoryListing: true,
			open: 'http://127.0.0.1:8000/index.html',
		}));
});

/* es6 */
gulp.task('es6', function () {
	return gulp.src(['./app.js','./modules/*.js'])
		.pipe($.plumber())
		.pipe(concat('app.js'))
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./dist/js/'));
});
/** 整合js */
gulp.task('concat', function () {
	return gulp.src(['./config.js','./app.js', './modules/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function () {
	gulp.watch("./public/sass/*.scss", ['sass']);
	gulp.watch(['./config.js','./app.js',"./main.js","./modules/*.js"], ['es6',"concat"]);

});

gulp.task('default',['sass','watch','concat','webserver','es6'], function () {
	console.log("Server is running now");
});

