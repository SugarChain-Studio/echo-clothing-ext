import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "蛇身",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: -100,
    Difficulty: 25,
    Priority: 16,
    ParentGroup: {},
    SetPose: ["LegsClosed"],
    Layer: [
        {
            Name: "身体",
        },
        {
            Name: "肚子",
        },
        {
            Name: "遮罩",
            AllowColorize: false,
            HasImage: false,
            Alpha: [
                {
                    Group: [
                        "BodyLower",
                        "SuitLower",
                        "Garters",
                        "Bra",
                        "Socks",
                        "SocksRight",
                        "SocksLeft",
                        "AnkletRight",
                        "AnkletLeft",
                        "ItemFeet",
                        "ItemLegs",
                        "ItemTorso",
                        "ItemTorso2",
                        "ItemBoots",
                        "Liquid2_Luzi",
                        "身体痕迹_Luzi",
                        "BodyMarkings2_Luzi",
                        "Bra_笨笨蛋Luzi",
                        "Shoes",
                        "Shoes_笨笨蛋Luzi",
                        "ClothAccessory",
                        "ClothAccessory_笨笨蛋Luzi",
                    ],
                    Masks: [[100, 500, 300, 630]],
                    Pose: ["BaseLower", "LegsClosed", "Kneel", "KneelingSpread", "Spread", "LegsOpen"],
                },
            ],
        },
    ],
};

const translation = {
    CN: "蛇身",
    EN: "Snake",
    RU: "Змея",
};

const layerNames = {
    EN: {
        身体: "Body",
        肚子: "Belly",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("动物身体_Luzi", asset, { translation, layerNames });
    AssetManager.addAssetWithConfig("Wings", asset, { translation, layerNames });
}
