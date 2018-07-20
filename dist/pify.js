"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pify(fn, opts) {
    opts = Object.assign({
        promiseModule: Promise,
        context: null,
        errorFirst: true
    }, opts);
    function promisiedFn(...args) {
        const P = opts.promiseModule;
        let promise = new P((resolve, reject) => {
            if (opts.errorFirst) {
                args.push(nodebackForPromise(resolve, reject));
            }
            else {
                args.push(resolve);
            }
        });
        fn.call(opts.context, ...args);
        opts = null;
        fn = null;
        return promise;
    }
    return promisiedFn;
}
exports.pify = pify;
function nodebackForPromise(resolve, reject) {
    return function (err, ...values) {
        if (err) {
            reject(err);
        }
        else {
            resolve(values[0]);
        }
    };
}
