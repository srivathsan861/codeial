
const gulp = require('gulp');
// import gulp from 'gulp';
const sass = require('gulp-sass')(require('sass'));
// import gulpSass from 'gulp-sass';
// import dartSass from 'sass';
// const sass = gulpSass(dartSass);
const cssnano = require('gulp-cssnano');
// import cssnano from 'gulp-cssnano';
const rev = require('gulp-rev');
// import rev from 'gulp-rev';
const uglify = require('gulp-uglify-es').default;
// import uglify from 'gulp-uglify-es';
const imagemin = require('gulp-imagemin');
// import imagemin from 'gulp-imagemin'; 
const del = require('del');
// import del from 'del';


gulp.task('css',function(done){
	console.log('minifying css..');
	gulp.src('./assets/sass/**/*.scss') //** means every folder/sub-folder and file with .scss extension
	.pipe(sass())
	.pipe(cssnano())
	.pipe(gulp.dest('./assets.css'))

	return gulp.src('./assets/**/*.css')
	.pipe(rev())
	.pipe(gulp.dest('./public/assets'))
	.pipe(rev.manifest({
		cwd: 'public',
		merge: true
	}))
	.pipe(gulp.dest('./public/assets'));
	done();
});

gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});


// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js','images'), function(done){
    console.log('Building assets');
    done();
});
