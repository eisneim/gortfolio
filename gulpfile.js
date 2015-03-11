var gulp = require('gulp'),
	open = require('gulp-open'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	livereload = require('gulp-livereload');

// for sass compile and live reload:
var sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

var paths = {
	html: 	'public/index.html',
	img: 	'public/img/**/*',
	scss: 	'public/scss/**/*.scss',
	js:  	'public/app/**/*.js',
}
// ---------------------------------------
gulp.task('scss', function() {
    // console.log('-----build main.scss');
  gulp.src('./public/scss/main.scss' )
    .pipe(sass())
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/css'))
});


// ---------------------------------------
gulp.task('browserify',function(){
	gulp.src('./public/app/index.js')
	.pipe(browserify({
		transform: 'reactify'
	}))
	.pipe(gulp.dest('./public/build/'));
})

gulp.task('build-js',function(){
	gulp.src('./public/app/index.js')
	.pipe(browserify({
		transform: 'reactify'
	}))
	.pipe(uglify({
		compress:true,
        mangle:true,
	}))
	.pipe(gulp.dest('./public/build/'));
})

//launch browser in a port 
gulp.task('open',function(){
	var options  = {
		url:'http://localhost:'+ port,
	}
	gulp.src('./public/index.html')
	.pipe(open('',options));
})

// watch files for live reload
gulp.task('watch',function(){
	livereload.listen();
	gulp.watch('./public/build/**/*.js').on('change', livereload.changed);
	gulp.watch( paths.html ).on('change', livereload.changed);
	gulp.watch('./public/css/**/*.css').on('change', livereload.changed);

	gulp.watch( paths.js ,['browserify']);
	gulp.watch( paths.scss ,['scss']);
});

gulp.task('default',['browserify']);

gulp.task('build',['build-js','scss']);

gulp.task('serve',['browserify','watch']);



