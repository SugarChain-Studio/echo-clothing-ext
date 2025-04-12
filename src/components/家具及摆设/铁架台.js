import { AssetManager } from "../../assetForward";
import { Tools } from "@mod-utils/Tools";
import { VersionSupport } from "@mod-utils/VersionSupport";
import { takeLayerNames } from "../../utils";

/** @type {TopLeft.Definition} */
const baseTop = {
    [PoseType.DEFAULT]: 800,
    Kneel: 550,
    KneelingSpread: 550,
};

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "铁架台",
    ParentGroup: VersionSupport.NoParentGroup,
    Random: false,
    Left: 0,
    Top: 0,
    DefaultColor: [],
    PoseMapping: {},
    AllowLock: true,
    Time: 30,
    RemoveTimer: 20,
    Effect: [E.Mounted, E.BlockWardrobe],
    Difficulty: 8,
    Layer: [
        {
            Top: baseTop,
            Name: "底座",
            Priority: 5,
        },
        {
            Top: baseTop,
            Name: "阴影",
            AllowColorize: false,
            Priority: 5,
        },
        {
            Top: baseTop,
            Name: "螺丝",
            Priority: 5,
        },
        {
            Top: {
                [PoseType.DEFAULT]: 0,
                Kneel: -250,
                KneelingSpread: -250,
            },
            Left: 300,
            Name: "竖杆",
            ColorGroup: "金属杆",
            Priority: 5,
        },
        {
            Top: 140,
            Name: "横杆",
            ColorGroup: "金属杆",
            Priority: 5,
        },
        {
            Top: 140,
            Name: "横杆扣件",
            Priority: 5,
        },
        {
            Top: 140,
            Name: "横枷铐阴影",
            AllowColorize: false,
            Priority: 5,
            AllowTypes: { y: 1 },
        },
        {
            Top: 140,
            Name: "横枷铐",
            ColorGroup: "横枷铐",
            Priority: 5,
            AllowTypes: { y: 1 },
        },
        {
            Top: 140,
            Name: "横枷铐前",
            ColorGroup: "横枷铐",
            Priority: 34,
            AllowTypes: { y: 1 },
        },
        {
            Top: 140,
            Name: "项圈阴影",
            AllowColorize: false,
            Priority: 5,
        },
        {
            Top: 140,
            Name: "项圈",
            ColorGroup: "项圈",
            Priority: 5,
        },
        {
            Top: 140,
            Name: "项圈前",
            ColorGroup: "项圈",
            Priority: 34,
        },
    ],
};

/** @type {Translation.Dialog} */
const layerNames = {
    CN: {
        ...takeLayerNames(asset),
        金属杆: "金属杆",
    },
    EN: {
        底座: "Base",
        螺丝: "Screw",
        竖杆: "Vertical",
        横杆: "Horizontal",
        金属杆: "Metal Bars",
        横杆扣件: "Horizontal Bar Fastener",
        横枷铐: "Yoke Cuff",
        横枷铐前: "Yoke Cuff Front",
        项圈: "Collar",
        项圈前: "Collar Front",
    },
};

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    ChatTags: Tools.CommonChatTags(),
    Modules: [
        {
            Name: "高度",
            Key: "h",
            DrawImages: true,
            Options: [
                {
                    Property: {
                        SetPose: ["LegsClosed"],
                        AllowActivePose: [...PoseAllStanding],
                    },
                },
                {
                    Property: {
                        SetPose: ["Kneel"],
                        AllowActivePose: [...PoseAllKneeling],
                    },
                },
            ],
        },
        {
            Name: "横枷",
            Key: "y",
            DrawImages: true,
            Options: [
                {},
                {
                    Difficulty: 16,
                    Property: {
                        Effect: [E.Block, E.NotSelfPickable],
                        SetPose: ["Yoked"],
                    },
                },
            ],
        },
    ],
};

/** @type {Translation.Entry} */
const description = {
    CN: "铁架台",
    EN: "Buret Stand",
};

/** @type {Translation.Dialog} */
const assetDialogs = {
    CN: {
        SelectBase: "选择铁架台设置",
        Module高度: "高度",
        Module横枷: "横枷",

        Select高度: "选择铁架台高度",
        Optionh0: "站立",
        Optionh1: "跪姿",

        Seth0: "SourceCharacter将DestinationCharacterAssetName的横杆抬升到勉强踮脚站立的高度。",
        Seth1: "SourceCharacter将DestinationCharacterAssetName的横杆降低到不得不跪下的高度。",

        Select横枷: "选择铁架台横枷",
        Optiony0: "无",
        Optiony1: "有",
        Sety0: "SourceCharacter解开DestinationCharacterAssetName上的横枷，解放了DestinationCharacter双手。",
        Sety1: "SourceCharacter将DestinationCharacterAssetName的横枷锁上，让DestinationCharacter双手失去自由。",
    },
    EN: {
        SelectBase: "Select Buret Stand Configuration",
        Module高度: "Height",
        Module横枷: "Yoke",

        Select高度: "Select Buret Stand Height",
        Optionh0: "Standing",
        Optionh1: "Kneeling",

        Seth0: "SourceCharacter raises the horizontal bar of DestinationCharacter AssetName to a height where TargetCharacter can barely stand on her toes.",
        Seth1: "SourceCharacter lowers the horizontal bar of DestinationCharacter AssetName to a height where TargetCharacter has to kneel down.",

        Select横枷: "Select Buret Stand Yoke",
        Optiony0: "None",
        Optiony1: "Yoked",
        Sety0: "SourceCharacter unlocks the yoke on DestinationCharacter AssetName, freeing DestinationCharacter hands.",
        Sety1: "SourceCharacter locks the yoke on DestinationCharacter AssetName, depriving DestinationCharacter hands of freedom.",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("ItemDevices", asset, {
        extended,
        layerNames,
        description,
        assetDialogs,
    });
}
