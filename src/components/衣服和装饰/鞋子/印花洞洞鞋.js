import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../../../assetForward";
import { PoseMapTool } from "../../../lib";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "洞洞鞋",
    Random: false,
    Left: 120,
    Top: 860,
    PoseMapping: {
        Kneel: "Hide",
        KneelingSpread: "Hide",
        LegsClosed: "LegsClosed",
        Spread: "Spread",
        Hogtied: "Hogtied",
        AllFours: "Hide",
    },
    ParentGroup: "BodyLower",
    DefaultColor: ["#6F8460", "#222", "Default"],
    Layer: [
        { Name: "u", Priority: 7, InheritPoseMappingFields: true, PoseMapping: { Hogtied: "Hide" } },
        {
            Name: "t2",
            Priority: 7,
            CopyLayerColor: "t",
            AllowTypes: { typed: 0 },
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "p2",
            Priority: 7,
            CopyLayerColor: "p",
            AllowTypes: { typed: [1, 2, 3] },
            CreateLayerTypes: ["typed"],
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            AllowColorize: false,
            HasImage: false,
            Alpha: [
                {
                    Group: ["BodyLower", "Socks", "SocksLeft", "SocksRight"],
                    Masks: [[250, 910, 100, 50]],
                    Pose: ["LegsClosed"],
                },
            ],
        },
        { Name: "t", AllowTypes: { typed: 0 }, InheritPoseMappingFields: true, PoseMapping: { Hogtied: "Hide" } },
        {
            Name: "p",
            AllowTypes: { typed: [1, 2, 3] },
            CreateLayerTypes: ["typed"],
            InheritPoseMappingFields: true,
            PoseMapping: { Hogtied: "Hide" },
        },
        {
            Name: "h",
            Top: 495,
            Left: 200,
            Priority: 7,
            CopyLayerColor: "u",
            ParentGroup: {},
            PoseMapping: PoseMapTool.fromHide({ Hogtied: "Hogtied" }),
        },
    ],
};

const layerNames = {
    CN: { u: "鞋底", t: "鞋面", p: "图案鞋面" },
    EN: { u: "Sole", t: "Upper", p: "Patterned Upper" },
};

const translation = {
    CN: "印花洞洞鞋",
    EN: "Printed Crocs",
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    Options: [{ Name: "0" }, { Name: "1" }, { Name: "2" }, { Name: "3" }],
};

const assetStrings = {
    CN: {
        Select: "选择图案",
        0: "纯色",
        1: "图案1",
        2: "图案2",
        3: "图案3",
    },
    EN: {
        Select: "Select Pattern",
        0: "Plain Color",
        1: "Pattern 1",
        2: "Pattern 2",
        3: "Pattern 3",
    },
};

export default function () {
    AssetManager.addImageMapping({
        [ImageMapTools.assetPreview("Shoes", "洞洞鞋")]: ImageMapTools.assetOption("Shoes", "洞洞鞋", "0"),
    });
    AssetManager.addImageMapping(ImageMapTools.mirrorBodyTypeLayer("Shoes", asset, "Normal", ["Small", "Large"]));
    AssetManager.addAssetWithConfig("Shoes", asset, { layerNames, translation, extended, assetStrings });
}
