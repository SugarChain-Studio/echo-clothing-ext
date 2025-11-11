import { AssetManager } from "../../assetForward";
import { registerDrawHook } from "../../lib/afterDraw";
import { ChainCanvasCache } from "../../lib/chain";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "哥布哥布_Luzi",
    Random: false,
    Top: 580,
    Left: 250,
    Time: 15,
    Priority: 55,
    Fetish: ["Metal"],
    Audio: "ChainLong",
    AllowLock: true,
    DynamicAfterDraw: true,
    Effect: [E.Tethered, E.IsChained, E.MapImmobile],
    Prerequisite: ["Collared", "NotSuspended", "NotMounted"],
    ExpressionTrigger: [
        { Name: "Medium", Group: "Blush", Timer: 15 },
        { Name: "Soft", Group: "Eyebrows", Timer: 5 },
    ],
    FixedPosition: true,
    Layer: [
        { Name: "哥布林", AllowColorize: false },
        { Name: "链条", HasImage: false },
        { Name: "手指", AllowColorize: false },
    ],
};

const layerNames = {
    EN: {
        哥布林: "Goblin",
        链条: "Chain",
    },
};

const translation = {
    CN: "哥布林雕像",
    EN: "Goblin Statue",
};

const ostartp = { x: 250, y: 227 };
const oendp = { x: 330 - /** @type {number}*/ (asset.Left), y: 815 - /** @type {number}*/ (asset.Top) };

/** @type {ExtendedItemCallbacks.AfterDraw<{cache: ChainCanvasCache}>} */
function afterDraw(drawData) {
    const { C, A, X, Y, Color, drawCanvas, drawCanvasBlink, AlphaMasks, L, PersistentData } = drawData;
    if (L === "链条") {
        if (!C.WearingCollar()) return;
        const data = PersistentData();
        if (!data.cache) {
            const canvas = AnimationGenerateTempCanvas(C, A, 500, 1000 + CanvasUpperOverflow);
            data.cache = new ChainCanvasCache(canvas);
        }
        const start = { ...ostartp, y: ostartp.y + CanvasUpperOverflow };
        const end = { x: oendp.x + X, y: oendp.y + Y };
        const baseColor = Color.startsWith("#") ? Color : "#666666";
        const canvas = data.cache.chain({ start, end, sagFactor: 2.0, linkSize: 10 }, { baseColor, thickness: 2 });

        drawCanvas(canvas, 0, 0, AlphaMasks);
        drawCanvasBlink(canvas, 0, 0, AlphaMasks);
    }
}

export default function () {
    registerDrawHook(asset, "ItemNeckRestraints", { afterDraw });
    AssetManager.addAssetWithConfig("ItemNeckRestraints", asset, { translation, layerNames });
}
