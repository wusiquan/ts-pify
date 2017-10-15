import pify from '../src/index'
import * as fs from 'fs'
import { expect } from 'chai'

const fixture = cb => setImmediate(() => cb(null, 'onion'))
// 这种情况, 真实环境不存在吧?
//const fixture1 = cb => setImmediate(() => cb(null, 'onion', 'rainbow'));
// const fixture2 = (x, cb) => setImmediate(() => cb(null, x));
// const fixture3 = cb => setImmediate(() => cb(null, 'unicorn', 'rainbow'));

describe('promisify', () => {
  it('promisify fixture', () => {
    pify(fixture)().then((data) => {
      expect(data).to.equal('onion')
    })
  })
  
  // it('promisify fixture1', () => {
  //   pify(fixture1)().then((data) => {
  //     expect(data).to.eql(['onion', 'rainbow'])
  //   })
  // })
})
