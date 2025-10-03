import { resourceBaseURL } from "@mod-utils/rollupHelper";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { sleepUntil } from "@sugarch/bc-mod-utility";

const loadQueue = [];
let loaded = false;

function purl(url) {
    if (url.startsWith("data:")) return url;
    if (url.match(/^[a-zA-Z]+:\/\//)) return url;
    return `${resourceBaseURL}${url}`;
}

async function cachePreloadGL(url) {
    const url_ = purl(url);
    if (loaded) {
        if (GLDrawCanvas) GLDrawLoadImage(GLDrawCanvas.GL, url);
        DrawGetImage(url);
    } else {
        loadQueue.push(url_);
    }
}

HookManager.afterInit(() => {
    loaded = true;
    sleepUntil(() => !!GLDrawCanvas, 100).then(() => {
        loadQueue.forEach((q) => GLDrawLoadImage(GLDrawCanvas.GL, q));
    });
    loadQueue.forEach((q) => DrawGetImage(q));
    loadQueue.length = 0;
});

export { cachePreloadGL };
