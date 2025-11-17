import { AssetManager } from "../../../assetForward";
import { luziFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParamsNoGroup} */
const asset = [
    {
        Name: "口红-Luzi",
        Random: false,
        Top: 0,
        Left: 0,
        Priority: 10,
        Layer: [
            {
                Name: "上半身",
                ParentGroup: "BodyUpper",
                PoseMapping: {
                    TapedHands: "TapedHands",
                    Yoked: "Yoked",
                    OverTheHead: "OverTheHead",
                    BackBoxTie: "BackBoxTie",
                    BackElbowTouch: "BackElbowTouch",
                    BackCuffs: "BackCuffs",
                    Hogtied: "Hogtied",
                    AllFours: "Hide",
                },
            },
            {
                Name: "下半身",
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
    {
        translation: { CN: "口红", EN: "Lipstick", RU: "Помада", UA: "Помада" },
        layerNames: { EN: { 上半身: "Upper Body", 下半身: "Lower Body" } },
    },
];

export default function () {
    AssetManager.addAssetWithConfig("身体痕迹_Luzi", ...asset);
    luziFixups("身体痕迹_Luzi", asset[0].Name);
}
