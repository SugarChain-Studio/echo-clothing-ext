import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../../assetForward";
import { Typing } from "../../lib";

// 兼容 Echo V1 的自定义组名
const v1CompatibleGroups = new Set(
    Typing.groups([
        "左眼_Luzi",
        "右眼_Luzi",
        "新前发_Luzi",
        "新后发_Luzi",
        "FaceMarkings",
        "HairFront",
        "HairBack",
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
    "玩偶",
    "汉堡",
    "开腿展示架",
    "举手杆",
    "铁架台",
    "白布",
    "蕾丝文胸睡裙",
    "假领子",
    "女仆装",
    "女仆装2",
    "女仆装3",
    "女仆装4",
    "女仆围裙",
    "斜肩上衣",
    "花边连衣裙",
    "连衣裙",
    "插兜雨衣",
    "蝴蝶结装饰",
    "围脖",
    "立领披肩",
    "女巫小披肩",
]);

/** @type {TypedItemConfig} */
const extended = {
    Archetype: ExtendedArchetype.TYPED,
    DrawImages: false,
    Options: [{ Name: "N" }, { Name: "F" }],
};

const assetStrings = {
    CN: {
        Select: "🍔 强制为EchoV1显示 mod 图片?",
        N: "否，保持兼容",
        F: "是，强制显示",
    },
    EN: {
        Select: "🍔 Force display mod images for EchoV1?",
        N: "No, keep compatibility",
        F: "Yes, force display",
    },
};

export default function () {
    AssetManager.supplyExtended("BodyStyle", "EchoV1", extended, assetStrings);

    HookManager.hookFunction("AssetBaseURL", 0, (args, next) => {
        // args is [Character, AssetGroup, AssetGroupName, AssetPoseName | PoseType, AssetLayer, string, Asset]
        const ret = next(args);

        const bodyStyleItem = InventoryGet(args[0], "BodyStyle");
        if (bodyStyleItem?.Asset?.Name === "EchoV1" && bodyStyleItem?.Property?.TypeRecord?.typed !== 1) {
            if (v1CompatibleGroups.has(args[1].Name)) return ret;
            if (v1CompatibleAssets.has(args[6].Name)) return ret;
            return `@nomap/${ret}`;
        }

        return ret;
    });
}
