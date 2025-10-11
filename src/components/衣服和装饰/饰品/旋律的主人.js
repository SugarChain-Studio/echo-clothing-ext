import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["HairAccessory1", "HairAccessory2", "Hat"],
    {
        Name: "Luzi_MMelodia",
        Left: 230,
        Top: 50,
        ParentGroup: {},
        PoseMapping: {},
        Layer: [{ Name: "1" }, { Name: "2" }, { Name: "3" }, { Name: "4" }],
    },
    {
        translation: {
            CN: "旋律的主人",
            EN: "Master of Melodia",
        },
        layerNames: {
            CN: { 1: "缎带", 2: "金属装饰", 3: "宝石底座", 4: "宝石" },
            EN: { 1: "Ribbon", 2: "Metal Ornament", 3: "Gem Base", 4: "Gem" },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
