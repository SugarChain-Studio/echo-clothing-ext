import { AssetManager } from "../../../assetForward";

/** @type { CustomAssetDefinition} */
const asset = {
    Name: "乳胶口罩",
    Random: false,
    Left: 200,
    Top: 170,
    ParentGroup: {},
    PoseMapping: {},
    Priority: 53,
    DynamicGroupName: "Mask",
    IsRestraint: false,
    DefaultColor: ["#0A0A0A", "Default", "#E2C443"],
    Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }],
};

/** @type {AddAssetWithConfigParams[2]} */
const config = {
    translation: { CN: "乳胶口罩", EN: "Latex Mask" },
    layerNames: {
        CN: { A1: "底色", A2: "光泽", A3: "边缘" },
        EN: { A1: "Base", A2: "Shine", A3: "Edge" },
    },
};

export default function () {
    AssetManager.addAssetWithConfig([[["Mask", "ItemMouth", "ItemMouth2", "ItemMouth3"], asset, config]]);
}
