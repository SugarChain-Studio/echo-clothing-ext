import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "HairAccessory2",
    {
        Name: "黑猫耳镜像",
        Random: false,
        Fetish: ["Pet"],
        BodyCosplay: true,
        Layer: [
            { Name: "Outer", HideForAttribute: ["ShortHair"] },
            { Name: "Inner", HideForAttribute: ["ShortHair"] },
            {
                Name: "OuterShort",
                ShowForAttribute: ["ShortHair"],
                CopyLayerColor: "Outer",
                Top: 30,
                Left: 115,
            },
            {
                Name: "InnerShort",
                ShowForAttribute: ["ShortHair"],
                CopyLayerColor: "Inner",
                Top: 30,
                Left: 115,
            },
        ],
    },
    {
        translation: { CN: "黑猫耳镜像", EN: "Black Cat Ears Mirror", RU: "Зеркальные чёрные кошачьи уши" },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
    luziSuffixFixups(asset[0], asset[1].Name);
}
