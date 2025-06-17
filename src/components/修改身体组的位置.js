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

    if (GameVersion !== "R116") {
        HookManager.hookFunction("AssetBaseURL", 0, (args, next) => {
            const ret = next(args);

            const bodyStyleItem = InventoryGet(args[0], "BodyStyle");
            if (bodyStyleItem?.Asset?.Name === "EchoV1") return `@nomap/${ret}`;

            return ret;
        });
    }
}
