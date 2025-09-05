import { AssetManager } from "../../../assetForward";
import { Tools } from "@mod-utils/Tools";
import { partialDraw } from "./metaDraw";
import { monadic } from "@mod-utils/monadic";
import { registerDrawHook } from "../../../lib/afterDraw";

const drawConfig = {
    上身遮罩: { partial: ["BodyUpper"], mask: "身体遮罩", blend: "destination-out" },
    下身遮罩: { partial: ["BodyLower"], mask: "身体遮罩", blend: "destination-out" },
    底部: { partial: ["BodyUpper", "BodyLower"], mask: "底部遮罩", blend: "destination-in" },
};

/** @type {ExtendedItemCallbacks.AfterDraw<{}>} */
function afterDraw(drawData) {
    const { C, A, X, Y, drawCanvas, drawCanvasBlink, AlphaMasks, L } = drawData;
    monadic(drawConfig[L]).then(({ partial, mask, blend }) => {
        const { Canvas, CanvasBlink } = partialDraw(C, A, partial);
        const maskURL = Tools.getAssetURL(drawData, mask);
        DrawImageEx(maskURL, Canvas.getContext("2d"), X, Y, { BlendingMode: blend });
        DrawImageEx(maskURL, CanvasBlink.getContext("2d"), X, Y, { BlendingMode: blend });
        drawCanvas(Canvas, 0, 0, AlphaMasks);
        drawCanvasBlink(CanvasBlink, 0, 0, AlphaMasks);
    });
}

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "生化人体",
    Random: false,
    Top: 0,
    Left: 0,
    Priority: 7,
    Gender: "F",
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    DefaultColor: ["Default", "Default", "#696776", "#7E5F69", "#E3BFBF"],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    DynamicAfterDraw: true,
    ParentGroup: {},
    AllowColorize: true,
    EditOpacity: true,
    Hide: ["BodyUpper", "BodyLower", "Nipples"],
    Layer: [
        {
            Name: "底部",
            ParentGroup: "BodyUpper",
            AllowColorize: false,
            HasImage: false,
        },
        {
            Name: "骨架",
            PoseMapping: {
                Kneel: "LegsClosed",
                LegsClosed: "LegsClosed",
                Spread: "Spread",
                KneelingSpread: "KneelingSpread",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
        },
        {
            Name: "阴道",
            Top: 400,
            Left: 180,
        },
        {
            Name: "腹中脑容器",
            Top: 400,
            Left: 180,
        },
        {
            Name: "腹中脑",
            Top: 400,
            Left: 180,
        },
        {
            Name: "上身遮罩",
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
            AllowColorize: false,
            HasImage: false,
        },
        {
            Name: "下身遮罩",
            ParentGroup: "BodyLower",
            PoseMapping: { ...AssetPoseMapping.BodyLower, Kneel: "LegsClosed" },
            AllowColorize: false,
            HasImage: false,
        },
        {
            Name: "网格",
            ParentGroup: "BodyUpper",
        },
    ],
};

const translation = {
    CN: "生化人体",
    EN: "Android Body",
};

const layerNames = {
    EN: {
        骨架: "Skeleton",
        阴道: "Vulva",
        腹中脑容器: "Stomach Brain Container",
        腹中脑: "Stomach Brain",
        网格: "Mesh",
    },
};

export default function () {
    const assetGroup = "动物身体_Luzi";
    registerDrawHook(asset, assetGroup, { afterDraw });
    AssetManager.addAssetWithConfig(assetGroup, asset, {
        translation,
        layerNames,
    });
}
