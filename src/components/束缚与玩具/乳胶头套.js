import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "乳胶头套_Luzi",
    Random: false,
    Gender: "F",
    Top: 0,
    Left: 0,
    Difficulty: 50,
    Time: 15,
    AllowLock: true,
    AllowTighten: true,
    Fetish: ["Leather"],
    Block: [],
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
        {
            Name: "隐藏前发",
            DrawImages: false,
            Key: "F",
            Options: [
                {},
                {
                    Property: {
                        Hide: [
                            "HairFront",
                            // @ts-ignore
                            "新前发_Luzi",
                        ],
                    },
                },
            ],
        },
        {
            Name: "隐藏后发",
            DrawImages: false,
            Key: "B",
            Options: [
                {},
                {
                    Property: {
                        Hide: [
                            "HairBack",
                            // @ts-ignore
                            "新后发_Luzi",
                        ],
                    },
                },
            ],
        },
    ],
};

/**@type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["ItemHood"], ["乳胶头套_Luzi"], {
    CN: {
        SelectBase: "透光度",
        Select透光度: "透光度",
        Module透光度: "透光度",
        Optionl0: "透光",
        Optionl1: "不透光",
        Setl0: "SourceCharacter使DestinationCharacter的头套变得透明",
        Setl1: "SourceCharacter使DestinationCharacter的头套变得不透明",
    
        Select隐藏前发: "隐藏前发",
        Module隐藏前发: "隐藏前发",
        OptionF0: "显示",
        OptionF1: "隐藏",
        SetF0: "SourceCharacter显示了DestinationCharacter的前发",
        SetF1: "SourceCharacter隐藏了DestinationCharacter的前发",
    
        Select隐藏后发: "隐藏后发",
        Module隐藏后发: "隐藏后发",
        OptionB0: "显示",
        OptionB1: "隐藏",
        SetB0: "SourceCharacter显示了DestinationCharacter的后发",
        SetB1: "SourceCharacter隐藏了DestinationCharacter的后发",
    },
    EN: {
        SelectBase: "Visibility",
        Select透光度: "Hood Transparency",
        Module透光度: "Transparency Mode",
        Optionl0: "See-through",
        Optionl1: "Opaque",
        Setl0: "SourceCharacter makes DestinationCharacter's latex hood transparent",
        Setl1: "SourceCharacter makes DestinationCharacter's latex hood opaque",
    
        Select隐藏前发: "Front Hair",
        Module隐藏前发: "Front Hair Visibility",
        OptionF0: "Show",
        OptionF1: "Hide",
        SetF0: "SourceCharacter reveals DestinationCharacter's front hair",
        SetF1: "SourceCharacter covers DestinationCharacter's front hair",
    
        Select隐藏后发: "Back Hair",
        Module隐藏后发: "Back Hair Visibility",
        OptionB0: "Show",
        OptionB1: "Hide",
        SetB0: "SourceCharacter reveals DestinationCharacter's back hair",
        SetB1: "SourceCharacter covers DestinationCharacter's back hair",
    },
});

const translations = {
    CN: "乳胶头套",
    EN: "Latex Hood",
};

export default function () {
    AssetManager.addAsset("ItemHood", asset, extened, translations);
    AssetManager.addCustomDialog(dialog);
}
