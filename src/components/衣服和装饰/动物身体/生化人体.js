import { AssetManager } from "../../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { Tools } from "@mod-utils/Tools";
import { partialDraw } from "./metaDraw";

/** @type {ExtendedItemCallbacks.AfterDraw<{}>} */
function androidDraw(drawData) {
    const { C, A, X, Y, drawCanvas, drawCanvasBlink, AlphaMasks, L } = drawData;

    if (L === "上身遮罩" || L === "下身遮罩") {
        const { Canvas, CanvasBlink } = partialDraw(C, A, L === "上身遮罩" ? ["BodyUpper"] : ["BodyLower"]);

        const maskURL = Tools.getAssetURL(drawData, "身体遮罩");

        DrawImageEx(maskURL, Canvas.getContext("2d"), X, Y, { BlendingMode: "destination-out" });
        DrawImageEx(maskURL, CanvasBlink.getContext("2d"), X, Y, { BlendingMode: "destination-out" });

        drawCanvas(Canvas, 0, 0, AlphaMasks);
        drawCanvasBlink(CanvasBlink, 0, 0, AlphaMasks);
    }
    if (L === "底部") {
        const { Canvas, CanvasBlink } = partialDraw(C, A, ["BodyUpper", "BodyLower"]);

        const maskURL = Tools.getAssetURL(drawData, "底部遮罩");

        DrawImageEx(maskURL, Canvas.getContext("2d"), X, Y, { BlendingMode: "destination-in" });
        DrawImageEx(maskURL, CanvasBlink.getContext("2d"), X, Y, { BlendingMode: "destination-in" });

        drawCanvas(Canvas, 0, 0, AlphaMasks);
        drawCanvasBlink(CanvasBlink, 0, 0, AlphaMasks);
    }
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

    HookManager.globalFunction(`Assets${assetGroup}${asset.Name}AfterDraw`, androidDraw);

    AssetManager.addAssetWithConfig(assetGroup, asset, {
        translation,
        layerNames,
    });
}
