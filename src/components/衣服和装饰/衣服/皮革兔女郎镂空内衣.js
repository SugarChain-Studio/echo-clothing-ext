import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "皮革兔女郎镂空内衣",
    Random: false,
    Left: 160,
    Top: 210,
    Priority: 21,
    Expose: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
    DefaultColor: [
        "Default",
        "#111111",
        "Default",
        "#111111",
        "Default",
        "#111111",
        "Default",
        "#111111",
        "Default",
        "Default",
    ],
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
    },
    Layer: [
        {
            Name: "圆环",
            ParentGroup: {},
        },
        {
            Name: "连接",
            ColorGroup: "底色",
        },
        {
            Name: "连接反光",
            ColorGroup: "反光",
        },
        {
            Name: "胸罩带",
            ColorGroup: "底色",
        },
        {
            Name: "胸罩带反光",
            ColorGroup: "反光",
        },
        {
            Name: "胸罩",
            ColorGroup: "底色",
        },
        {
            Name: "胸罩反光",
            ColorGroup: "反光",
        },
        {
            Name: "皮革带",
            ColorGroup: "底色",
        },
        {
            Name: "皮革带反光",
            ColorGroup: "反光",
        },
        {
            Name: "拉链",
            ParentGroup: {},
        },
    ],
};

const layerNames = {
    EN: {
        圆环: "Ring",
        连接: "Connector",
        连接反光: "Connector Reflective",
        胸罩带: "Bra Strap",
        胸罩带反光: "Bra Strap Reflective",
        胸罩: "Bra",
        胸罩反光: "Bra Reflective",
        皮革带: "Leather Strap",
        皮革带反光: "Leather Strap Reflective",
        拉链: "Zipper",

        底色: "Base Color",
        反光: "Reflective",
    },
};

/** @type {Translation.Entry} */
const translation = {
    CN: "皮革兔女郎镂空内衣",
    EN: "Leather Bunny Hollow Bra",
};

export default function () {
    AssetManager.addAssetWithConfig("Bra", asset, { layerNames, translation });
}
