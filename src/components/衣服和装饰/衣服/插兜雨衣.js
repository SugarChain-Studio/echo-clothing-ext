import { AssetManager } from "../../../assetForward";
import { takeLayerNames } from "../../../utils";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "插兜雨衣",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Extended: true,
    AllowActivePose: ["BaseUpper", "TapedHands", "BackBoxTie", "BackElbowTouch", "Hogtied", "AllFours"],
    SetPose: ["BackElbowTouch"],
    PoseMapping: {
        BackCuffs: "Hide",
        OverTheHead: "Hide",
        Yoked: "Hide",
        Hogtied: "Hide",
        AllFours: "Hide",
        Kneel: "Kneel",
        KneelingSpread: "Kneel",
    },
    Layer: [
        { Name: "透明", Priority: 42, AllowTypes: { typed: 0 } },
        { Name: "雨衣", Priority: 42, AllowTypes: { typed: 1 } },
    ],
};

const layerNames = {
    CN: takeLayerNames(asset),
    EN: {
        透明: "Transparent",
        雨衣: "Raincoat",
    },
};

const translation = {
    CN: "插兜雨衣",
    EN: "Transparent raincoat",
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "透明" }, { Name: "不透" }],
};

/** @type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        Select: "选择外观",
        不透: "不透",
        透明: "透明",

        Set不透: "SourceCharacter将DestinationCharacter雨衣换成了不透明的款式.",
        Set透明: "SourceCharacter将DestinationCharacter雨衣换成了透明的款式.",
    },
    EN: {
        Select: "Choose look",
        不透: "Opaque",
        透明: "Transparent",

        Set不透透明: "SourceCharacter changes DestinationCharacter raincoat to an opaque style.",
        Set透明: "SourceCharacter changes DestinationCharacter raincoat to a transparent style.",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("Cloth", asset, {
        translation,
        layerNames,
        extended,
        assetDialogs,
    });
}
