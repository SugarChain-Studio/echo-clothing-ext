import { DialogTools, Tools } from "@mod-utils/Tools";
import { AssetManager } from "../../assetForward";
import { createItemDialogModular } from "../../lib";
import { DrawMods, SharedCenterModifier } from "@mod-utils/ChatRoomOrder";
import { luggageHandler } from "./行李箱";

const dialog = createItemDialogModular([
    {
        location: { x: 1385, y: 650, w: 225, h: 55 },
        key: "抓住箱子",
        show: ({ data, chara }) => data.currentModule === "Base" && chara.MemberNumber !== Player.MemberNumber,
        enable: ({ chara }) =>
            (ChatRoomLeashList.includes(chara.MemberNumber) || ChatRoomCanBeLeashed(chara)) &&
            ((item) => !item || item.Asset.Name === "抓住宠物箱")(
                Player.Appearance.find((i) => i.Asset.Group.Name === "ItemMisc")
            ),
        onclick: ({ chara }) => {
            luggageHandler.emitAll("grabLuggage", { Sender: Player.MemberNumber, Target: chara.MemberNumber });
        },
        leaveDialog: true,
        actionKey: "抓住箱子动作",
    },
]);

/** @type {AddAssetWithConfigParams} */
const assets = [
    "ItemDevices",
    {
        Name: "宠物箱",
        Random: false,
        Left: 0,
        Top: 0,
        SetPose: ["AllFours"],
        AllowActivePose: ["Hogtied", "AllFours"],
        OverrideHeight: { Height: -550, Priority: 58 },
        Priority: 58,
        EditOpacity: true,
        MinOpacity: 0,
        AllowLock: true,
        DrawLocks: false,
        Time: 30,
        Prerequisite: ["NotSuspended", "NotLifted"],
        Effect: [E.Leash, E.Freeze, E.BlockWardrobe, E.MapImmobile],
        Layer: [
            {
                HasImage: false,
                AllowColorize: false,
                Alpha: [
                    {
                        Masks: [
                            [0, -CanvasUpperOverflow, 500, CanvasUpperOverflow + 90],
                            [0, -200, 109, 1000 + 200],
                            [391, -200, 109, 1000 + 200],
                            [0, 368, 500, CanvasLowerOverflow + 610],
                            AssetLowerOverflowAlpha,
                            AssetUpperOverflowAlpha,
                        ],
                        Pose: ["AllFours", "Hogtied"],
                    },
                ],
                Priority: 59,
            },
            { Name: "箱内上", Priority: 4, ColorGroup: "箱内" },
            { Name: "箱内下", Priority: 4, ColorGroup: "箱内" },
            { Name: "外壳上", Priority: 59, ColorGroup: "外壳" },
            { Name: "外壳下", Priority: 59, ColorGroup: "外壳" },
            { Name: "提手", Priority: 62 },
            { Name: "环形吊钩" },
            {
                Name: "门",
                Priority: 60,
                Opacity: 1,
                CreateLayerTypes: ["s"],
                AllowTypes: { s: [1, 2, 3] },
            },
            { 
                Name: "锁",
                Priority: 60,
                AllowTypes: { s: [1, 2, 3] },
            },
            {
                Name: "锁链",
                Opacity: 1,
                CreateLayerTypes: ["c"],
                AllowTypes: { c: [1, 2] },
            },
            {
                Name: "坐垫",
                Priority: 5,
                Opacity: 1,
                CreateLayerTypes: ["m"],
                AllowTypes: { m: [1, 2] },
            },
            {
                Name: "遮光布",
                Opacity: 1,
                CreateLayerTypes: ["b"],
                AllowTypes: { b: [1] },
                Priority: 61,
            },
        ],
    },
    {
        translation: { CN: "宠物箱", EN: "Pet Crate" },
        layerNames: {
            CN: {
                箱内上: "箱内上",
                箱内下: "箱内下",
                外壳上: "外壳上",
                外壳下: "外壳下",
                环形吊钩: "环形吊钩",
                提手: "提手",
                门: "门",
                锁: "锁",
                锁链: "锁链",
                坐垫: "坐垫",
                遮光布: "遮光布",

                箱内: "箱内",
                外壳: "外壳",
            },
            EN: {
                箱内上: "Crate Inner Top",
                箱内下: "Crate Inner Bottom",
                外壳上: "Crate Outer Top",
                外壳下: "Crate Outer Bottom",
                提手: "Handle",
                环形吊钩: "Ring Hook",
                门: "Door",
                锁: "Lock",
                锁链: "Chains",
                坐垫: "Mat",
                遮光布: "Light Blocking Cloth",

                箱内: "Crate Inner",
                外壳: "Crate Outer",
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
                    Name: "箱门",
                    Key: "s",
                    Options: [
                        { Property: { Difficulty: 4, Effect: [] } },
                        { Property: { Difficulty: 6, Effect: [E.Enclose, E.Block] } },
                        { Property: { Difficulty: 6, Effect: [E.BlindLight, E.Enclose, E.Block] } },
                        { Property: { Difficulty: 6, Effect: [E.BlindNormal, E.Enclose, E.Block] } },
                    ],
                },
                {
                    Name: "锁链",
                    Key: "c",
                    Options: [
                        {},
                        { Prerequisite: ["Collared"], Property: { Difficulty: 18, Effect: [E.Tethered, E.IsChained, E.MapImmobile] } },
                        { Prerequisite: ["Collared"], Property: { Difficulty: 26, Effect: [E.Tethered, E.IsChained, E.MapImmobile] } },
                    ],
                },
                {
                    Name: "坐垫",
                    Key: "m",
                    Options: [{}, {}, {}],
                },
                {
                    Name: "遮光布",
                    Key: "b",
                    Options: [
                        { Property: { Effect: [] } },
                        { Property: { Effect: [E.BlindHeavy] } },
                    ],
                },
            ],
        },
        assetStrings: {
            CN: {
                SelectBase: "配置宠物箱",
                Module锁链: "锁链",
                Module坐垫: "坐垫",
                Module箱门: "箱门",
                Module遮光布: "遮光布",
                Select锁链: "选择锁链数量",
                Select坐垫: "选择坐垫类型",
                Select箱门: "选择箱门",
                Select遮光布: "设置宠物箱遮光布",
                Optionc0: "无",
                Optionc1: "单条",
                Optionc2: "多条",
                Optionm0: "无",
                Optionm1: "宠物垫",
                Optionm2: "贴身衣物",
                Options0: "无",
                Options1: "铁丝网",
                Options2: "透明玻璃",
                Options3: "塑料门",
                Optionb0: "无",
                Optionb1: "遮光布",
                ...DialogTools.modularSetMessage(
                    "c",
                    ["无", "单条", "多条"],
                    (field) => `SourceCharacter将DestinationCharacterAssetName锁链设置为${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "m",
                    ["无", "宠物垫", "贴身衣物"],
                    (field) => `SourceCharacter将DestinationCharacterAssetName坐垫设置为${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "s",
                    ["无", "铁丝网", "透明玻璃", "塑料门"],
                    (field) => `SourceCharacter将DestinationCharacterAssetName门设置为${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "b",
                    ["移除", "盖上"],
                    (field) => `SourceCharacter${field}了DestinationCharacter遮光布`
                ),
                抓住箱子: "🖐️抓住宠物箱",
                抓住箱子动作: "SourceCharacter抓住了DestinationCharacterAssetName",
            },
            EN: {
                SelectBase: "Configure Pet Crate",
                Module锁链: "Chains",
                Module坐垫: "Mat",
                Module箱门: "Door Style",
                Module遮光布: "Light Blocking Cloth",
                Select锁链: "Select number of chains",
                Select坐垫: "Select mat type",
                Select箱门: "Select door style",
                Select遮光布: "Select pet crate light blocking cloth",
                Optionc0: "None",
                Optionc1: "Single",
                Optionc2: "Multiple",
                Optionm0: "None",
                Optionm1: "Pet Pad",
                Optionm2: "Lining Clothes",
                Options0: "None",
                Options1: "Wire Mesh",
                Options2: "Glass Door",
                Options3: "Plastic Door",
                Optionb0: "None",
                Optionb1: "Covered",
                ...DialogTools.modularSetMessage(
                    "c",
                    ["none", "single", "multiple"],
                    (field) => `SourceCharacter set DestinationCharacter AssetName to be ${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "m",
                    ["none", "pet pad", "lining clothes"],
                    (field) => `SourceCharacter set DestinationCharacter AssetName to be ${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "s",
                    ["none", "wire mesh", "glass door", "plastic door"],
                    (field) => `SourceCharacter set DestinationCharacter AssetName to be ${field}`
                ),
                ...DialogTools.modularSetMessage(
                    "b",
                    ["removed", "covered"],
                    (field) => `SourceCharacter ${field} DestinationCharacter light blocking cloth`
                ),
                抓住箱子: "🖐️Grab Crate",
                抓住箱子动作: "SourceCharacter grabbed DestinationCharacter AssetName",
            },
        },
    },
];

export default function () {
    AssetManager.addAssetWithConfig(...assets);

    SharedCenterModifier.addModifier(
        DrawMods.asset(
            [{ prev: "宠物箱", next: "抓住宠物箱" }],
            ["center", { X: 50, Y: -50 }],
            ["center", { X: -50, Y: 0 }]
        )
    );
}
