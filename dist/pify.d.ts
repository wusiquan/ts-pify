export interface Opts {
    promiseModule?: PromiseConstructor;
    context?: any;
    errorFirst?: boolean;
}
export declare function pify<TResult>(fn: (cb: (err: Error, res: TResult) => void) => void, setting?: Opts): () => Promise<TResult>;
export declare function pify<T1, TResult>(fn: (arg1: T1, cb: (err: Error, res: TResult) => void) => void, setting?: Opts): (arg1: T1) => Promise<TResult>;
export declare function pify<T1, T2, TResult>(fn: (arg1: T1, arg2: T2, cb: (err: Error, res: TResult) => void) => void, setting?: Opts): (arg1: T1, arg2: T2) => Promise<TResult>;
export declare function pify<T1, T2, T3, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, cb: (err: Error, res: TResult) => void) => void, setting?: Opts): (arg1: T1, arg2: T2, arg3: T3) => Promise<TResult>;
export declare function pify<T1, T2, T3, T4, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, cb: (err: Error, res: TResult) => void) => void, setting?: Opts): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => Promise<TResult>;
export declare function pify<T1, T2, T3, T4, T5, TResult>(fn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, cb: (err: Error, res: TResult) => void) => void, setting?: Opts): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => Promise<TResult>;
export declare function pify(fn: Function): Function;
