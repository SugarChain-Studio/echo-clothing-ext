import { AssetManager } from "@local/AssetManager";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "嘴笼",
    Random: false,
    Left: 200,
    Top: 70,
    ParentGroup: {},
    Fetish: ["Pet", "Metal"],
    Difficulty: 6,
    Time: 20,
    AllowLock: true,
    AllowTighten: true,
    DynamicGroupName: "ItemMouth",
    Effect: [E.BlockMouth, E.ProtrudingMouth],
    Layer: [
        { Name: "inner" },
        { Name: "shade" },
        { Color: ["#DADADA"], Name: "cage" },
        { Color: ["#191919"], Name: "strap" },
        { Name: "screw" },
        { Name: "buckle" },
    ],
};

const layerNames = {
    CN: {
        inner: "内衬",
        shade: "笼子阴影",
        cage: "笼子",
        strap: "绑带",
        screw: "绑带铆钉",
        buckle: "扣环",
    },
    EN: {
        inner: "Lining",
        shade: "Shade",
        cage: "Cage",
        strap: "Strap",
        screw: "Rivet",
        buckle: "Buckle",
    },
};

const translation = {
    CN: "修型嘴笼",
    EN: "Shaped Mouth Cage",
};

/** @type {AddAssetWithConfigParams[]} */
const assetN = [
    ["Mask", asset, { layerNames, translation }],
    ["ItemMouth", asset, { layerNames, translation }],
    ["ItemMouth2", { ...asset, Block: ["ItemMouth"] }, { layerNames, translation }],
    ["ItemMouth3", { ...asset, Block: ["ItemMouth", "ItemMouth2"] }, { layerNames, translation }],
];

export default function () {
    AssetManager.addAssetWithConfig(assetN);
}
