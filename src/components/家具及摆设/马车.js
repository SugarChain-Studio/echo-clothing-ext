/* eslint-disable no-unused-vars */

import { AssetManager } from "../../assetForward";

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
}
