import { AssetManager } from "../../../assetForward";
import { Tools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "穿环胸牌",
    Random: false,
    Fetish: ["Masochism"],
    Difficulty: 10,
    Time: 15,
    Left: 150,
    Top: 200,
    AllowLock: true,
    Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
    DynamicGroupName: "ItemNipplesPiercings",
    // ParentGroup: {},
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 5 },
        { Name: "Angry", Group: "Eyebrows", Timer: 5 },
    ],
    Layer: [
        {
            Name: "右胸",
            ColorGroup: "胸牌",
            AllowTypes: { typed: 0 },
        },
        {
            Name: "左胸",
            ColorGroup: "胸牌",
            AllowTypes: { typed: 1 },
        },
    ],
};

const extended = {
    Archetype: ExtendedArchetype.TYPED,
    ChatTags: Tools.CommonChatTags(),
    ChangeWhenLocked: false,
    DrawImages: false,
    Options: [{ Name: "右胸" }, { Name: "左胸" }],
};

const assetStrings = {
    CN: {
        Select: "选择佩戴位置",
        右胸: "右胸",
        左胸: "左胸",
        Set右胸: "SourceCharacter将DestinationCharacterAssetName挂在了右胸上",
        Set左胸: "SourceCharacter将DestinationCharacterAssetName挂在了左胸上",
    },
    EN: {
        Select: "Select The Wearing Position",
        右胸: "Right Nipple",
        左胸: "Left Nipple",
        Set右胸: "SourceCharacter put DestinationCharacter AssetName on the right breast",
        Set左胸: "SourceCharacter put DestinationCharacter AssetName on the left breast",
    },
};

const translation = {
    CN: "穿环胸牌",
    EN: "Piercing Name Badge",
};

const layerNames = {
    CN: {
        胸牌: "胸牌",
        右胸: "右乳头",
        左胸: "左乳头",
    },
    EN: {
        右胸: "Right Nipple",
        左胸: "Left Nipple",
    },
};

export default function () {
    for (const group of /** @type {AssetGroupItemName[]} */ (["ItemNipples", "ItemNipplesPiercings"])) {
        AssetManager.addAssetWithConfig(group, asset, {
            extended,
            translation,
            layerNames,
            assetStrings,
        });
    }
}
