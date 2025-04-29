import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../../../assetForward";

/** @type {CustomAssetDefinition} */
const asset = {
    Name: "自动闭腿",
    Visible: false,
    Random: false,
    Gender: "F",
    DynamicScriptDraw: true,
};

const translation = {
    CN: "自动闭腿",
    EN: "Auto Close Leg",
};

/** @type {ExtendedItemCallbacks.ScriptDraw} */
function scriptDraw({ C }) {
    if (C.IsPlayer()) {
        if (!Player.PoseMapping.BodyLower || Player.PoseMapping.BodyLower === "LegsClosed") {
            return;
        }

        if (!Player.IsKneeling() && Player.CanChangeToPose("LegsClosed")) {
            PoseSetActive(Player, "LegsClosed");
            if (ServerPlayerIsInChatRoom()) ServerSend("ChatRoomCharacterPoseUpdate", { Pose: Player.ActivePose });
        }
    }
}

export default function () {
    const group = "动物身体_Luzi";
    HookManager.globalFunction(`Assets${group}${asset.Name}ScriptDraw`, scriptDraw);
    AssetManager.addAssetWithConfig(group, asset, { translation, layerNames: {} });
}
