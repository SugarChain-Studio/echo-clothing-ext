import { AssetManager } from "../../assetForward";
import { ChainCanvasCacheWSide } from "../chain";
import { Tools } from "@mod-utils/Tools";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "栓柱",
    Random: false,
    Left: 350,
    Top: 440,
    Time: 15,
    Difficulty: 4,
    Priority: 60,
    Fetish: ["Metal"],
    Audio: "ChainLong",
    AllowLock: true,
    ParentGroup: {},
    DrawLocks: false,
    DynamicGroupName: "ItemNeckRestraints",
    DynamicAfterDraw: true,
    FixedPosition: true,
    Effect: [E.Tethered, E.IsChained, E.MapImmobile],
    Prerequisite: ["NotMounted"],
    ExpressionTrigger: [
        { Name: "Medium", Group: "Blush", Timer: 15 },
        { Name: "Soft", Group: "Eyebrows", Timer: 5 },
    ],
    Layer: [
        { Name: "pillar" },
        { Name: "base" },
        { Name: "screw" },
        { Name: "link1", HasImage: false },
        { Name: "slider" },
        { Name: "link2", CopyLayerColor: "link1", HasImage: false },
    ],
};

const layerNames = {
    CN: {
        pillar: "金属柱",
        base: "底座",
        screw: "锁紧螺丝",
        slider: "滑块",
        link1: "链条",
    },
    EN: {
        pillar: "Metal Pillar",
        base: "Base",
        screw: "Locking Screw",
        slider: "Slider",
        link1: "Chain",
    },
};

const translation = {
    CN: "栓绳柱",
    EN: "Tethering Pillar",
};

const ostartp = { x: 250, y: 227 };
const oendp = { x: 375 - /** @type {number}*/ (asset.Left), y: 530 - /** @type {number}*/ (asset.Top) };

/** @type {{link1: "left", link2: "right"}} */
const linkSide = { link1: "left", link2: "right" };

/** @type {ExtendedItemCallbacks.AfterDraw<{cache: ChainCanvasCacheWSide}>} */
function afterDraw(drawData) {
    const { C, A, X, Y, Color, drawCanvas, drawCanvasBlink, AlphaMasks, L, PersistentData } = drawData;
    if (L === "link1" || L === "link2") {
        if (!C.WearingCollar()) return;

        const data = PersistentData();
        if (!data.cache) {
            const canvasL = AnimationGenerateTempCanvas(C, A, 500, 1000 + CanvasUpperOverflow);
            const canvasR = AnimationGenerateTempCanvas(C, A, 500, 1000 + CanvasUpperOverflow);
            data.cache = new ChainCanvasCacheWSide(canvasL, canvasR);
        }

        const start = { ...ostartp, y: ostartp.y + CanvasUpperOverflow };
        const end = { x: oendp.x + X, y: oendp.y + Y };

        const baseColor = Color.startsWith("#") ? Color : "#666666";

        const canvas = data.cache.chain(
            { start, end, sagFactor: 2.0, linkSize: 10 },
            { baseColor, thickness: 2 },
            linkSide[L]
        );

        drawCanvas(canvas, 0, 0, AlphaMasks);
        drawCanvasBlink(canvas, 0, 0, AlphaMasks);
    }
}

export default function () {
    const groups = /** @type {AssetGroupItemName[]} */ (["ItemNeckRestraints", "ItemDevices", "ItemMisc"]);
    Tools.drawHook(asset, groups, { afterDraw });
    AssetManager.addAssetWithConfig(groups, asset, { translation, layerNames });
}
