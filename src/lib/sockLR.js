import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../assetForward";

const blackFill = (() => {
    const canvas = document.createElement("canvas");
    canvas.width = 250;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
})();

const topLeft = {
    SocksLeft: { Top: 0, Left: { "": 0, "KneelingSpread": 30 } },
    SocksRight: { Top: 0, Left: { "": 250, "KneelingSpread": 220 } },
};

/**
 * 生成左右袜子
 * @param {CustomAssetDefinition} asset
 * @param {AssetGroupName} [group] 图片资源所在的身体组，默认是"Socks"
 * @returns {[["SocksLeft", CustomAssetDefinition], ["SocksRight", CustomAssetDefinition]]}
 */
function createSockLR(asset, group = "Socks") {
    if (!Array.isArray(asset.Layer)) asset.Layer = [{}];

    const maskName = `Mask${asset.Name}`;

    const imageMap = /** @type {AssetGroupName[]}*/ (
        asset.DynamicGroupName ? [asset.DynamicGroupName] : ["SocksLeft", "SocksRight"]
    ).reduce((pv, cv) => {
        pv[ImageMapTools.assetLayer(cv, `${asset.Name}_${maskName}`)] = blackFill;
        return pv;
    }, {});

    AssetManager.addImageMapping(imageMap);

    return /** @type {[["SocksLeft", CustomAssetDefinition], ["SocksRight", CustomAssetDefinition]]} */ (
        /** @type {["SocksLeft", "SocksRight"]}*/ (["SocksLeft", "SocksRight"]).map((grp) => {
            const ret = { ...asset, Layer: [...asset.Layer], DynamicGroupName: group };
            ret.Layer.push({
                Name: maskName,
                ...topLeft[grp],
                ParentGroup: {},
                PoseMapping: {},
                TextureMask: {},
                BlendingMode: "destination-out",
            });
            return [grp, ret];
        })
    );
}

export const SockLRTool = { createSockLR };
