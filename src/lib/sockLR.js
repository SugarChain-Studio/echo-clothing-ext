import { ImageMapTools } from "@mod-utils/Tools";
import { AssetManager } from "../assetForward";
import { cachePreloadGL } from "./cachePreload";

const blackFill = (() => {
    const canvas = document.createElement("canvas");
    canvas.width = 250;
    canvas.height = 1000;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return canvas.toDataURL();
})();

cachePreloadGL(blackFill);

const topLeft = /** @type {const} */ ({
    SocksLeft: { Top: 0, Left: { "": 0, "KneelingSpread": 30 } },
    SocksRight: { Top: 0, Left: { "": 250, "KneelingSpread": 220 } },
    Left: { Top: 0, Left: 250 },
    Right: { Top: 0, Left: 0 },
});

const flip = /** @type {const} */ ({ Left: "Right", Right: "Left" });

export class LRTool {
    /**
     * 生成左右袜子
     * @param {CustomAssetDefinition} asset
     * @param {AssetGroupName} [group] 图片资源所在的身体组，默认是"Socks"
     * @returns {[["SocksLeft", CustomAssetDefinition], ["SocksRight", CustomAssetDefinition]]}
     */
    static createSockLR(asset, group = "Socks") {
        if (!Array.isArray(asset.Layer)) asset.Layer = [{}];

        const maskName = `Mask${asset.Name}`;

        const imageMap = /** @type {AssetGroupName[]}*/ (
            asset.DynamicGroupName ? [asset.DynamicGroupName] : [group]
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

    /**
     * 创建左右配置
     * @param {CustomGroupName} group 图片资源所在的身体组
     * @param {CustomAssetDefinition} asset
     * @param { {key:string, Left:number, Right:number} } type
     */
    static createLRConfig(group, asset, type) {
        const imgMap = /** @type {Record<string, string>} */ ({});

        for (const side of /** @type {const} */ (["Left", "Right"])) {
            const layerName = `Mask${side}`;
            imgMap[ImageMapTools.assetLayer(group, `${asset.Name}_${layerName}`)] = blackFill;
            asset.Layer.push({
                Name: layerName,
                ...topLeft[side],
                ParentGroup: {},
                PoseMapping: {},
                TextureMask: {},
                AllowTypes: { [type.key]: type[flip[side]] },
                BlendingMode: "destination-out",
            });
        }

        AssetManager.addImageMapping(imgMap);
    }
}
