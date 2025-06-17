import { HookManager } from "@sugarch/bc-mod-hook-manager";

export default function () {
    // 在加载完成之后，图层位置都直接写在图层属性里面了，所以这里直接调整图层位置

    HookManager.hookFunction("CommonDrawComputeDrawingCoordinates", 0, (args, next) => {
        const ret = next(args);
        const [C, asset] = args;

        const bodyStyleItem = InventoryGet(C, /** @type {AssetGroupBodyName}*/ ("BodyStyle"));
        if (bodyStyleItem?.Asset?.Name !== "Original") return ret;

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
            if (C.PoseMapping.BodyUpper === "BaseLower") {
                ret.Y -= 10;
            }
        }

        return ret;
    });
}
