import { AssetManager } from "../../../assetForward";
import { Tools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "人偶_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    AllowLock: true,
    DrawLocks: false,
    Difficulty: 25,
    DynamicBeforeDraw: true,
    Hide: ["HandsLeft", "HandsRight", "BodyLower", "BodyUpper", "ArmsLeft", "ArmsRight"],
    Layer: [
        {
            Name: "下半身",
            Priority: 9,
            Top: 460,
            Left: 0,
            ParentGroup: "BodyLower",
            InheritColor: "BodyLower",
            HideColoring: true,
            ColorSuffix: { HEX_COLOR: "White" },
            PoseMapping: { ...AssetPoseMapping.BodyLower },
        },
        {
            Name: "上半身",
            Priority: 9,
            Top: 0,
            Left: 0,
            ParentGroup: "BodyUpper",
            InheritColor: "BodyUpper",
            HideColoring: true,
            ColorSuffix: { HEX_COLOR: "White" },
            PoseMapping: { ...AssetPoseMapping.BodyUpper },
        },
        {
            Name: "手",
            Priority: 28,
            Top: 0,
            Left: 0,
            ParentGroup: {},
            InheritColor: "BodyUpper",
            HideColoring: true,
            ColorSuffix: { HEX_COLOR: "White" },
            PoseMapping: { ...AssetPoseMapping.HandsLeft },
        },
        {
            Name: "钥匙孔",
            Priority: 10,
            Top: 0,
            Left: 0,
        },
    ],
};

const translation = {
    CN: "人偶",
    EN: "Ball Joint Doll",
    RU: "Кукла на шарнирах",
};

const layerNames = {
    CN: {
        钥匙孔: "钥匙孔",
    },
    EN: {
        钥匙孔: "Keyhole",
    },
};

/** @type {(C:Character, group: AssetGroupName)=>boolean} */
const shouldHide = (C, group) =>
    C.DrawAppearance.some((item) => {
        if (item.Asset.Name === asset.Name) return false;
        if (CharacterAppearanceItemIsHidden(item.Asset.Name, item.Asset.Group.Name)) return false;
        if (item.Asset.Hide?.includes(group)) return true;
        if (item.Property?.Hide?.includes(group)) return true;
        return false;
    });

/** @type {ExtendedItemCallbacks.BeforeDraw} */
function beforeDraw({ C, L }) {
    if (L === "上半身" && shouldHide(C, "BodyUpper")) return { Opacity: 0 };
    if (L === "下半身" && shouldHide(C, "BodyLower")) return { Opacity: 0 };
    if (L === "手" && shouldHide(C, "HandsLeft")) return { Opacity: 0 };
}

export default function () {
    Tools.drawHook(asset, "动物身体_Luzi", { beforeDraw });
    AssetManager.addAssetWithConfig("动物身体_Luzi", asset, { translation, layerNames });
}
