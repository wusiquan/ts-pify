export interface Opts {
  promiseModule?: PromiseConstructor,
  context?: any
}

export function pify<TResult>(
  fn: (cb: (err: Error, res: TResult) => void) => void,
  setting?: Opts
): () => Promise<TResult>
export function pify<T1, TResult>(
  fn: (arg1: T1, cb: (err: Error, res: TResult) => void) => void,
  setting?: Opts
): (arg1: T1) => Promise<TResult>
export function pify<T1, T2, TResult>(
  fn: (arg1: T1, arg2: T2, cb: (err: Error, res: TResult) => void) => void,
  setting?: Opts
): (arg1: T1, arg2: T2) => Promise<TResult>
export function pify<T1, T2, T3, TResult>(
  fn: (arg1: T1, arg2: T2, arg3: T3, cb: (err: Error, res: TResult) => void) => void,
  setting?: Opts
): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>
export function pify<T1, T2, T3, T4, TResult>(
  fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, cb: (err: Error, res: TResult) => void) => void,
  setting?: Opts
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>
export function pify<T1, T2, T3, T4, T5, TResult>(
  fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, cb: (err: Error, res: TResult) => void) => void,
  setting?: Opts
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>
export function pify(fn: Function): Function

// export function pify(
//   fn: (...args: any[]) => any,
//   settings?: tspify.Opts
// ): (...args: any[]) => Promise<any>

// symbol flag cache?
// option add multiArgs?
export function pify(fn: Function, opts?: Opts): Function {
  opts = Object.assign({
    promiseModule: Promise,
    context: this
  }, opts)

  function promisiedFn(...args: any[]) {
    const P = opts.promiseModule

    let promise = new P<any>((resolve, reject) => {
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

function nodebackForPromise(resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) {
  // ...values?
  // e.g. child_process.exec
  return function (err: Error, ...values: any[]) {
    if (err) {
      reject(err)
    } else {
      resolve(values[0])
    }
  }
}
