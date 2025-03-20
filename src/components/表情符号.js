import { AssetManager } from "../assetForward";

const Emoticon内容 = ["画稿子_Luzi", "电影_Luzi", "VSCode_Luzi", "PS_Luzi"];

export default function () {
    AssetManager.modifyAsset("Emoticon", "Emoticon", (group) => {
        group.AllowExpression = /** @type { ExpressionName[] }*/ ([...group.AllowExpression, ...Emoticon内容]);
    });
}
