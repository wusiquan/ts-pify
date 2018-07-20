const path = require('path')
const gulp = require('gulp')
const ts = require('gulp-typescript')
const merge = require('merge2')
const through = require('through2')

const srcDirReg = /src\//
// const testDirReg = /test\//
const tsProject = ts.createProject('tsconfig.json')

gulp.task('typescript', () => {
  let tsResult = gulp.src('./+(src|test)/*.ts')
    .pipe(tsProject())
  
  return merge[
    tsResult.js
      // gulp flatten path
      .pipe(through.obj(function(file, enc, cb) {
        // src中的文件
        if (!file.isDirectory()) {
          if (srcDirReg.test(file.relative)) {
            let filename = path.basename(file.path)
            file.path = path.join(file.base, filename)
            this.push(file)
          }

          this.push(file)
        }

        cb()
      }))
      .pipe(gulp.dest('./dist')),
    
    tsResult.dts
      // gulp flatten path
      .pipe(through.obj(function(file, enc, cb) {
        if (srcDirReg.test(file.relative)) {
          if (!file.isDirectory() && srcDirReg.test(file.relative)) {
            let filename = path.basename(file.path)
            file.path = path.join(file.base, filename)
            this.push(file)
          }
          cb()
        }
      }))
      .pipe(gulp.dest('./dist'))
  ]
})

gulp.task('watch', () => {
  
})