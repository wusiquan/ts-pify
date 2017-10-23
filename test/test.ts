import pify from '../src/index'
import * as fs from 'fs'
import { expect } from 'chai'

const fixture = (cb: (err: Error, data: string) => void) => setImmediate(() => cb(null, 'onion'))
// const fixture1 = cb => setImmediate(() => cb(null, 'onion', 'rainbow'));
const fixture1 = (x: string, cb: (err: Error, data: string) => void) => setImmediate(() => cb(null, x))
const fixture2 = (x: string, y: string, cb: (err: Error, data: string[]) => void) => setImmediate(() => cb(null, [x, y]))
// const fixture3 = cb => setImmediate(() => cb(null, 'unicorn', 'rainbow'));

describe('promisify', () => {
  it('promisify fixture', () => {
    pify<string>(fixture)().then((data) => {
      expect(data).to.equal('onion')
    })
  })

  it('pass one arguments', async () => {
    expect(await pify(fixture1)('tomato')).to.equal('tomato')
  })

  it('pass two arguments', async () => {
    expect(await pify(fixture2)('tomato', 'egg')).to.eql(['tomato', 'egg'])
  })
  
  // it('promisify fixture1', () => {
  //   pify(fixture1)().then((data) => {
  //     expect(data).to.eql(['onion', 'rainbow'])
  //   })
  // })
})
