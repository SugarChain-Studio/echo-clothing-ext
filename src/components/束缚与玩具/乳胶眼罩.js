import { Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳胶眼罩_Luzi",
    Random: false,
    Gender: "F",
    Left: 190,
    Top: 140,
    Difficulty: 3,
    Time: 10,
    AllowLock: true,
    AllowTighten: true,
    Fetish: ["Leather"],
    Priority: 44,
    DynamicGroupName: "ItemHead",
    Layer: [{ Name: "A1" }, { Name: "A2" }, { Name: "A3" }],
};

const layerNames = {
    CN: {
        A1: "眼罩",
        A2: "带子",
        A3: "扣具",
    },
    EN: {
        A1: "Blindfold",
        A2: "Belt",
        A3: "Buckles",
    },
};

/**@type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "透光度",
            DrawImages: false,
            Key: "l",
            Options: [
                {},
                {
                    Property: {
                        Effect: [E.BlindHeavy, E.BlockWardrobe],
                    },
                },
            ],
        },
    ],
};

/**@type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        SelectBase: "透光度",

        Module透光度: "透光度",
        Select透光度: "设置透光度",
        Optionl0: "透光",
        Optionl1: "不透光",
        Setl0: "SourceCharacter使DestinationCharacterAssetName变得透明",
        Setl1: "SourceCharacter使DestinationCharacterAssetName变得不透明",
    },
    EN: {
        SelectBase: "Transparency",

        Module透光度: "Transparency",
        Select透光度: "Set Transparency",
        Optionl0: "Transparent",
        Optionl1: "Opaque",
        Setl0: "SourceCharacter makes DestinationCharacterAssetName transparent",
        Setl1: "SourceCharacter makes DestinationCharacterAssetName opaque",
    },
};

const translation = {
    CN: "乳胶眼罩",
    EN: "Latex Blindfold",
};

export default function () {
    AssetManager.addAssetWithConfig("ItemHead", asset, { extended, translation, layerNames, assetDialogs });
    for (const g of /** @type {AssetGroupBodyName[]} */ (["Glasses", "Mask"])) {
        AssetManager.addAssetWithConfig(g, asset, { translation, layerNames });
    }
}
