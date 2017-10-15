export declare namespace tspify {
    interface Opts {
        promiseModule?: any;
        context?: any;
    }
}
export declare function pify(fn: (...args: any[]) => any, settings?: tspify.Opts): (...args: any[]) => Promise<any>;
