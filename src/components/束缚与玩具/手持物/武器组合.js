import { ArmMaskTool } from "../../../lib";
import { AssetManager } from "../../../assetForward";

/** @type {CustomGroupName} */
const group = "ItemHandheld";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "武器组合",
    Random: false,
    Difficulty: -10,
    ParentGroup: {},
    IsRestraint: false,
    Fetish: ["Sadism"],
    PoseMapping: {
        ...AssetPoseMapping.ItemHandheld,
    },
    Layer: [
        { Left: 0, Top: 90, Name: "法杖1", AllowTypes: { t: 0 } },
        { Left: 0, Top: 90, Name: "法杖2", AllowTypes: { t: 0 } },
        { Left: 40, Top: 60, Name: "剑", CreateLayerTypes: ["s"], AllowTypes: { t: 1 } },
        { Left: 40, Top: 60, Name: "弩", CreateLayerTypes: ["s"], AllowTypes: { t: 2 } },
        { Left: 40, Top: 60, Name: "斧", CreateLayerTypes: ["s"], AllowTypes: { t: 3 } },
        // Scythe of La Pluma By Pl.e
        { Left: 0, Top: -125, Name: "羽毛笔", CreateLayerTypes: ["s"], AllowTypes: { t: 4 } },
        // Excalibur of Saber By KEAINAUX
        { Left: 50, Top: 80, Name: "胜利剑", CreateLayerTypes: ["s"], AllowTypes: { t: 5 } },
        { Left: 20, Top: 40, Name: "玛恩纳", CreateLayerTypes: ["s"], AllowTypes: { t: 6 } },
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
        剑: "剑",
        弩: "弩",
        斧: "斧",

        羽毛笔: "羽毛笔-镰刀",
        胜利剑: "誓约胜利之剑",
        玛恩纳: "玛恩纳-剑",
    },
    EN: {
        法杖1: "Crystal",
        法杖2: "Staff",
        剑: "Sword",
        弩: "Crossbow",
        斧: "Axe",

        羽毛笔: "La Pluma - Scythe",
        胜利剑: "Excalibur",
        玛恩纳: "Młynar - Sword",
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
            DrawImages: true,
            Options: [{}, {}, {}, {}, {}, {}, {}],
        },
        {
            Name: "Sheathe",
            Key: "s",
            Options: [{ Property: { OverridePriority: 4 } }, { Property: { AllowActivity: ["RubItem", "SpankItem"] } }],
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
        Optiont4: "羽毛笔-镰刀",
        Optiont5: "誓约胜利之剑",
        Optiont6: "玛恩纳-剑",

        Sett0: "SourceCharacter给了TargetCharacter一个法杖道具。",
        Sett1: "SourceCharacter给了TargetCharacter一个剑道具。",
        Sett2: "SourceCharacter给了TargetCharacter一个弩道具。",
        Sett3: "SourceCharacter给了TargetCharacter一个斧道具。",
        Sett4: "SourceCharacter给了TargetCharacter一把属于羽毛笔的镰刀道具。",
        Sett5: "SourceCharacter给了TargetCharacter一把属于阿尔托利亚的誓约胜利之剑道具。",
        Sett6: "SourceCharacter给了TargetCharacter一把属于玛恩纳的剑道具。",

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
        Optiont4: "La Pluma - Scythe",
        Optiont5: "Excalibur",
        Optiont6: "Młynar - Sword",

        Sett0: "SourceCharacter gives TargetCharacter a staff prop.",
        Sett1: "SourceCharacter gives TargetCharacter a sword prop.",
        Sett2: "SourceCharacter gives TargetCharacter a crossbow prop.",
        Sett3: "SourceCharacter gives TargetCharacter an axe prop.",
        Sett4: "SourceCharacter gives TargetCharacter a scythe prop from La Pluma.",
        Sett5: "SourceCharacter gives TargetCharacter a Excalibur prop from Artoria.",
        Sett6: "SourceCharacter gives TargetCharacter a sword prop from Młynar.",

        SelectSheathe: "Select Draw",
        Options0: "Sheathe",
        Options1: "Draw",

        Sets0: "SourceCharacter sheathes DestinationCharacter weapon.",
        Sets1: "SourceCharacter draw DestinationCharacter weapon.",
    },
};

export default function () {
    ArmMaskTool.createArmMaskForCloth(group, asset, "Right", [{ t: [0, 1, 3, 4, 5, 6], s: 1 }]);
    AssetManager.addAssetWithConfig(group, asset, { translation, layerNames, extended, assetStrings });
}
