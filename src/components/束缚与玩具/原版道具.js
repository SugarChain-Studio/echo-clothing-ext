import { AssetManager } from "../../assetForward";

export default function () {
    AssetManager.modifyAsset("ItemMouth", "TonguePiercingGag", (group, asset) => {
        asset.Block = [];
        asset.Prerequisite = [];
    });

    // 上衣的PoseMapping默认会有各种姿势的映射，但没有手臂部分的都不需要
    // 因此可以简化为如下的形式
    // "BaseUpper": "BaseUpper" 无论是key还是value都不需要写
    /** @type {AssetPoseMapping} */
    const ArmlessDressPoseMapping = {
        AllFours: "AllFours",
        Hogtied: "Hogtied",
    };

    // AssetParsePoseMapping 是 BC 用来构建 PoseMapping 的工具函数
    AssetManager.modifyAsset("ClothAccessory", "ZipperBelt", (group, asset) => {
        /** @type {Mutable<AssetLayer>[]}*/ (asset.Layer).forEach((layer) => {
            layer.PoseMapping = AssetParsePoseMapping(
                { AllFours: PoseType.HIDE, Hogtied: PoseType.HIDE },
                ArmlessDressPoseMapping
            );
        });
    });
}
