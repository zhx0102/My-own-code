const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const {series} = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');

//使用task定义一个任务 规定任务名
gulp.task('babel', () =>
    gulp.src('./src/js/*js') //把某个文件夹的文件读取出来一个可读流
    .pipe(babel({
        //把ES6代码编译为ES6
        //把ES6模块化规范编译为CommonJS规范
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js')) //把处理的流写入到某个文件夹
);



// browserify
gulp.task('browserify', function() {
    return gulp.src('./dist/js/index.js')
        .pipe(browserify({
          insertGlobals : true,
        }))
        .pipe(rename('build.js'))
        
        .pipe(gulp.dest('./dist/js'))
});


//less
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
      .pipe(less())
      .pipe(concat('all.css'))
      .pipe(gulp.dest('./dist/css'))
  });

//整合使用series()方法
gulp.task("js-dev",series(['babel','browserify']))