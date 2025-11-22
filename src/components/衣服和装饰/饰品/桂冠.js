import { AssetManager } from "../../../assetForward";

/** @type {AddAssetWithConfigParams} */
const asset = [
    ["HairAccessory1", "HairAccessory3", "Hat"],
    {
        Name: "桂冠",
        Random: false,
        Left: 170,
        Top: 80,
        DynamicGroupName: "Hat",
    },
    { translation: { CN: "桂冠", EN: "Laurel Crown" } },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
