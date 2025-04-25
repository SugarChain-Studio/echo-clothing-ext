import { AssetManager } from "../../../assetForward";

/** @type {AssetPoseMapping} */
const PoseMapping = {
    LegsClosed: "LegsClosed",
    Spread: "Spread",
    Kneel: PoseType.HIDE,
    KneelingSpread: PoseType.HIDE,
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "袜子蝴蝶结",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    ParentGroup: {},
    DefaultColor: ["#991d1d", "#991d1d", "#991d1d", "#991d1d", "#991d1d", "#991d1d", "#991d1d", "#991d1d"],
    Priority: 22,
    PoseMapping: {
        Hogtied: PoseType.HIDE,
        AllFours: PoseType.HIDE,
        Kneel: "Kneel",
        KneelingSpread: "KneelingSpread",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
    },
    Layer: [
        { Name: "蝴蝶结1 左" },
        { Name: "蝴蝶结2 左", PoseMapping },
        { Name: "蝴蝶结3 左", PoseMapping },
        { Name: "蝴蝶结4 左", PoseMapping },
        { Name: "蝴蝶结1 右" },
        { Name: "蝴蝶结2 右", PoseMapping },
        { Name: "蝴蝶结3 右", PoseMapping },
        { Name: "蝴蝶结4 右", PoseMapping },
    ],
};

const translation = {
    CN: "袜子蝴蝶结",
    EN: "Socks Bow",
};

const layerNames = {
    CN: {
        "蝴蝶结1 左": "左蝴蝶结1(底部)",
        "蝴蝶结2 左": "左蝴蝶结2",
        "蝴蝶结3 左": "左蝴蝶结3",
        "蝴蝶结4 左": "左蝴蝶结4",
        "蝴蝶结1 右": "右蝴蝶结1(底部)",
        "蝴蝶结2 右": "右蝴蝶结2",
        "蝴蝶结3 右": "右蝴蝶结3",
        "蝴蝶结4 右": "右蝴蝶结4",
    },
    EN: {
        "蝴蝶结1 左": "Left Bow 1 (Bottom)",
        "蝴蝶结2 左": "Left Bow 2",
        "蝴蝶结3 左": "Left Bow 3",
        "蝴蝶结4 左": "Left Bow 4",
        "蝴蝶结1 右": "Right Bow 1 (Bottom)",
        "蝴蝶结2 右": "Right Bow 2",
        "蝴蝶结3 右": "Right Bow 3",
        "蝴蝶结4 右": "Right Bow 4",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Garters", asset, { translation, layerNames });
}
