import { ArmMaskTool } from "@local/lib/generator";
import { PostPass } from "@local/lib/pass";
import { AssetManager } from "@local/AssetManager";
import { luziSuffixFixups } from "@local/lib/fixups";

/** @type {AddAssetWithConfigParams} */
const asset = [
    "Cloth",
    PostPass.asset(
        {
            Name: "星紫上",
            Random: false,
            Top: 0,
            Left: 0,
            ParentGroup: "BodyUpper",
            PoseMapping: {
                Yoked: "Yoked",
                OverTheHead: "OverTheHead",
                BackBoxTie: "BackBoxTie",
                BackElbowTouch: "BackElbowTouch",
                BackCuffs: "BackCuffs",
                Hogtied: PoseType.HIDE,
                AllFours: PoseType.HIDE,
            },
            Layer: [
                { Name: "A1", Priority: 35, },
                { Name: "A2", Priority: 35, },
                { Name: "B1", Priority: 35, },
            ],
        },
        (asset) => {
            ArmMaskTool.createArmMaskForCloth("Cloth", asset);
            luziSuffixFixups("Cloth", asset.Name);
        }
    ),
    {
        translation: { CN: "星紫", EN: "星紫" },
        layerNames: {
            CN: {
                A1: "A1",
                A2: "A2",
                B1: "B1",
            },
            EN: {
                A1: "A1",
                A2: "A2",
                B1: "B1",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...asset);
}
