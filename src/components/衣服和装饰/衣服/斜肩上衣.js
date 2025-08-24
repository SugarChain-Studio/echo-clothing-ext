import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";
import { takeLayerNames } from "../../../lib";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "斜肩上衣_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Extended: true,
    Prerequisite: ["HasBreasts"],
    PoseMapping: {
        BackCuffs: "BackCuffs",
        BackElbowTouch: "BackElbowTouch",
        OverTheHead: "OverTheHead",
        Yoked: "Yoked",
        Hogtied: "Hide",
        AllFours: "Hide",
    },
    Layer: [
        { Name: "左", ColorGroup: "衣服", AllowTypes: { typed: 0 } },
        { Name: "右", ColorGroup: "衣服", AllowTypes: { typed: 1 } },
    ],
};

const layerNames = {
    CN: takeLayerNames(asset),
    EN: {
        左: "Left",
        右: "Right",
        衣服: "Cloth",
    },
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "左" }, { Name: "右" }],
};

/** @type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        Select: "设置",
        左: "左",
        右: "右",
    },
    EN: {
        Select: "Select",
        左: "Left",
        右: "Right",
    },
    RU: {
        Select: "Выбрать",
        左: "Лево",
        右: "Право",
    },
};

const translation = {
    CN: "斜肩上衣",
    EN: "Off-the-shoulder Top",
    RU: "Топ с открытым плечом",
};

export default function () {
    ArmMaskTool.createArmMaskForCloth("Cloth", asset);
    AssetManager.addAssetWithConfig("Cloth", asset, { extended, translation, assetDialogs, layerNames });
}
