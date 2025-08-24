import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomGroupName} */
const group = "ItemHandheld";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "武器组合",
    Random: false,
    Left: 30,
    Top: 90,
    Priority: 34,
    Difficulty: -10,
    ParentGroup: {},
    IsRestraint: false,
    Fetish: ["Sadism"],
    PoseMapping: {
        ...AssetPoseMapping.ItemHandheld,
    },
    Layer: [
        { Name: "法杖1", AllowTypes: { t: 0 } },
        { Name: "法杖2", AllowTypes: { t: 0 } },
        { Name: "剑1", AllowTypes: { t: 1, s: 0 }, Priority: 4 },
        { Name: "剑2", CopyLayerColor: "剑1", AllowTypes: { t: 1, s: 1 } },
        { Name: "弩1", AllowTypes: { t: 2, s: 0 }, Priority: 4 },
        { Name: "弩2", CopyLayerColor: "弩1", AllowTypes: { t: 2, s: 1 } },
        { Name: "斧1", AllowTypes: { t: 3, s: 0 }, Priority: 4 },
        { Name: "斧2", CopyLayerColor: "斧1", AllowTypes: { t: 3, s: 1 } },
    ],
};

const translation = {
    CN: "武器道具套装",
    EN: "Weapon Props Set",
};

const layerNames = {
    CN: {
        法杖1: "水晶",
        法杖2: "法杖",
        剑1: "剑",
        弩1: "弩",
        斧1: "斧",
    },
    EN: {
        法杖1: "Crystal",
        法杖2: "Staff",
        剑1: "Sword",
        弩1: "Crossbow",
        斧1: "Axe",
    },
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    DrawImages: false,
    Modules: [
        {
            Name: "Type",
            Key: "t",
            DrawImages: false,
            Options: [{}, {}, {}, {}],
        },
        {
            Name: "Sheathe",
            Key: "s",
            DrawImages: false,
            Options: [{}, { Property: { AllowActivity: ["RubItem", "SpankItem"] } }],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "选择配置",
        ModuleType: "武器类型",
        ModuleSheathe: "拔出收起",

        SelectType: "选择武器",
        Optiont0: "法杖",
        Optiont1: "剑",
        Optiont2: "弩",
        Optiont3: "斧",

        Sett0: "SourceCharacter给了TargetCharacter一个法杖道具。",
        Sett1: "SourceCharacter给了TargetCharacter一个剑道具。",
        Sett2: "SourceCharacter给了TargetCharacter一个弩道具。",
        Sett3: "SourceCharacter给了TargetCharacter一个斧道具。",

        SelectSheathe: "选择拔出",
        Options0: "收起",
        Options1: "拔出",

        Sets0: "SourceCharacter收起了DestinationCharacter武器。",
        Sets1: "SourceCharacter拔出了DestinationCharacter武器。",
    },
    EN: {
        SelectBase: "Select Configuration",
        ModuleType: "Weapon Type",
        ModuleSheathe: "Draw or Sheathe",

        SelectType: "Select Weapon",
        Optiont0: "Staff",
        Optiont1: "Sword",
        Optiont2: "Crossbow",
        Optiont3: "Axe",

        Sett0: "SourceCharacter gives TargetCharacter a staff prop.",
        Sett1: "SourceCharacter gives TargetCharacter a sword prop.",
        Sett2: "SourceCharacter gives TargetCharacter a crossbow prop.",
        Sett3: "SourceCharacter gives TargetCharacter an axe prop.",

        SelectSheathe: "Select Draw",
        Options0: "Sheathe",
        Options1: "Draw",

        Sets0: "SourceCharacter sheathes DestinationCharacter weapon.",
        Sets1: "SourceCharacter draw DestinationCharacter weapon.",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth(group, asset, "Right", [
        { t: [1, 3], s: 1 },
        { t: 0, s: [0, 1] },
    ]);
    AssetManager.addAssetWithConfig(group, asset, { translation, layerNames, extended, assetStrings });
}
