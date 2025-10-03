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

/** @type {( ...args: Parameters<typeof globalThis["GLDrawLoadImage"]>)=>void} */
function _glPreload(gl, url) {
    GLDrawLoadImage(gl, url);
}

async function cachePreloadGL(url) {
    const url_ = purl(url);
    if (loaded) {
        _glPreload(GLDrawCanvas.GL, url_);
    } else {
        loadQueue.push(url_);
    }
    DrawGetImage(url); // DrawGetImage有crossOrigin处理，无需等待loaded
}

HookManager.afterInit(() => {
    sleepUntil(() => !!GLDrawCanvas, 100).then(() => {
        loaded = true;
        loadQueue.forEach((q) => _glPreload(GLDrawCanvas.GL, q));
    });
});

export { cachePreloadGL };
