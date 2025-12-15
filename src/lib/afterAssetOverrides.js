let overridesRun = false;

/** @type {Array<()=>void>} */
const worklist = [];

/**
 * @param {()=>void} work
 */
export function afterAssetOverrides(work) {
    if (overridesRun) {
        work();
    } else {
        worklist.push(work);
    }
}

export function runAfterAssetOverrides() {
    overridesRun = true;
    (async () => {
        for (const work of worklist) {
            work();
        }
    })();
    worklist.length = 0;
}

export const AfterAssetOverrides = {
    run: runAfterAssetOverrides,
    register: afterAssetOverrides,
};
