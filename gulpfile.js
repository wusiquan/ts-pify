const gulp = require('gulp')
const ts = require('gulp-typescript')
const merge = require('merge2')
const through = require('through2')

const testDirReg = /test\//
let tsProject = ts.createProject('tsconfig.json')

gulp.task('typescript', () => {
  let tsResult = gulp.src('./+(src|test)/*.ts')
    .pipe(tsProject())
  
  return merge[
    tsResult.js.pipe(gulp.dest('./dist')),
    tsResult.dts.pipe(through.obj(function(file, enc, cb) {
      if (!testDirReg.test(file.relative)) {
        this.push(file)
        cb()
      }
    })).pipe(gulp.dest('./dist'))
  ]
})
