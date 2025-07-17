import { HookManager } from "@sugarch/bc-mod-hook-manager";

export default function () {
    // 在加载完成之后，图层位置都直接写在图层属性里面了，所以这里直接调整图层位置

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

    // 兼容 Echo V1 的自定义组名
    const v1CompatibleGroups = new Set(
        /** @type {CustomGroupName[]} */ ([
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
        ])
    );

    // 能够兼容 Echo V1 的资产
    const v1CompatibleAssets = new Set(["玩偶_Luzi", "汉堡_Luzi", "开腿展示架_Luzi"]);

    if (GameVersion !== "R116") {
        HookManager.hookFunction("AssetBaseURL", 0, (args, next) => {
            const ret = next(args);

            // NOTE: args[4].Group might be undefined in some cases
            if (!args[4] || !args[4].Group) {
                console.warn("AssetBaseURL called with invalid Asset arg:", args[4]);
                return ret;
            }

            if (v1CompatibleGroups.has(args[4].Group.Name)) return ret;
            if (v1CompatibleAssets.has(args[4].Name)) return ret;

            const bodyStyleItem = InventoryGet(args[0], "BodyStyle");
            if (bodyStyleItem?.Asset?.Name === "EchoV1") return `@nomap/${ret}`;

            return ret;
        });
    }
}
