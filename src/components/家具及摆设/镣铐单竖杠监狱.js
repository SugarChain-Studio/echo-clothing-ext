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
            ColorGroup: "金属主体",
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
            ColorGroup: "金属主体",
        },
        {
            Name: "A_柱子2", ParentGroup: null,
            Priority: 1,
            ColorGroup: "金属主体",
        },
        {
            Name: "A_柱子3", ParentGroup: null,
            Priority: 1,
            ColorGroup: "金属主体",
        },

        {
            Name: "B_默认1", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属主体",
        },
        {
            Name: "B_默认2", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属主体",
        },
        {
            Name: "B_默认3", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属左腿",
        },
        {
            Name: "B_默认4", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属右腿",
        },
        {
            Name: "B_默认5", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属左腿",
        },
        {
            Name: "B_默认6", AllowTypes: { o: 0 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属右腿",
        },

        {
            Name: "C_并腿1", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属左腿",
        },
        {
            Name: "C_并腿2", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属右腿",
        },
        {
            Name: "C_并腿3", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属左腿",
        },
        {
            Name: "C_并腿4", AllowTypes: { o: 1 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属右腿",
        },

        {
            Name: "D_开腿1", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属主体",
        },
        {
            Name: "D_开腿2", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属主体",
        },
        {
            Name: "D_开腿3", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属左腿",
        },
        {
            Name: "D_开腿4", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属右腿",
        },
        {
            Name: "D_开腿5", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属左腿",
        },
        {
            Name: "D_开腿6", AllowTypes: { o: 2 },
            Priority: 40, ParentGroup: "BodyLower",
            ColorGroup: "金属右腿",
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
            Name: "姿势2",
            DrawImages: false,
            Key: "g",
            Options: [
                {},
                { Property: { SetPose: ["BackElbowTouch"] } },
            ],
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

        Select姿势2: "选择手部拘束",
        Module姿势2: "手部姿势",
        Optiong0: "无",
        Optiong1: "不知道叫什么",

        Seto0: "SourceCharacter修改了DestinationCharacter腿部姿势",
        Seto1: "SourceCharacter修改了DestinationCharacter腿部姿势",
        Seto2: "SourceCharacter修改了DestinationCharacter腿部姿势",

        Setg0: "SourceCharacter修改了DestinationCharacter手部姿势",
        Setg1: "SourceCharacter修改了DestinationCharacter手部姿势",
    },
    EN: {
    },
});

const translations = {
    CN: "镣铐单竖杠监狱",
    EN: "",
};

export default function () {
    AssetManager.addAsset("ItemDevices", asset, extended, translations);
    AssetManager.addCustomDialog(dialog);
}
