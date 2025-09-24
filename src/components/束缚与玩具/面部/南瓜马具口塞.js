import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "南瓜马具口塞",
    Random: false,
    Left: 210,
    Top: 80,
    Priority: 36,
    ParentGroup: {},
    Fetish: ["Leather"],
    Difficulty: 6,
    Time: 20,
    AllowLock: true,
    AllowTighten: true,
    Prerequisite: "GagUnique",
    Hide: ["Mouth"],
    Effect: [E.BlockMouth, E.GagMedium],
    ExpressionTrigger: [{ Name: "DroolSides", Group: "Fluids", Timer: 30 }],
    DefaultColor: ["#181818", "Default", "Default", "Default"],
    Layer: [{ Name: "带子" }, { Name: "金属" }, { Name: "南瓜" }, { Name: "眼睛" }],
    PoseMapping: {},
};

const layerNames = {
    EN: {
        带子: "Straps",
        金属: "Metal",
        南瓜: "Pumpkin",
        眼睛: "Eyes",
    },
};

const translation = {
    CN: "南瓜马具口塞",
    EN: "Pumpkin Harness Gag",
    RU: "кляп из тыквы",
    UA: "гарбуз джгут кляп",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemMouth", asset, { translation, layerNames });
}
