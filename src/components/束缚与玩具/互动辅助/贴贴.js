import { AssetManager } from "../../../assetForward";
import { CustomValidate } from "../../../lib";

/** @type { AddAssetWithConfigParams }} */
const assets = [
    "ItemMisc",
    {
        Name: "贴贴",
        Random: false,
        Visible: false,
        Value: -1,
        Effect: [E.Leash],
    },
    {
        translation: { CN: "贴贴", EN: "Cuddle", RU: "Обнимашки" },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);

    CustomValidate.remove("ItemMisc", "贴贴");
}
