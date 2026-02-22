import { ChatRoomOrder, ChatRoomOrderTools, DrawMods, SharedCenterModifier } from "@mod-utils/ChatRoomOrder";
import { AssetManager } from "../../../assetForward";
import { createItemDialogNoArch } from "../../../lib";
import { ChatRoomRemoteEventEmitter } from "@sugarch/bc-event-handler";
import { Tools } from "@mod-utils/Tools";
import { monadic } from "@mod-utils/monadic";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

/**
 * @typedef {Object} CarriageEvent
 * @property {[{Sender:number,Target:number}]} leashPonyLead
 * @property {[{Sender:number,Target:number}]} leashPonyRide
 */

/** @type {ChatRoomRemoteEventEmitter<CarriageEvent>} */
export const carriageHandler = new ChatRoomRemoteEventEmitter("EchoClothingExt@CarriageHandler");

const harnessItemName = "马车固定";
const carriageItemName = "马车";

const dialog = createItemDialogNoArch([
    {
        location: { x: 1265, y: 550, w: 225, h: 55 },
        key: "D_连接马车_牵引",
        requireLockPermission: true,
        enable: ({ chara, item }) =>
            Player.CanInteract() &&
            (!item.Property?.LockedBy || DialogCanUnlock(chara, item)) &&
            Player.Appearance.some((a) => a.Asset.Name === carriageItemName),
        hover: ({ chara, item }) => {
            if (!Player.CanInteract()) return "D_无法驾驶_交互";
            if (item.Property?.LockedBy && !DialogCanUnlock(chara, item)) return "D_锁权限";
            if (!Player.Appearance.some((a) => a.Asset.Name === carriageItemName)) return "D_没有马车";
            return "D_hint_连接马车_牵引";
        },
        onclick: ({ chara }) =>
            monadic(Player.Appearance.find((a) => a.Asset.Name === carriageItemName)).then((carriage) => {
                ChatRoomOrderTools.wearAndPair(Player, carriage.Asset, { nextCharacter: chara.MemberNumber }, "follow");
                carriageHandler.emit(chara, "leashPonyLead", {
                    Sender: Player.MemberNumber,
                    Target: chara.MemberNumber,
                });
            }),
        leaveDialog: true,
        actionKey: "A_连接马车_牵引",
    },
    {
        location: { x: 1510, y: 550, w: 225, h: 55 },
        key: "D_连接马车_驾驶",
        requireLockPermission: true,
        enable: ({ chara, item }) =>
            Player.CanInteract() &&
            (!item.Property?.LockedBy || DialogCanUnlock(chara, item)) &&
            Player.Appearance.some((a) => a.Asset.Name === carriageItemName),
        hover: ({ chara, item }) => {
            if (!Player.CanInteract()) return "D_无法驾驶_交互";
            if (item.Property?.LockedBy && !DialogCanUnlock(chara, item)) return "D_锁权限";
            if (!Player.Appearance.some((a) => a.Asset.Name === carriageItemName)) return "D_没有马车";
            return "D_hint_连接马车_驾驶";
        },
        onclick: ({ chara }) =>
            monadic(Player.Appearance.find((a) => a.Asset.Name === carriageItemName)).then((carriage) => {
                ChatRoomOrderTools.wearAndPair(Player, carriage.Asset, { nextCharacter: chara.MemberNumber }, "lead");
                carriageHandler.emit(chara, "leashPonyRide", {
                    Sender: Player.MemberNumber,
                    Target: chara.MemberNumber,
                });
            }),
        leaveDialog: true,
        actionKey: "A_连接马车_驾驶",
    },
]).addTexts([
    {
        location: { x: 1500, y: 650, w: 500 },
        align: "center",
        text: ({ chara, text }) => {
            const xstate = ChatRoomOrderTools.assetState(chara);
            if (xstate && xstate.associatedAsset.asset === harnessItemName) {
                const prev = ChatRoomOrderTools.pick.prev(chara);
                const c = ChatRoomCharacter.find((c) => c.MemberNumber === prev);
                return text("D_连接到马车").replace("CARRIAGE_PLAYER", c ? CharacterNickname(c) : `${prev}`);
            }
        },
    },
]);

/** @type {(arg:{Sender:number,Target:number}, mode: "follow" | "lead")=>void} */
const setCarriagePony = ({ Sender }, mode) => {
    Tools.findCharacter("SourceC", Sender)
        .then(() => Player.Appearance.find((a) => a.Asset.Name === harnessItemName))
        .then((item) => {
            if (!item) return;
            ChatRoomOrderTools.wearAndPair(Player, item.Asset, { prevCharacter: Sender }, mode);
        });
};

carriageHandler
    .on("leashPonyLead", ({ senderCharacter }, { Sender, Target }) => {
        if (Target === Player.MemberNumber) {
            if (!ServerChatRoomGetAllowItem(senderCharacter, Player)) return;
            ChatRoomLeashPlayer = null;
            setCarriagePony({ Sender, Target }, "lead");
        }
    })
    .on("leashPonyRide", ({ senderCharacter }, { Sender, Target }) => {
        if (Target === Player.MemberNumber) {
            if (!ServerChatRoomGetAllowItem(senderCharacter, Player)) return;
            ChatRoomLeashPlayer = Sender;
            setCarriagePony({ Sender, Target }, "follow");
        }
    });

/** @type {AddAssetWithConfigParams[]} */
const asset = [
    [
        "ItemDevices",
        {
            Name: harnessItemName,
            Visible: false,
            AllowLock: true,
            DrawLocks: false,
            Difficulty: 30,
        },
        {
            translation: { CN: "马车固定", EN: "Carriage Harness" },
            extended: {
                Archetype: ExtendedArchetype.NOARCH,
                ChatTags: Tools.CommonChatTags(),
                ScriptHooks: dialog.createHooks(),
            },
            assetStrings: {
                CN: {
                    D_连接马车_牵引: "🐎连接马车（牵引）",
                    D_hint_连接马车_牵引: "将马车连接到此角色，由对方牵引行驶",
                    A_连接马车_牵引: "SourceCharacter将马车和TargetCharacter连接，由TargetCharacter牵引行驶",

                    D_连接马车_驾驶: "🐎连接马车（驾驶）",
                    D_hint_连接马车_驾驶: "将马车连接到此角色，你来驾驶行驶",
                    A_连接马车_驾驶: "SourceCharacter将马车和TargetCharacter连接，由SourceCharacter驾驶行驶",

                    D_没有马车: "你必须要在马车上才能使用这个功能",
                    D_无法驾驶_交互: "你必须要能够使用手交互才能驾驶马车",

                    D_锁权限: "需要锁权限才能连接马车",

                    D_连接到马车: "已连接到马车：CARRIAGE_PLAYER",
                },
                EN: {
                    D_连接马车_牵引: "🐎Connect (Leash)",
                    D_hint_连接马车_牵引: "Connect the carriage to this character, being led by the other",
                    A_连接马车_牵引:
                        "SourceCharacter connects the carriage with TargetCharacter, being led by TargetCharacter",

                    D_连接马车_驾驶: "🐎Connect (Drive)",
                    D_hint_连接马车_驾驶: "Connect the carriage to this character, being the driver",
                    A_连接马车_驾驶: "SourceCharacter connects the carriage with TargetCharacter, driving the carriage",

                    D_没有马车: "You must be wearing the carriage to use this feature",
                    D_无法驾驶_交互: "You must be able to use hand interaction to drive the carriage",

                    D_锁权限: "Lock permission is required to connect the carriage",

                    D_连接到马车: "Connected to the carriage: CARRIAGE_PLAYER",
                },
            },
        },
    ],
    [
        "ItemDevices",
        {
            Name: carriageItemName,
            Random: false,
            Top: -160,
            Left: -222,
            Time: 20,
            AllowLock: false,
            Extended: false,
            FixedPosition: true,
            IsRestraint: false,
            Effect: [E.Freeze],
            Layer: [
                { Name: "A1", Priority: 1 },
                { Name: "A2", Priority: 1 },
                { Name: "A3", Priority: 1 },
                { Name: "B1", Priority: 1 },
                { Name: "B2", Priority: 1 },
                { Name: "B2x", Priority: 1 },
                { Name: "B3", Priority: 1 },
                { Name: "B4", Priority: 1 },
                { Name: "C1", Priority: 61 },
                { Name: "C2", Priority: 61 },
            ],
            SetPose: ["Kneel"],
            AllowActivePose: ["Kneel", "KneelingSpread"],
            OverrideHeight: {
                Height: 109,
                Priority: 70,
            },
        },
        {
            translation: { CN: "马车", EN: "Carriage" },
        },
    ],
];

const insidePing = HookManager.insideFlag("ChatRoomDoPingLeashedPlayers");
const insideBeep = HookManager.insideFlag("ServerAccountBeep");
const insideLeave = HookManager.insideFlag("ChatRoomCanLeave");

HookManager.hookFunction("ChatRoomCanBeLeashedBy", 0, (args, next) => {
    const [sourceMemberNumber, C] = args;
    if (insidePing.inside || insideBeep.inside || insideLeave.inside) {
        if (sourceMemberNumber === Player.MemberNumber || C.IsPlayer()) {
            const state = ChatRoomOrderTools.assetState(Player);
            if (state && [harnessItemName, carriageItemName].includes(state.associatedAsset.asset)) {
                const other = ChatRoomOrderTools.pick.other(Player);
                if (other) {
                    if (state.leash === "lead" && C.MemberNumber === other) return true;
                    // 检查ChatRoomCanLeave时，使用的member number是0
                    else if (state.leash === "follow" && (sourceMemberNumber === other || sourceMemberNumber === 0))
                        return true;
                }
            }
        }
    }

    return next(args);
});

/** @returns {boolean} */
function playerIsCarriageRiding() {
    const item = Player.Appearance.find((a) => a.Asset.Name === carriageItemName);
    if (item) {
        const pair = ChatRoomOrder.requireSharedCenter(Player);
        if (pair) {
            const state = ChatRoomOrder.requirePairAssetState(pair, [
                { prev: carriageItemName, next: harnessItemName },
            ]);

            if (state && /** @type {XCharacterDrawOrderBase}*/ (pair.prev.XCharacterDrawOrder).leash === "lead") {
                return true;
            }
        }
    }
    return false;
}

HookManager.afterPlayerLogin(() => {
    HookManager.hookFunction("Player.CanWalk", 0, (args, next) => {
        if (!Player.HasEffect("Tethered") && !Player.HasEffect("Mounted")) {
            if (playerIsCarriageRiding()) return true;
        }
        return next(args);
    });
    HookManager.hookFunction("Player.GetSlowLevel", 0, (args, next) => {
        if (!Player.HasEffect("Tethered") && !Player.HasEffect("Mounted")) {
            if (playerIsCarriageRiding()) return 0;
        }
        return next(args);
    });
});

export default function () {
    AssetManager.addAssetWithConfig(asset);

    SharedCenterModifier.addModifier(
        DrawMods.asset([{ prev: "马车", next: "马车固定" }], ["center", { X: 26, Y: 0 }], ["center", { X: -148, Y: 0 }])
    );
}
