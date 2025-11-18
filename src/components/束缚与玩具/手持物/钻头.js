/* eslint-disable no-unused-vars */

// import { AssetManager } from "../../../assetForward";
import { DialogTools, Tools } from "@mod-utils/Tools";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

/** @type {CustomGroupName} */
const group = "ItemHandheld";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "钻头-Luzi",
    Random: false,
    Top: 110,
    Left: 10,
    Priority: 34,
    Difficulty: -10,
    ParentGroup: {},
    IsRestraint: false,
    PoseMapping: {
        ...AssetPoseMapping.ItemHandheld,
    },
    DefaultColor: ["#888888"],
    DynamicBeforeDraw: true,
    DynamicScriptDraw: true,
    Layer: [
        {
            Priority: 26,
            Name: "Base",
        },
    ],
};

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [
        {
            Name: "不转",
        },
        {
            Name: "转转转",
        },
    ],
};

/**
 * @typedef { { Frame?:number, FrameDelay?:number, Draws: boolean } } MyDataType
 */

// 只有10张图片
const MaxFrame = 10;

const FrameDef = Array.from({ length: MaxFrame }, (_, i) => i);

/** @type {ExtendedItemCallbacks.BeforeDraw<MyDataType>} */
function beforeDraw({ PersistentData }) {
    const Data = PersistentData();
    Data.Frame = Data.Frame || 0;

    Data.Frame = Data.Draws ? (Data.Frame + 1) % MaxFrame : 0;
    return { LayerType: FrameDef[Data.Frame].toString() };
}

/** @type {ExtendedItemCallbacks.ScriptDraw<MyDataType>} */
function scriptDraw({ C, Item, PersistentData }) {
    const typeRecord = (Item.Property && Item.Property.TypeRecord) || {};
    const subType = typeRecord.typed || 0;
    const Data = PersistentData();
    Data.Draws = subType === 1;

    Tools.drawUpdate(C, Data);
}

const dialogs = DialogTools.replicateGroupedItemDialog(["ItemHandheld"], ["钻头_Luzi"], {
    CN: {
        Select: "转不转",
        不转: "不转",
        Set不转: "不转",
        转转转: "转转转",
        Set转转转: "转转转",
    },
    EN: {
        Select: "Spin or Not",
        不转: "Don't Spin",
        Set不转: "Don't Spin",
        转转转: "Spinnnnnn",
        Set转转转: "Spinnnnnn",
    },
    UA: {
        Select: "Ввімкнути або ні",
        不转: "Не вмикати",
        Set不转: "Не вмикати",
        转转转: "ВЖЖЖЖЖЖЖЖ",
        Set转转转: "ВЖЖЖЖЖЖЖЖ",
    },
});

export default function () {
    // HookManager.globalFunction(`Assets${group}${asset.Name}BeforeDraw`, beforeDraw);
    // HookManager.globalFunction(`Assets${group}${asset.Name}ScriptDraw`, scriptDraw);
    // AssetManager.addAsset(group, asset, extended, { CN: "钻头", UA: "Дриль", EN: "Drill" });
    // AssetManager.addCustomDialog(dialogs);
}
