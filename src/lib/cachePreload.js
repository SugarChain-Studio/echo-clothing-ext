import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { sleepUntil } from "@sugarch/bc-mod-utility";
import { AfterAssetOverrides } from "./afterAssetOverrides";

const loadQueue = [];
let loaded = false;

async function cachePreloadGL(url) {
    if (loaded) {
        if (GLDrawCanvas) GLDrawLoadImage(GLDrawCanvas.GL, url);
        DrawGetImage(url);
    } else {
        loadQueue.push(url);
    }
}

AfterAssetOverrides.register(() => {
    HookManager.afterInit(() => {
        loaded = true;
        sleepUntil(() => !!GLDrawCanvas, 100).then(() => {
            loadQueue.forEach((q) => GLDrawLoadImage(GLDrawCanvas.GL, q));
        });
        loadQueue.forEach((q) => DrawGetImage(q));
        loadQueue.length = 0;
    });
});

export { cachePreloadGL };
