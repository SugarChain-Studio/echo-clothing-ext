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

class _ImmPass {
    /**
     * 立即执行的流水线操作函数
     * @template T
     * @param {T} arg
     * @param {...(arg:T)=>void} works
     * @returns {T}
     */
    pipe(arg, ...works) {
        for (const w of works) {
            w(arg);
        }
        return arg;
    }

    /**
     * 立即执行的流水线操作函数。此方法专为CustomAssetDefinition提供类型支持。
     * @param {CustomAssetDefinition} arg
     * @param {...(arg:CustomAssetDefinition)=>void} works
     * @returns {CustomAssetDefinition}
     */
    asset(arg, ...works) {
        return this.pipe(arg, ...works);
    }

    /**
     * 立即执行的流水线操作函数。此方法专为AddAssetWithConfigParams[2]提供类型支持。
     * @param {AddAssetWithConfigParams[2]} arg
     * @param {...(arg:AddAssetWithConfigParams[2])=>void} works
     * @returns {AddAssetWithConfigParams[2]}
     */
    assetConfig(arg, ...works) {
        return this.pipe(arg, ...works);
    }
}

export const ImmPass = new _ImmPass();
