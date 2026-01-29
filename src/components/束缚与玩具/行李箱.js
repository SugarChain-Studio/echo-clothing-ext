import { DialogTools, ImageMapTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { ChatRoomRemoteEventEmitter } from "@sugarch/bc-event-handler";
import { createItemDialogModular } from "../../lib";
import { ChatRoomOrderTools, DrawMods, SharedCenterModifier } from "@mod-utils/ChatRoomOrder";

/**
 * @typedef {Object} LuggageEvent
 * @property {[{Sender:number,Target:number}]} grabLuggage
 */

/** @type {ChatRoomRemoteEventEmitter<LuggageEvent>} */
export const luggageHandler = new ChatRoomRemoteEventEmitter("EchoClothingExt@LuggageHandler");

const dialog = createItemDialogModular([
    {
        location: { x: 1385, y: 650, w: 225, h: 55 },
        key: "抓住箱子",
        show: ({ data }) => data.currentModule === "Base",
        enable: ({ chara }) =>
            (ChatRoomLeashList.includes(chara.MemberNumber) || ChatRoomCanBeLeashed(chara)) &&
            ((item) => !item || item.Asset.Name === "抓住行李箱")(
                Player.Appearance.find((i) => i.Asset.Group.Name === "ItemMisc")
            ),
        onclick: ({ chara }) => {
            luggageHandler.emitAll("grabLuggage", { Sender: Player.MemberNumber, Target: chara.MemberNumber });
        },
        leaveDialog: true,
        actionKey: "抓住箱子动作",
    },
]);

const luggagePairItemMap = {
    行李箱: "抓住行李箱",
    硬壳行李箱: "抓住硬壳行李箱",
    宠物箱: "抓住宠物箱",
};

luggageHandler.on("grabLuggage", ({ senderCharacter }, { Sender, Target }) => {
    if (Target === Player.MemberNumber) {
        if (!ServerChatRoomGetAllowItem(senderCharacter, Player)) return;
        Tools.findCharacter("SourceC", Sender)
            .then(() => InventoryGet(Player, "ItemDevices")?.Asset)
            .then((asset, { SourceC }) => {
                ChatRoomOrderTools.wearAndPair(Player, asset, { nextCharacter: SourceC.MemberNumber }, "follow");
            });
    } else if (Sender === Player.MemberNumber) {
        Tools.findCharacter("TargetC", Target)
            .then((target) => InventoryGet(target, "ItemDevices")?.Asset)
            .then((asset) => luggagePairItemMap[asset.Name])
            .then((name) => AssetGet("Female3DCG", "ItemMisc", name))
            .then((asset, { TargetC }) => {
                ChatRoomOrderTools.wearAndPair(Player, asset, { prevCharacter: TargetC.MemberNumber }, "lead");
            });
    }
});

/** @type {AddAssetWithConfigParams} */
const assets = [
    "ItemDevices",
    {
        Name: "行李箱",
        Random: false,
        Left: 120,
        Top: -200,
        SetPose: ["Hogtied"],
        AllowActivePose: ["Hogtied"],
        OverrideHeight: { Height: -550, Priority: 51 },
        Priority: 56,
        LayerVisibility: true,
        EditOpacity: true,
        MinOpacity: 0,
        AllowLock: true,
        DrawLocks: false,
        Time: 30,
        Prerequisite: ["NotSuspended", "NotLifted"],
        Effect: [E.Leash, E.BlockWardrobe, E.Enclose, E.Freeze, E.BlindTotal],
        Layer: [
            { Name: "主体后", Priority: 4, CopyLayerColor: "主体前" },
            {
                HasImage: false,
                AllowColorize: false,
                Alpha: [
                    {
                        Masks: [
                            [0, -CanvasUpperOverflow, 500, CanvasUpperOverflow - 36],
                            [0, -200 + 36, 127, 1000 + 200],
                            [373, -200 + 36, 127, 1000 + 200],
                            [0, 390, 500, CanvasLowerOverflow + 610],
                            // 四个角落遮罩，遮挡圆角
                            [127 - 15, -36 - 15, 30, 30],
                            [373 - 15, -36 - 15, 30, 30],
                            [127 - 15, 390 - 15, 30, 30],
                            [373 - 15, 390 - 15, 30, 30],
                        ],
                    },
                ],
            },
            { Name: "轴" },
            { Name: "轮1", ColorGroup: "轮子" },
            { Name: "轮1轴内", ColorGroup: "轮子" },
            { Name: "轮1轴外", ColorGroup: "轮子" },
            { Name: "轮1架", ColorGroup: "轮子" },
            { Name: "轮2", ColorGroup: "轮子" },
            { Name: "轮2轴内", ColorGroup: "轮子" },
            { Name: "轮2轴外", ColorGroup: "轮子" },
            { Name: "轮2架", ColorGroup: "轮子" },
            { Name: "扶手杆" },
            { Name: "扶手" },
            {
                Name: "衣服堆",
                Opacity: 0.5,
                Visibility: "Player",
                CreateLayerTypes: ["c"],
                AllowTypes: { c: [1, 2, 3] },
            },
            {
                Name: "衣服堆_",
                CopyLayerColor: "衣服堆",
                Opacity: 0.8,
                Visibility: "Others",
                CreateLayerTypes: ["c"],
                AllowTypes: { c: [1, 2, 3] },
            },
            { Name: "主体前", Opacity: 0.5 },
            { Name: "主体前_", Visibility: "OthersExceptDialog", CopyLayerColor: "主体前" },
            { Name: "防撞角" },
            { Name: "锁紧" },
        ],
    },
    {
        translation: { CN: "行李箱", EN: "Luggage" },
        layerNames: {
            CN: {
                主体后: "主体后",
                轴: "轴",
                轮1: "轮子1",
                轮1轴内: "轮子1轴内",
                轮1轴外: "轮子1轴外",
                轮1架: "轮子1架",
                轮2: "轮子2",
                轮2轴内: "轮子2轴内",
                轮2轴外: "轮子2轴外",
                轮2架: "轮子2架",
                扶手杆: "扶手杆",
                扶手: "扶手",
                主体: "主体",
                衣服堆: "衣服堆",
                主体前: "主体前",
                防撞角: "防撞角",
                锁紧: "锁紧",

                轮子: "轮子",
            },
            EN: {
                主体后: "Main Back",
                轴: "Axle",
                轮1: "Wheel 1",
                轮1轴内: "Wheel 1 Inner Axle",
                轮1轴外: "Wheel 1 Outer Axle",
                轮1架: "Wheel 1 Frame",
                轮2: "Wheel 2",
                轮2轴内: "Wheel 2 Inner Axle",
                轮2轴外: "Wheel 2 Outer Axle",
                轮2架: "Wheel 2 Frame",
                扶手杆: "Handle Rod",
                扶手: "Handle",
                衣服堆: "Clothes Pile",
                主体前: "Main Front",
                防撞角: "Corner Guard",
                锁紧: "Lock",

                轮子: "Wheels",
            },
        },
        extended: {
            Archetype: ExtendedArchetype.MODULAR,
            ChatTags: Tools.CommonChatTags(),
            DrawImages: false,
            ChangeWhenLocked: false,
            ScriptHooks: dialog.createHooks(["Draw", "Click"]),
            Modules: [
                {
                    Name: "填充衣物",
                    Key: "c",
                    Options: [{}, {}, {}, {}],
                },
            ],
        },
        assetStrings: {
            CN: {
                SelectBase: "配置行李箱",

                Module填充衣物: "填充衣物",
                Select填充衣物: "选择填充衣物的多少",
                Optionc0: "空箱子",
                Optionc1: "少量衣物",
                Optionc2: "没过脖子",
                Optionc3: "塞满",

                ...DialogTools.modularSetMessage(
                    "c",
                    ["空箱子", "少量衣物", "没过脖子", "塞满"],
                    (field) => `SourceCharacter将DestinationCharacter的AssetName设置为${field}`
                ),

                抓住箱子: "🖐️抓住箱子",
                抓住箱子动作: "SourceCharacter抓住了DestinationCharacterAssetName",
            },
            EN: {
                SelectBase: "Configure Luggage",

                Module填充衣物: "Clothes Filling",
                Select填充衣物: "Select how much clothes to fill",
                Optionc0: "Empty",
                Optionc1: "Lightly Filled",
                Optionc2: "Filled to Neck",
                Optionc3: "Completely Filled",

                ...DialogTools.modularSetMessage(
                    "c",
                    ["empty", "lightly filled", "filled to neck", "completely filled"],
                    (field) => `SourceCharacter set DestinationCharacter AssetName to be ${field}`
                ),

                抓住箱子: "🖐️Grab Luggage",
                抓住箱子动作: "SourceCharacter grabbed DestinationCharacter AssetName",
            },
        },
    },
];

export default function () {
    AssetManager.addImageMapping({
        ...Object.fromEntries([
            [
                ImageMapTools.assetLayer("ItemDevices", "行李箱_主体前_"),
                ImageMapTools.assetLayer("ItemDevices", "行李箱_主体前"),
            ],
            ...[1, 2, 3].map(
                (i) =>
                    /** @type {[string,string]}*/ ([
                        ImageMapTools.assetLayer("ItemDevices", `行李箱_c${i}_衣服堆_`),
                        ImageMapTools.assetLayer("ItemDevices", `行李箱_c${i}_衣服堆`),
                    ])
            ),
        ]),
    });

    AssetManager.addAssetWithConfig(...assets);

    SharedCenterModifier.addModifier(
        DrawMods.asset(
            [{ prev: "行李箱", next: "抓住行李箱" }],
            ["center", { X: 50, Y: -50 }],
            ["center", { X: -50, Y: 0 }]
        )
    );
}
