import { AssetManager } from "../../../assetForward";

const asset = {
    Name: "抓住推车",
    Random: false,
    Visible: false,
    NotVisibleOnScreen: ["LuziScreen"], // 使用这个数据来让物品在列表不显示
};

const translation = {
    CN: "抓住推车",
    EN: "Grabbed Trolley",
};

export default function () {
    const group = "ItemMisc";

    AssetManager.addAssetWithConfig(group, asset, { layerNames: {}, translation });

    AssetManager.addImageMapping({
        [`Assets/Female3DCG/${group}/Preview/抓住推车.png`]: "Assets/Female3DCG/ItemDevices/Preview/Trolley.png",
    });
}
