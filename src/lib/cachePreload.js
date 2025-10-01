import { resourceBaseURL } from "@mod-utils/rollupHelper";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { sleepUntil } from "@sugarch/bc-mod-utility";

const loadQueue = [];

const preloadPrereq = () => !!GLDrawCanvas && !String(GLDrawLoadImage).includes("Img.src = url;");

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
    if (preloadPrereq()) {
        _glPreload(GLDrawCanvas.GL, url_);
    } else {
        loadQueue.push(url_);
    }
    DrawGetImage(url_);
}

HookManager.afterInit(() => {
    sleepUntil(() => preloadPrereq(), 100).then(() => {
        loadQueue.forEach((q) => _glPreload(GLDrawCanvas.GL, q));
    });
});

export { cachePreloadGL };
