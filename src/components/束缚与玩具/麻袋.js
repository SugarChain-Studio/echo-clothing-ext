import { AssetManager } from "../../assetForward";
import { Typing } from "../../lib";
import { FullMask } from "../功能调整/全身遮罩";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "麻袋_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 12,
    SelfBondage: 8,
    Time: 40,
    RemoveTime: 30,
    Extended: true,
    AllowActivePose: ["BackBoxTie", "BackElbowTouch", "LegsClosed", "Kneel"],
    SetPose: ["BackBoxTie", "LegsClosed"],
    Layer: [
        {
            Name: "麻袋遮罩",
            AllowColorize: false,
            HasImage: false,
            Alpha: [
                {
                    Masks: [
                        [100, 0, 300, 64],

                        [0, 0, 164, 800],
                        [100, 54, 102, 19],
                        [100, 73, 87, 15],

                        [336, 0, 164, 800],
                        [297, 54, 102, 19],
                        [312, 73, 87, 15],

                        [100, 575, 90, 200],
                        [310, 575, 90, 200],
                    ],
                },
            ],
        },
        { Name: "透明", Priority: 62, AllowTypes: { typed: 0 } },
        { Name: "麻袋", Priority: 62, AllowTypes: { typed: 1 } },
        { Name: "绳子", Priority: 62 },
        { Name: "背面", Priority: 1 },
    ],
};

const layerNames = {
    EN: {
        透明: "Transparent",
        麻袋: "Bag",
        绳子: "Rope",
        背面: "Back",
    },
};

const translation = {
    CN: "长麻袋",
    EN: "Long Bag",
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "透明" }, { Name: "不透" }],
};

/** @type {Translation.Dialog} */
const assetStrings = {
    CN: {
        Select: "选择外观",
        不透: "不透",
        透明: "微透明",
        Set不透: "SourceCharacter将DestinationCharacterAssetName换成了不透明的款式.",
        Set透明: "SourceCharacter将DestinationCharacterAssetName换成了微透明的款式.",
    },
    EN: {
        Select: "Select Appearance",
        不透: "Opaque",
        透明: "Translucent",
        Set不透: "SourceCharacter changed DestinationCharacter AssetName to opaque.",
        Set透明: "SourceCharacter changed DestinationCharacter AssetName to translucent.",
    },
};

export default function () {
    for (const group of Typing.groups(["ItemDevices", "ItemHood"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            layerNames,
            extended,
            translation,
            assetStrings,
        });
        FullMask.push(group, asset.Name, ["麻袋遮罩"]);
    }
}
