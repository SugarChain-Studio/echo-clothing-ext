import { AssetManager } from "../../../assetForward";
import { takeLayerNames } from "../../../utils";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "插兜雨衣",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Priority: 35,
    AllowActivePose: ["BaseUpper", "TapedHands", "BackBoxTie", "BackElbowTouch", "Hogtied", "AllFours"],
    SetPose: ["BackElbowTouch"],
    LayerVisibility: true,
    DynamicGroupName: "Cloth",
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
        { Name: "透明", AllowTypes: { typed: [0, 2] } },
        { Name: "雨衣", AllowTypes: { typed: 1 } },
        { Name: "雨衣_cp", AllowTypes: { typed: 2 }, Visibility: "Others", CopyLayerColor: "雨衣" },
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
    Options: [{ Name: "透明" }, { Name: "不透" }, { Name: "自己" }],
};

/** @type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        Select: "选择外观",
        不透: "不透",
        透明: "透明",
        自己: "自己透明",

        Set不透: "SourceCharacter将DestinationCharacter雨衣换成了不透明的款式.",
        Set透明: "SourceCharacter将DestinationCharacter雨衣换成了透明的款式.",
        Set自己: "SourceCharacter将DestinationCharacter雨衣换成了不透明的款式，但似乎有一些区别。",
    },
    EN: {
        Select: "Choose look",
        不透: "Opaque",
        透明: "Transparent",
        自己: "Self Transparent",

        Set不透: "SourceCharacter changes DestinationCharacter raincoat to an opaque style.",
        Set透明: "SourceCharacter changes DestinationCharacter raincoat to a transparent style.",
        Set自己:
            "SourceCharacter changes DestinationCharacter raincoat to an opaque style, but it seems to be a bit different.",
    },
};

export default function () {
    const mappings = asset.Layer.filter((layer) => layer.Name.endsWith("_cp")).reduce((acc, layer) => {
        for (const size of ["Small", "Normal", "Large", "XLarge"]) {
            acc[
                `Assets/Female3DCG/Cloth/${asset.Name}_${size}_${layer.Name}.png`
            ] = `Assets/Female3DCG/Cloth/${asset.Name}_${size}_${layer.CopyLayerColor}.png`;
        }
        return acc;
    }, /** @type {Record<string,string>} */ ({}));
    AssetManager.addImageMapping(mappings);

    for (const group of /** @type {AssetGroupBodyName[]} */ (["Cloth", "ClothOuter"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            translation,
            layerNames,
            extended,
            assetDialogs,
        });
    }
}
