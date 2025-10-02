import { AssetManager } from "../../../assetForward";
import { SockLRTool } from "../../../lib";

const translation = { CN: "绷带", EN: "Bandage", RU: "Повязка" };

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "绷带_Luzi",
    Random: false,
    Top: 0,
    Left: { "": 0, "KneelingSpread": 30 },
};

/** @type { AddAssetWithConfigParams[] } */
const assets = [
    [
        "Gloves",
        {
            Name: "绷带_Luzi",
            Random: false,
            Top: 0,
            Left: 0,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                TapedHands: "TapedHands",
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackElbowTouch",
                BackElbowTouch: "BackElbowTouch",
                BackCuffs: "BackElbowTouch",
                Hogtied: "Hide",
                AllFours: "Hide",
            },
        },
        { translation },
    ],
    ["Socks", asset, { translation }],
    [
        "Bra",
        {
            Name: "绷带全身_Luzi",
            Random: false,
            Gender: "F",
            Top: 0,
            Left: 0,
            Expose: ["ItemBreast", "ItemNipples", "ItemNipplesPiercings"],
            Layer: [
                {
                    Name: "上身",
                    ParentGroup: "BodyUpper",
                    PoseMapping: {
                        TapedHands: "TapedHands",
                        Yoked: "Yoked",
                        OverTheHead: "OverTheHead",
                        BackBoxTie: "BackElbowTouch",
                        BackElbowTouch: "BackElbowTouch",
                        BackCuffs: "BackElbowTouch",
                        Hogtied: "Hide",
                        AllFours: "Hide",
                    },
                },
                {
                    Name: "下身",
                    ParentGroup: "BodyLower",
                    PoseMapping: {
                        Kneel: "Kneel",
                        KneelingSpread: "KneelingSpread",
                        LegsClosed: "LegsClosed",
                        Spread: "Spread",
                        Hogtied: "Hide",
                        AllFours: "Hide",
                    },
                },
            ],
        },
        { translation, layerNames: { EN: { 上身: "Top", 下身: "Bottom" } } },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig(assets);
    SockLRTool.createSockLR(asset).forEach(([key, value]) => {
        AssetManager.addAssetWithConfig(key, value, { translation });
    });
}
