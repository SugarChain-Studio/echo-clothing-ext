import { debugFlag } from "@mod-utils/rollupHelper";
import { AssetManager } from "../../assetForward";
import { HookManager } from "@sugarch/bc-mod-hook-manager";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "隐藏身体",
    Hide: [
        "BodyLower",
        "BodyUpper",
        "HairFront",
        "HairBack",
        "Eyes",
        "Eyes2",
        "Mouth",
        "Nipples",
        "Pussy",
        "Head",
        "ArmsRight",
        "ArmsLeft",
        "HandsLeft",
        "HandsRight",
        "Blush",
        "EyeShadow",
        "Eyebrows",
    ],
};

export default function load() {
    if (debugFlag) {
        // 一个能隐藏身体的道具
        AssetManager.addAsset("BodyMarkings2_Luzi", asset);

        // 聊天室隐藏图标设置为闭眼的时候，截角色图时隐藏背景
        HookManager.patchFunction("DialogDraw", {
            "if (!CurrentCharacter) return;":
                "if(ChatRoomHideIconState >= 2) MainCanvas.clearRect(0, 0, 2000, 1000); if (!CurrentCharacter) return;",
        });
    }
}
