//gulp is used to minify things

const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

//get code from js and other from website
const uglify = require('gulf-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');


//creating a task to minify css
gulp.task('css', function(done){
    console.log('minifying css...');
    //** means any folder  *.scss means any file
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

    gulp.src('./assets.**css')
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})


//manifest file stores the hash of the file minified -> it maps the minified file to original file

//copy code for image minification and js