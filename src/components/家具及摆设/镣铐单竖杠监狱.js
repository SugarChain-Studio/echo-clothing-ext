import { AssetManager } from "../../assetForward";
import { DialogTools } from "@mod-utils/Tools";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "单监_Luzi",
    Random: false,
    Top: 0,
    Left: 0,
    Difficulty: 8,
    AllowLock: true,
    AllowTighten: true,
    DrawLocks: false,
    RemoveTime: 5,
    Time: 10,
    Extended: true,
    // Effect: [E.Freeze, E.BlockWardrobe, E.Block, E.Mounted, E.MapImmobile, E.OnBed, E.OneWayEnclose],
    Hide: [],
    Layer: [
        {
            Name: "A_底盘", ParentGroup: null,
            Priority: 1,
        },
        {
            Name: "A_柱子伸缩", ParentGroup: null,
            Priority: 1,
        },
        {
            Name: "A_阳具", ParentGroup: null,
            Priority: 1,
        },
        {
            Name: "A_柱子1", ParentGroup: null,
            Priority: 1,
        },
        {
            Name: "A_柱子2", ParentGroup: null,
            Priority: 1,
        },
        {
            Name: "A_柱子3", ParentGroup: null,
            Priority: 1,
        },

        {
            Name: "B_默认1", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "B_默认2", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "B_默认3", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "B_默认4", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "B_默认5", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "B_默认6", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
        },

        {
            Name: "C_并腿1", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "C_并腿2", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "C_并腿3", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "C_并腿4", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
        },

        {
            Name: "D_开腿1", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "D_开腿2", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "D_开腿3", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "D_开腿4", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "D_开腿5", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
        },
        {
            Name: "D_开腿6", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
        },
    ],
};

/** @type {AssetArchetypeConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChangeWhenLocked: false,
    Modules: [
        {
            Name: "姿势",
            DrawImages: false,
            Key: "o",
            Options: [
                {},
                { Property: { SetPose: ["LegsClosed"] } },
                { Property: { SetPose: ["Spread"] } },
            ],
        },
        {
            Name: "嘴巴固定",
            DrawImages: false,
            Key: "g",
            Options: [{}, {}],
        },
    ],
};

/** @type {Translation.Dialog} */
const dialog = DialogTools.replicateGroupedItemDialog(["ItemDevices"], ["单监_Luzi"], {
    CN: {
        SelectBase: "选择配置",

        Select姿势: "选择腿部姿势",
        Module姿势: "腿部姿势",
        Optiono0: "默认",
        Optiono1: "并腿",
        Optiono2: "开腿",

        Select嘴巴固定: "选择嘴部拘束",
        Module嘴巴固定: "嘴部拘束",
        Optiong0: "无",
        Optiong1: "添加嘴部拘束",
        Optiong2: "添加嘴部拘束",

        Seto0: "SourceCharacter修改了DestinationCharacter腿部姿势",
        Seto1: "SourceCharacter修改了DestinationCharacter腿部姿势",
        Seto2: "SourceCharacter修改了DestinationCharacter腿部姿势",
    },
    EN: {
        SelectBase: "Select Leg Spread Display Configuration",

        Select姿势: "Select Pose",
        Module姿势: "Pose",
        Optiono0: "Behind Back",
        Optiono1: "Lift Hands",

        Select嘴巴固定: "Select Mouth Restraint",
        Module嘴巴固定: "Mouth Restraint",
        Optiong0: "None",
        Optiong1: "Add Mouth Restraint",

        Select下体棒子: "Select Genital Prop",
        Module下体棒子: "Genital Prop",
        Optionv0: "None",
        Optionv1: "Add Genital Prop",

        Select自定义高度: "Set Height",
        Module自定义高度: "Adjust Height",
        Optiond0: "None",
        Optiond1: "Custom Height",

        Seto1: "SourceCharacter modifies DestinationCharacter hand restraints",
        Seto0: "SourceCharacter modifies DestinationCharacter hand restraints",

        Setg0: "SourceCharacter removes DestinationCharacter mouth restraint",
        Setg1: "SourceCharacter adds DestinationCharacter mouth restraint",

        Setv0: "SourceCharacter removes DestinationCharacter genital prop",
        Setv1: "SourceCharacter adds DestinationCharacter genital prop",

        Setd0: "SourceCharacter resets DestinationCharacter height",
        Setd1: "SourceCharacter adjusts DestinationCharacter height",
    },
    RU: {
    },
    UA: {
    },
});

const translations = {
    CN: "镣铐单竖杠监狱",
    EN: "Leg-Spread Display Stand",
    UA: "Розширювач ніг",
    RU: "Leg-Spread Display Stand",
};

export default function () {
    AssetManager.addAsset("ItemDevices", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}
