import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳胶眼罩_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    AllowLock: true,
    AllowTighten: true,
    Fetish: ["Leather"],
    Priority: 44,
    Layer: [
        { Name: "A1" },
        { Name: "A2" },
        { Name: "A3" },
    ],
};

/**@type {AssetArchetypeConfig} */
const extened = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "透光度",
            DrawImages: false,
            Key: "l",
            Options: [
                {},
                {
                    Property: {
                        Effect: [
                            E.BlindHeavy,
                            E.DeafLight,
                            E.BlockWardrobe,
                        ],
                    },
                },
            ],
        },
    ],
};

/**@type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["ItemHead"], ["乳胶眼罩_Luzi"], {
    CN: {
        "SelectBase": "透光度",
        "Select透光度": "透光度",
        "Module透光度": "透光度",
        "Optionl0": "透光",
        "Optionl1": "不透光",
        "Setl0": "SourceCharacter使DestinationCharacter的眼罩变得透明",
        "Setl1": "SourceCharacter使DestinationCharacter的眼罩变得不透明",
    },
    EN: {
        "SelectBase": "Transparency",
        "Select透光度": "Transparency",
        "Module透光度": "Transparency",
        "Optionl0": "Transparent",
        "Optionl1": "Opaque",
        "Setl0": "SourceCharacter makes DestinationCharacter's blindfold transparent",
        "Setl1": "SourceCharacter makes DestinationCharacter's blindfold opaque",
    },
});

const translations = {
    CN: "乳胶眼罩",
    EN: "Latex Blindfold",
};

export default function () {
    AssetManager.addAsset("ItemHead", asset, extened, translations);
    AssetManager.addCustomDialog(dialog);
}
