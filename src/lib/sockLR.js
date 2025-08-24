/** @type {Record<"SocksLeft" | "SocksRight", Alpha.Definition>} */
const mask = {
    SocksLeft: { Group: ["SocksLeft"], Masks: [[0, 0, 250, 1000]] },
    SocksRight: { Group: ["SocksRight"], Masks: [[250, 0, 250, 1000]] },
};

/**
 * 生成左右袜子
 * @param {CustomAssetDefinition} asset
 * @param {AssetGroupName} [group] 图片资源所在的身体组，默认是"Socks"
 * @returns {[["SocksLeft", CustomAssetDefinition], ["SocksRight", CustomAssetDefinition]]}
 */
function createSockLR(asset, group = "Socks") {
    if (!Array.isArray(asset.Layer)) asset.Layer = [{}];
    return /** @type {[["SocksLeft", CustomAssetDefinition], ["SocksRight", CustomAssetDefinition]]} */ (
        /** @type {["SocksLeft", "SocksRight"]}*/ (["SocksLeft", "SocksRight"]).map((grp) => {
            const ret = { ...asset, DynamicGroupName: group };
            ret.Layer.push({ Name: grp, Top: 0, Left: { "": 0, "KneelingSpread": 30 }, Alpha: [mask[grp]] });
            return [grp, ret];
        })
    );
}

export const SockLRTool = { createSockLR };
