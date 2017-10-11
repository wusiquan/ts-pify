import pify from '../src/index'
import * as fs from 'fs'
import { expect } from 'chai'

const fixture = cb => setImmediate(() => cb(null, 'onion'))

// const fixture1 = cb => setImmediate(() => cb('error', 'unicorn', 'rainbow'));
// const fixture2 = (x, cb) => setImmediate(() => cb(null, x));
// const fixture3 = cb => setImmediate(() => cb(null, 'unicorn', 'rainbow'));

describe('promisify', () => {
  it('promisify fixture', () => {
    pify(fixture)().then((data) => {
      expect(data).to.equal('onion')
    })
  })
})
