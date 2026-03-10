import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { createItemDialogModular } from "../../lib";
import { DrawMods, SharedCenterModifier } from "@mod-utils/ChatRoomOrder";
import { luggageHandler } from "./行李箱";

const dialog = createItemDialogModular({
    buttons: [
        {
            location: { x: 1385, y: 650, w: 225, h: 55 },
            key: "抓住箱子",
            show: ({ data, chara }) => data.currentModule === "Base" && chara.MemberNumber !== Player.MemberNumber,
            enable: ({ chara }) =>
                (ChatRoomLeashList.includes(chara.MemberNumber) || ChatRoomCanBeLeashed(chara)) &&
                ((item) => !item || item.Asset.Name === "抓住硬壳行李箱")(
                    Player.Appearance.find((i) => i.Asset.Group.Name === "ItemMisc")
                ),
            onclick: ({ chara }) => {
                luggageHandler.emitAll("grabLuggage", { Sender: Player.MemberNumber, Target: chara.MemberNumber });
            },
            leaveDialog: true,
            actionKey: "抓住箱子动作",
        },
    ],
});

/** @type {ExtendedItemScriptHookCallbacks.BeforeDraw<ModularItemData, {}>} */
function beforeDraw(data, original, { L, Property }) {
    if (L === "箱盖") {
        if (Property?.TypeRecord?.s === 0) return { Opacity: 0.8 };
        else if (Property?.TypeRecord?.s === 1) return { Opacity: 0.9 };
        else return { Opacity: 1 };
    }
    if (L === "衣物堆") {
        return { Opacity: [3].includes(Property?.TypeRecord?.c) ? 0.7 : 1 };
    }
}

/** @type {AddAssetWithConfigParams} */
const assets = [
    "ItemDevices",
    {
        Name: "硬壳行李箱",
        Random: false,
        Left: 0,
        Top: -173,
        SetPose: ["Hogtied"],
        AllowActivePose: ["Hogtied", "AllFours"],
        OverrideHeight: { Height: -520, Priority: 51 },
        Priority: 56,
        EditOpacity: true,
        MinOpacity: 0,
        AllowLock: true,
        DrawLocks: false,
        Time: 30,
        Prerequisite: ["NotSuspended", "NotLifted"],
        Effect: [E.Leash, E.Freeze, E.BlockWardrobe],
        Layer: [
            {
                HasImage: false,
                AllowColorize: false,
                Alpha: [
                    {
                        Masks: [
                            [0, -CanvasUpperOverflow, 500, CanvasUpperOverflow - 11],
                            [0, -200 + 11, 112, 1000 + 200],
                            [389, -200 + 11, 112, 1000 + 200],
                            [0, 390, 500, CanvasLowerOverflow + 610],
                        ],
                    },
                ],
                Priority: 52,
            },
            { Name: "内衬", Priority: 4, MinOpacity: 1 },
            { Name: "箱体", Priority: 56, MinOpacity: 1, ColorGroup: "行李箱" },
            { Name: "滑轮", Priority: 53, MinOpacity: 1 },
            {
                Name: "箱盖",
                Opacity: 1,
                ColorGroup: "行李箱",
                CreateLayerTypes: ["s"],
                AllowTypes: { s: [0, 1, 2] },
            },
            {
                Name: "衣物堆",
                Opacity: 1,
                CreateLayerTypes: ["c"],
                AllowTypes: { c: [1, 2, 3] },
                Priority: 55,
            },
        ],
    },
    {
        translation: { CN: "硬壳行李箱", EN: "Hard-shell Luggage" },
        layerNames: {
            CN: {
                内衬: "内衬",
                箱体: "箱体",
                箱盖: "箱盖",
                滑轮: "滑轮",
                衣物堆: "衣物堆",
            },
            EN: {
                内衬: "Luggage Lining",
                箱体: "Luggage Body",
                箱盖: "Luggage Lid",
                滑轮: "Wheel",
                衣物堆: "Clothing Pile",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            ChatTags: Tools.CommonChatTags(),
            DrawImages: false,
            ChangeWhenLocked: false,
            ScriptHooks: dialog.createHooks({ BeforeDraw: beforeDraw }),
            Modules: [
                {
                    Name: "填充衣物",
                    Key: "c",
                    Options: [{}, {}, {}, { Property: { Effect: [E.BlindHeavy] } }],
                },
                {
                    Name: "行李箱状态",
                    Key: "s",
                    Options: [
                        { Property: { Difficulty: 10, Effect: [E.Enclose, E.BlindHeavy, E.Block] } },
                        { Property: { Difficulty: 6, Effect: [E.BlindNormal] } },
                        { Property: { Difficulty: 6, Effect: [E.BlindLight] } },
                    ],
                },
            ],
        },
        assetStrings: {
            CN: {
                SelectBase: "配置行李箱",
                Module填充衣物: "填充衣物",
                Module行李箱状态: "行李箱状态",
                Select填充衣物: "选择填充衣物的多少",
                Select行李箱状态: "选择行李箱状态",
                Optionc0: "空箱子",
                Optionc1: "少量衣物",
                Optionc2: "没过脖子",
                Optionc3: "塞满",
                Options0: "封闭",
                Options1: "半开",
                Options2: "全开",
                ...DialogTools.modularSetMessage(
                    "c",
                    ["空箱子", "少量衣物", "没过脖子", "塞满"],
                    (field) => `SourceCharacter将DestinationCharacter的AssetName设置为${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "s",
                    ["封闭", "半开", "全开"],
                    (field) => `SourceCharacter将DestinationCharacter的AssetName${field}`
                ),
                抓住箱子: "🖐️抓住箱子",
                抓住箱子动作: "SourceCharacter抓住了DestinationCharacterAssetName",
            },
            EN: {
                SelectBase: "Configure Luggage",
                Module填充衣物: "Clothes Filling",
                Select填充衣物: "Select how much clothes to fill",
                Module行李箱状态: "Luggage State",
                Select行李箱状态: "Select luggage state",
                Optionc0: "Empty",
                Optionc1: "Lightly Filled",
                Optionc2: "Filled to Neck",
                Optionc3: "Completely Filled",
                Options0: "Completely Closed",
                Options1: "Half Open",
                Options2: "Completely Open",
                ...DialogTools.modularSetMessage(
                    "c",
                    ["empty", "lightly filled", "filled to neck", "completely filled"],
                    (field) => `SourceCharacter set DestinationCharacter AssetName to be ${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "s",
                    ["completely closed", "half open", "completely open"],
                    (field) => `SourceCharacter set DestinationCharacter AssetName to be ${field}`
                ),
                抓住箱子: "🖐️Grab Luggage",
                抓住箱子动作: "SourceCharacter grabbed DestinationCharacter AssetName",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);

    SharedCenterModifier.addModifier(
        DrawMods.asset(
            [{ prev: "硬壳行李箱", next: "抓住硬壳行李箱" }],
            ["center", { X: 50, Y: -50 }],
            ["center", { X: -50, Y: 0 }]
        )
    );
}
