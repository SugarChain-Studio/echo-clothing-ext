import AssetManager from "@mod-utils/AssetManager";
import { Tools } from "@mod-utils/Tools";
import { VersionSupport } from "@mod-utils/VersionSupport";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "幸运贞操带",
    Random: false,
    Gender: "F",
    Fetish: ["Metal"],
    Top: 390,
    Left: 140,
    Difficulty: 42,
    Time: 50,
    RemoveTime: 60,
    AllowLock: true,
    Audio: "CuffsMetal",
    ParentGroup: VersionSupport.NoParentGroup,
    DefaultColor: ["#000000", "#deedff", "#d28b81", "#f9fbfe"],
    Prerequisite: ["AccessCrotch", "HasVagina", "CanCoverVulva"],
    ExpressionTrigger: [{ Name: "Soft", Group: "Eyebrows", Timer: 10 }],
    Layer: [
        { Name: "底色" },
        { Name: "色调" },
        { Name: "反射" },
        { Name: "高光" },
    ],
    Effect: [E.Chaste],
    Hide: ["Pussy"],
    Extended: true,
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "Shield",
            Key: "s",
            DrawImages: false,
            Options: [
                {},
                {
                    Prerequisite: ["CanCoverVulva"],
                    Property: {
                        Effect: [E.Chaste],
                        Block: ["ItemVulva", "ItemVulvaPiercings"],
                    },
                },
                {
                    Property: {
                        Effect: [E.ButtChaste],
                        Block: ["ItemButt"],
                    },
                },
                {
                    Prerequisite: ["CanCoverVulva"],
                    Property: {
                        Effect: [E.Chaste, E.ButtChaste],
                        Block: ["ItemVulva", "ItemVulvaPiercings", "ItemButt"],
                    },
                },
            ],
        },
    ],
};

const dialogs = Tools.replicateTypedItemDialog(["ItemPelvis"], ["幸运贞操带"], {
    CN: {
        SelectBase: "选择配置",
        SelectShield: "选择护盾",
        ModuleShield: "选择护盾配置",

        Options0: "都打开",
        Options1: "前部关闭",
        Options2: "后部关闭",
        Options3: "都关闭",
        Sets0: "SourceCharacter将DestinationCharacterAssetName设置为打开所有胯部挡板。",
        Sets1: "SourceCharacter将DestinationCharacterAssetName设置为关闭前部胯部挡板。",
        Sets2: "SourceCharacter将DestinationCharacterAssetName设置为关闭后部胯部挡板。",
        Sets3: "SourceCharacter将DestinationCharacterAssetName设置为关闭所有胯部挡板。",
    },
    EN: {
        SelectBase: "Select Configuration",
        SelectShield: "Select Shield",
        ModuleShield: "Select Shield Configuration",

        Options0: "Open All",
        Options1: "Close Front",
        Options2: "Close Rear",
        Options3: "Close All",
        Sets0: "SourceCharacter sets DestinationCharacter AssetName to open all crotch shields.",
        Sets1: "SourceCharacter sets DestinationCharacter AssetName to close front crotch shield.",
        Sets2: "SourceCharacter sets DestinationCharacter AssetName to close rear crotch shield.",
        Sets3: "SourceCharacter sets DestinationCharacter AssetName to close all crotch shields.",
    }
});

const translations = {
    EN: "Fortune Chastity Belt",
    CN: "幸运贞操带",
};

export default function () {
    AssetManager.addAsset("ItemPelvis", asset, extended, translations);
    AssetManager.addCustomDialog(dialogs);
}