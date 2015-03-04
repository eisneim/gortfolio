var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	port = process.env.port || 3031;

gulp.task('browserify',function(){
	gulp.src('./app/src/js/app.js')
	.pipe(browserify({
		transform: 'reactify'
	}))
	.pipe(gulp.dest('./build/'));
})
//launch browser in a port 
gulp.task('open',function(){
	var options  = {
		url:'http://localhost:'+ port,
	}
	gulp.src('./app/index.html')
	.pipe(open('',options));
})
// live reload server 
gulp.task('connect',function(){
	connect.server({
		root:'app',
		port: port,
		livereload:true,
	})
})
// live reload js 
gulp.task('reload-js',function(){
	gulp.src('./build/**/*.js')
	.pipe(connect.reload() );
})
// live relaod html
gulp.task('reload-html',function(){
	gulp.src('./app/**/*.html')
	.pipe(connect.reload() );
})
// watch files for live reload
gulp.task('watch',function(){
	gulp.watch('./build/*.js',['reload-js']);
	gulp.watch('./app/**/*.html',['reload-html']);
	gulp.watch('./app/src/js/**/*.js',['browserify']);
});

gulp.task('default',['browserify']);

gulp.task('serve',['browserify','connect','watch']);



