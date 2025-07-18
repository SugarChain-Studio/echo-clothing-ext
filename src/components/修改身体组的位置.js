import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../assetForward";
import { Typing } from "../utils";

/** @type {AssetDefinitionBase["DrawOffset"]} */
const customOffset = [
    ...["FlatChastityCage", "PlasticChastityCage", "FuturisticTrainingBelt"].map((Asset) =>
        Typing.drawOffset({ Group: "ItemVulva", Asset, Y: -20 })
    ),
    ...Typing.groups(["Pussy", "ItemVulva", "ItemVulvaPiercings", "ItemButt"]).map((Group) =>
        Typing.drawOffset({ Group, Y: -16 })
    ),
    ...["CockSock", "Jockstrap"].map((Asset) => Typing.drawOffset({ Asset, Y: -20 })),
    { Asset: "Splatters", Layer: ["Internal2", "Internal3"], Y: -20 },
];

// 兼容 Echo V1 的自定义组名
const v1CompatibleGroups = new Set(
    Typing.groups([
        "左眼_Luzi",
        "右眼_Luzi",
        "新前发_Luzi",
        "新后发_Luzi",
        "HairAccessory1",
        "HairAccessory2",
        "HairAccessory3",
        "HairAccessory1",
        "HairAccessory3_笨笨蛋Luzi",
        "Luzi_HairAccessory3_1",
        "Luzi_HairAccessory3_2",
        "Mask",
        "Mask_笨笨蛋Luzi",
        "Wings",
        "Wings_笨笨蛋Luzi",
        "Hat",
        "Hat_笨笨蛋Luzi",
        "Glasses",
        "ItemHandheld",
        "ItemMouth",
        "ItemMouth2",
        "ItemMouth3",
        "ItemNipplesPiercings",
        "ClothOuter",
    ])
);

// 能够兼容 Echo V1 的资产
const v1CompatibleAssets = new Set([
    "玩偶_Luzi",
    "汉堡_Luzi",
    "开腿展示架_Luzi",
    "举手杆",
    "铁架台",
    "白布_Luzi",
    "蕾丝文胸睡裙",
    "假领子_Luzi",
    "女仆装_Luzi",
    "女仆装2_Luzi",
    "女仆装3_Luzi",
    "女仆装4_Luzi",
    "女仆围裙_Luzi",
    "斜肩上衣_Luzi",
    "花边连衣裙",
    "连衣裙_Luzi",
    "插兜雨衣",
    "蝴蝶结装饰",
    "围脖_Luzi",
    "立领披肩_Luzi",
    "女巫小披肩_Luzi",
]);

function R117() {
    HookManager.hookFunction("CommonDrawComputeDrawingCoordinates", 0, (args, next) => {
        const ret = next(args);
        const [C, asset, layer] = args;

        const bodyStyleItem = InventoryGet(C, "BodyStyle");
        if (bodyStyleItem?.Asset?.Name === "EchoV1") return ret;

        if (["Pussy", "ItemVulva", "ItemVulvaPiercings", "ItemButt"].includes(asset.Group.Name)) {
            if (["FlatChastityCage", "PlasticChastityCage", "FuturisticTrainingBelt"].includes(asset.Name)) {
                ret.Y -= 20;
            } else {
                ret.Y -= 16;
            }
        } else if (asset.Group.Name === "Panties") {
            if (["CockSock", "Jockstrap"].includes(asset.Name)) {
                ret.Y -= 20;
            }
        } else if (asset.Group.Name === "ItemPelvis") {
            if (asset.Name === "HarnessPanties1") {
                ret.Y -= 20;
            }
        } else if (asset.Name === "StrictPonyBoots") {
            if (C.PoseMapping.BodyLower === "BaseLower") {
                ret.Y -= 10;
            }
        } else if (asset.Name === "Splatters") {
            if (["Internal2", "Internal3"].includes(layer.Name)) {
                ret.Y -= 20;
            }
        }

        return ret;
    });

    HookManager.hookFunction("AssetBaseURL", 0, (args, next) => {
        const ret = next(args);

        if (v1CompatibleGroups.has(args[1].Name)) return ret;
        if (v1CompatibleAssets.has(args[4].Name)) return ret;

        const bodyStyleItem = InventoryGet(args[0], "BodyStyle");
        if (bodyStyleItem?.Asset?.Name === "EchoV1") return `@nomap/${ret}`;

        return ret;
    });
}

export default function () {
    if (GameVersion === "R117") {
        R117();
        return;
    }

    HookManager.patchFunction("CommonDrawComputeDrawingCoordinates", {
        "offset.Group === groupName &&": "(offset.Group === undefined || offset.Group === groupName) &&",
    });

    HookManager.hookFunction("CommonDrawComputeDrawingCoordinates", 0, (args, next) => {
        const ret = next(args);
        const [C, asset] = args;

        const bodyStyleItem = InventoryGet(C, "BodyStyle");
        if (bodyStyleItem?.Asset?.Name === "EchoV1") return ret;

        if (asset.Name === "StrictPonyBoots") {
            if (C.PoseMapping.BodyLower === "BaseLower") {
                ret.Y -= 10;
            }
        }
        return ret;
    });

    for (const body of ["Original", "EchoV2"]) {
        AssetManager.modifyAsset("BodyStyle", body, (group, asset) => {
            asset.DrawOffset = customOffset;
        });
    }

    HookManager.hookFunction("AssetBaseURL", 0, (args, next) => {
        // args is [Character, AssetGroup, AssetGroupName, AssetPoseName | PoseType, AssetLayer, string, Asset]
        const ret = next(args);

        const bodyStyleItem = InventoryGet(args[0], "BodyStyle");
        if (bodyStyleItem?.Asset?.Name === "EchoV1") {
            if (v1CompatibleGroups.has(args[1].Name)) return ret;
            if (v1CompatibleAssets.has(args[6].Name)) return ret;
            return `@nomap/${ret}`;
        }

        return ret;
    });
}
