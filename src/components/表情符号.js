import { AssetManager } from "@local/AssetManager";

const Emoticon内容 = ["画稿子_Luzi", "电影_Luzi", "VSCode_Luzi", "PS_Luzi"];

// R133 moved emoticon icons from "Assets/Female3DCG/Emoticon/<Name>/Icon.png" to
// "Icons/Expressions/Emoticon/<Name>.png". Point the new path at the icons in resources;
// on older game versions the new path is never requested, so this changes nothing there.
const iconMapping = Object.fromEntries(
    Emoticon内容.map((name) => [
        `Icons/Expressions/Emoticon/${name}.png`,
        `Assets/Female3DCG/Emoticon/${name}/Icon.png`,
    ])
);

export default function () {
    AssetManager.modifyAsset("Emoticon", "Emoticon", (group) => {
        group.AllowExpression = /** @type { ExpressionName[] }*/ ([...group.AllowExpression, ...Emoticon内容]);
    });
    AssetManager.addImageMapping(iconMapping);
}
