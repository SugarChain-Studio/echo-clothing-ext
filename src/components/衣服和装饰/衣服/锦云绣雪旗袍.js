import { AssetManager } from "../../../assetForward";
import { luziSuffixFixups } from "../../../lib/fixups";
/** @type {Partial<AssetLayerDefinition>} */
const bottomLayerShared = {
    ParentGroup: "BodyLower",
    PoseMapping: {
        AllFours: PoseType.HIDE,
        Hogtied: PoseType.HIDE,
    },
    AllowTypes: { typed: 0 },
};

/** @type {Partial<AssetLayerDefinition>} */
const topLayerShared = {
    ParentGroup: "BodyUpper",
    PoseMapping: {
        OverTheHead: "OverTheHead",
        Yoked: "Yoked",
        AllFours: PoseType.HIDE,
        Hogtied: "Hogtied",
    },
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "锦云绣雪旗袍",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Prerequisite: ["HasBreasts"],
    Priority: 26,
    Layer: [
        { Name: "A1", ...bottomLayerShared },
        { Name: "A2", ...bottomLayerShared },
        { Name: "A3", ...bottomLayerShared },
        { Name: "B1", ...topLayerShared },
        { Name: "B2", ...topLayerShared },
        { Name: "B3", ...topLayerShared },
        { Name: "B4", ...topLayerShared },
        { Name: "B5", ...topLayerShared },
    ],
};

const translation = {
    CN: "锦云绣雪旗袍",
    EN: "Brocade Clouds & Snow Embroidery Qipao",
};

const layerNames = {
    CN: {
        A1: "内衬裙子",
        A2: "内衬裙子阴影",
        A3: "内衬裙子边沿",
        B1: "旗袍",
        B2: "旗袍阴影",
        B3: "旗袍边沿",
        B4: "旗袍图案",
        B5: "扣子",
    },
    EN: {
        A1: "Lining Skirt",
        A2: "Lining Skirt Shadow",
        A3: "Lining Skirt Edge",
        B1: "Qipao",
        B2: "Qipao Shadow",
        B3: "Qipao Edge",
        B4: "Qipao Pattern",
        B5: "Button",
    },
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: true,
    Options: [{ Name: "有" }, { Name: "无" }],
};

/** @type {Translation.String} */
const assetStrings = {
    CN: {
        Select: "选择内衬裙子",
        有: "有",
        无: "无",
    },
    EN: {
        Select: "Select Lining Skirt",
        有: "Yes",
        无: "No",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, { translation, layerNames, extended, assetStrings });
    luziSuffixFixups("Cloth", asset.Name);
}
