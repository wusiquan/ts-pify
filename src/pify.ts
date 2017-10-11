function nodebackForPromise(resolve, reject) {
  // multiple values? 
  // e.g. child_process.exec
  return function (err, value) {
    if (err) {
      reject(err)
    } else {
      resolve(value)
    }
  }
}

export interface Opts {
  promiseModule?: any,
  context?: any
}

// symbol flag cache?
// option add multiArgs?
export function pify(fn, opts?: Opts) {
  opts = Object.assign({
    promiseModule: Promise,
    context: this
  }, opts)

  function promisiedFn(...args) {
    const P = opts.promiseModule

    let promise = new P((resolve, reject) => {
      args.push(nodebackForPromise(resolve, reject))
    })

    // try catch?
    fn.call(opts.context, ...args)

    opts = null
    fn = null
    return promise
  }

  return promisiedFn
}
