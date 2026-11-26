import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "鱼嘴高跟鞋",
    Random: false,
    Top: 850,
    Left: 90,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    Layer: [
        {
            Color: ["#FFFFFF"],
            Name: "高光",
            Priority: 24,
        },
        {
            Color: ["#FFFFFF"],
            Name: "卡扣",
            Priority: 24,
        },
        {
            Color: ["#000000"],
            Name: "绑带",
            Priority: 23,
        },
        {
            Color: ["#000000"],
            Name: "鞋面",
            Priority: 23,
        },
        {
            Color: ["#000000"],
            Name: "鞋垫",
            Priority: 7,
        },
        {
            Color: ["#000000"],
            Name: "鞋底",
            Priority: 7,
        },
    ],
};

const layerNames = {
    EN: {
        高光: "Highlight",
        卡扣: "Buckle",
        绑带: "Straps",
        鞋面: "Upper",
        鞋垫: "Insole",
        鞋底: "Sole",
    },
};

const translation = {
    CN: "鱼嘴高跟鞋",
    EN: "Peep-toe Heels",
};

export default function () {
    AssetManager.addAssetWithConfig("Shoes", asset, { translation, layerNames });
    luziSuffixFixups("Shoes", asset.Name);
}
