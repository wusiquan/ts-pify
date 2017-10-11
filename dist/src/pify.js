"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nodebackForPromise(resolve, reject) {
    return function (err, value) {
        if (err) {
            reject(err);
        }
        else {
            resolve(value);
        }
    };
}
function pify(fn, opts) {
    opts = Object.assign({
        promiseModule: Promise,
        context: this
    }, opts);
    function promisiedFn(...args) {
        const P = opts.promiseModule;
        let promise = new P((resolve, reject) => {
            args.push(nodebackForPromise(resolve, reject));
        });
        fn.call(opts.context, ...args);
        opts = null;
        fn = null;
        return promise;
    }
    return promisiedFn;
}
exports.pify = pify;
