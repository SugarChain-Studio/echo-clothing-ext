import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "ItemNipples",
    {
        Name: "铃铛P",
        Difficulty: 10,
        Time: 15,
        Left: 180,
        Top: 300,
        AllowLock: true,
        Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
        Effect: [E.Wiggling, E.UseRemote],
        PoseMapping: { AllFours: "Hide" },
        DynamicGroupName: "ItemNipples",
        ParentGroup: "BodyUpper",
        Layer: [{ Name: "Bow" }, { Name: "Bell" }],
    },
    {
        translation: { CN: "铃铛乳夹", EN: "Bell Nipple Clamps" },
        layerNames: {
            CN: { Bow: "蝴蝶结", Bell: "铃铛" },
            EN: { Bow: "Bow", Bell: "Bell" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
