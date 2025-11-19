import { ArmMaskTool, PostPass } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";

/** @type {AddAssetWithConfigParamsNoGroup[]} */
const asset = [
    [
        PostPass.asset(
            {
                Name: "女仆装",
                Random: false,
                Gender: "F",
                Top: 0,
                Left: 0,
                Priority: 30,
                Prerequisite: ["HasBreasts"],
                ParentGroup: {},
                PoseMapping: { AllFours: "AllFours", Hogtied: "Hogtied" },
                Layer: [{ Name: "裙子" }, { Name: "围裙" }, { PoseMapping: {}, ParentGroup: {}, Name: "蝴蝶结" }],
            },
            (asset) => {
                ArmMaskTool.createArmMaskForCloth("Cloth", asset, "Arm1");
            }
        ),
        {
            translation: { CN: "女仆装", EN: "Maid Dress", RU: "Костюм горничной" },
            layerNames: { EN: { 裙子: "Skirt", 围裙: "Apron", 蝴蝶结: "Bow" } },
        },
    ],
    [
        PostPass.asset(
            {
                Name: "女仆装2",
                Random: false,
                Gender: "F",
                Top: 0,
                Left: 0,
                Priority: 30,
                Prerequisite: ["HasBreasts"],
                DefaultColor: ["#3F3F3F", "#808080"],
                Layer: [
                    {
                        Name: "裙子",
                        PoseMapping: {
                            Yoked: "Yoked",
                            OverTheHead: "OverTheHead",
                            BackElbowTouch: "BackElbowTouch",
                            BackCuffs: "BackCuffs",
                            AllFours: "Hide",
                            Hogtied: "Hogtied",
                        },
                    },
                    {
                        Name: "围裙",
                        PoseMapping: {
                            AllFours: "Hide",
                            Hogtied: "Hogtied",
                            TapedHands: "TapedHands",
                        },
                    },
                ],
            },
            (asset) => {
                ArmMaskTool.createArmMaskForCloth("Cloth", asset);
            }
        ),
        {
            translation: { CN: "女仆装 2", EN: "Maid Dress 2", RU: "Костюм горничной 2" },
            layerNames: { EN: { 裙子: "Skirt", 围裙: "Apron" } },
        },
    ],
];

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset);
    for (const [assetDef] of asset) {
        luziSuffixFixups("Cloth", assetDef.Name);
    }
}
