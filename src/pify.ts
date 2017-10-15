export declare namespace tspify {
  interface Opts {
    promiseModule?: any,
    context?: any
  }
}

export function pify(
  fn: (...args: any[]) => any,
  settings?: tspify.Opts
): (...args: any[]) => Promise<any>

// If the issue at https://github.com/Microsoft/TypeScript/issues/1360 is fixed,
// then an update should be submitted replacing the above declaration with the
// following declarations.
// export function pify<T>(
//   fn: (...args: any[], cb: (err: Error, res: T) => void) => void,
//   opts?: tspify.Opts
// ): (...args: any[]) => Promise<T>

// symbol flag cache?
// option add multiArgs?
export function pify(fn: any, opts?: any): any {
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

function nodebackForPromise(resolve, reject) {
  // ...values?
  // e.g. child_process.exec
  return function (err, ...values) {
    if (err) {
      reject(err)
    } else {
      resolve(values[0])
    }
  }
}
