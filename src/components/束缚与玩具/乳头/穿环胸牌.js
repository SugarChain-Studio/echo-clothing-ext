import { AssetManager } from "../../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";
import { PathTools } from "@sugarch/bc-mod-utility";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "穿环胸牌",
    Random: false,
    Fetish: ["Masochism"],
    Value: -1,
    Difficulty: 10,
    Time: 15,
    AllowLock: true,
    Prerequisite: ["AccessBreast", "AccessBreastSuitZip"],
    // ParentGroup: {},
    ExpressionTrigger: [
        { Name: "Closed", Group: "Eyes", Timer: 5 },
        { Name: "Angry", Group: "Eyebrows", Timer: 5 },
    ],
    Layer: [
        {
            Name: "右胸",
            AllowTypes: { typed: 0 },
        },
        {
            Name: "左胸",
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

const dialog = DialogTools.replicateGroupedItemDialog(["ItemNipplesPiercings"], ["穿环胸牌"], {
    CN: {
        Select: "选择佩戴位置",
        右胸: "右胸",
        左胸: "左胸",
        Set右胸: "SourceCharacter将DestinationCharacter的AssetName挂在了右胸上",
        Set左胸: "SourceCharacter将DestinationCharacter的AssetName挂在了左胸上",
    },
    EN: {
        Select: "Select The Wearing Position",
        右胸: "Right Nipple",
        左胸: "Left Nipple",
        Set右胸: "SourceCharacter put DestinationCharacter AssetName on the right breast",
        Set左胸: "SourceCharacter put DestinationCharacter AssetName on the left breast",
    },
});

const translations = {
    CN: "穿环胸牌",
    EN: "Piercing Name Badge",
};

/** @type {Record<string, string>} */
const icons = {
    "Screens/Inventory/ItemNipplesPiercings/穿环胸牌/右胸.png": PathTools.emptyImage,
    "Screens/Inventory/ItemNipplesPiercings/穿环胸牌/左胸.png": PathTools.emptyImage,
};

export default function () {
    AssetManager.addAsset("ItemNipplesPiercings", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
    AssetManager.addImageMapping(icons);
}
