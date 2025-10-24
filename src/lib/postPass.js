class _PostPass {
    constructor() {
        /** @type { (()=>void)[]} */
        this.workList = [];
    }

    /**
     * 将一系列操作添加到流水线中，并传递一个初始参数给这些操作。返回初始参数。
     * @template T
     * @param {T} arg
     * @param {...(arg:T)=>void} works
     * @returns {T}
     */
    pipe(arg, ...works) {
        for (const w of works) {
            this.workList.push(() => {
                w(arg);
            });
        }
        return arg;
    }

    /**
     * 将一系列操作添加到流水线中，并传递一个初始参数给这些操作。返回初始参数。此方法专为CustomAssetDefinition提供类型支持。
     * @param {CustomAssetDefinition} arg
     * @param {...(arg:CustomAssetDefinition)=>void} works
     * @returns {CustomAssetDefinition}
     */
    asset(arg, ...works) {
        return this.pipe(arg, ...works);
    }

    /**
     * 执行流水线中的所有操作。
     */
    run() {
        for (const w of this.workList) {
            w();
        }
    }
}

export const PostPass = new _PostPass();
