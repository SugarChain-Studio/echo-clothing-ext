import { AssetManager } from "../../assetForward";
import { createItemDialogNoArch } from "../../lib";
import { runAutoCloseLegs } from "./自动闭腿";

const groups = AssetFemale3DCG.filter((g) => g.Clothing).map((g) => /** @type {AssetGroupBodyName} */ (g.Group));

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "兼容工具",
    Visible: false,
    Random: false,
    Gender: "F",
};

const translation = {
    CN: "兼容工具",
    EN: "Compatibility Tools",
};

/**
 * @param {Item} item
 * @param {AssetGroupName} groupName
 */
function toggleHide(item, groupName) {
    item.Property ??= {};
    item.Property.Hide ??= [];
    const old = item.Property.Hide;
    item.Property.Hide = old.includes(groupName)
        ? old.filter((i) => i !== groupName) // 删除
        : [...old, groupName]; // 添加
}

const itemDialog = createItemDialogNoArch()
    .addTexts([{ location: { x: 1500, y: 375, w: 750 }, text: ({ text }) => text("详细设置") }])
    .addCheckBoxes(
        groups.map((g, i) => ({
            text: () => AssetGroupGet("Female3DCG", g).Description,
            location: { x: 1100 + Math.floor(i / 8) * 200, y: 430 + (i % 8) * 70 },
            textWidth: 120,
            onclick: ({ item }) => toggleHide(item, g),
            checked: ({ item }) => item.Property?.Hide?.includes(g),
        }))
    );

/** @type {ExtendedItemScriptHookCallbacks.ScriptDraw<ModularItemData, {}>} */
function scriptDraw(data, originalFunction, { C, Item }) {
    if (C.IsPlayer() && Item?.Property?.TypeRecord?.c === 1) {
        runAutoCloseLegs();
    }
}

/** @type {ModularItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.MODULAR,
    DrawImages: false,
    ScriptHooks: { ScriptDraw: scriptDraw },
    Modules: [
        {
            Name: "Hide",
            Key: "h",
            Options: [
                {},
                { Property: { Hide: groups } },
                {
                    HasSubscreen: true,
                    ArchetypeConfig: {
                        Archetype: ExtendedArchetype.NOARCH,
                        ScriptHooks: itemDialog.createHooks(["Click", "Draw"]),
                    },
                },
            ],
        },
        {
            Name: "Close",
            Key: "c",
            Options: [{}, {}],
        },
    ],
};

const assetStrings = {
    CN: {
        SelectBase: "配置外观兼容工具",
        ModuleHide: "隐藏衣服",
        ModuleClose: "自动闭腿",

        SelectHide: "配置隐藏衣服",
        Optionh0: "不隐藏",
        Optionh1: "隐藏基础衣物",
        Optionh2: "细节配置",

        SelectClose: "配置自动闭腿",
        Optionc0: "关闭",
        Optionc1: "启用",

        详细设置: "详细设置隐藏图层",
        上一页: "上一页",
        下一页: "下一页",
    },
    EN: {
        SelectBase: "Configure Appearance Compatibility Tools",
        ModuleHide: "Hide Clothing",
        ModuleClose: "Auto-Close Legs",

        SelectHide: "Configure Hide",
        Optionh0: "Do not hide",
        Optionh1: "Hide base clothing",
        Optionh2: "Detail configuration",

        SelectClose: "Configure Auto-Close Legs",
        Optionc0: "Disable",
        Optionc1: "Enable",

        详细设置: "Detailed Hide Settings",
        上一页: "Previous Page",
        下一页: "Next Page",
    },
};

export default function () {
    AssetManager.addAssetWithConfig("外观工具", asset, { translation, layerNames: {}, extended, assetStrings });
}
