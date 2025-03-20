/* eslint-disable no-unused-vars */

import { AssetManager } from "../../assetForward";
import { DrawCharacterModifier, ChatRoomOrder } from "@mod-utils/ChatRoomOrder";

/** @type {CustomGroupedAssetDefinitions} */
const asset = {
    ItemDevices: [
        {
            Name: "马车前_Luzi",
            Random: false,
            Top: 0,
            Left: -50,
            AllowLock: false,
            Extended: false,
            FixedPosition: true,
            Layer: [],
        },
        {
            Name: "马车_Luzi",
            Random: false,
            Top: 0,
            Left: -70,
            AllowLock: false,
            Extended: false,
            FixedPosition: true,
            Layer: [
                // 左右反了
                { Name: "左辕", Priority: 1 },
                { Name: "左轮", Priority: 1 },
                { Name: "轴", Priority: 2 },
                { Name: "车身", Priority: 60 },
                { Name: "右轮", Priority: 61 },
                { Name: "右辕", Priority: 61 },
            ],
            SetPose: ["Kneel"],
            AllowActivePose: ["Kneel", "KneelingSpread"],
            OverrideHeight: {
                Height: 20,
                Priority: 21,
                HeightRatioProportion: 1,
            },
        },
    ],
};
const translations = {
    CN: {
        ItemDevices: {
            马车前_Luzi: "马车前",
            马车_Luzi: "马车",
        },
    },
    EN: {
        ItemDevices: {
            马车前_Luzi: "马车前",
            马车_Luzi: "马车",
        },
    },
};

export default function () {
    // TODO: 马车

    // AssetManager.addGroupedAssets(asset, translations);

    DrawCharacterModifier.addModifier((C, arg) => {
        const { Zoom } = arg;
        const sharedC = ChatRoomOrder.requireSharedCenter(C);
        if (!sharedC) return arg;
        if (
            sharedC.prev.XCharacterDrawOrder.associatedAsset?.asset !== "马车_Luzi" ||
            sharedC.next.XCharacterDrawOrder.associatedAsset?.asset !== "马车前_Luzi"
        )
            return arg;

        if (sharedC.next.MemberNumber === C.MemberNumber) {
            return { X: sharedC.center.X - 130 / Zoom, Y: sharedC.center.Y, Zoom };
        }

        if (sharedC.prev.MemberNumber === C.MemberNumber) {
            return { X: sharedC.center.X + 80 / Zoom, Y: sharedC.center.Y, Zoom };
        }
    });
}
