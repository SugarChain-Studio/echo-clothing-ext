import { AssetManager } from "../../assetForward";
import { registerDrawHook } from "../../lib/afterDraw";
import { customFixup } from "../../lib/fixups";

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
    if (C.IsPlayer()) runAutoCloseLegs();
}

export function runAutoCloseLegs() {
    if (!Player.PoseMapping.BodyLower || Player.PoseMapping.BodyLower === "LegsClosed") {
        return;
    }

    if (!Player.IsKneeling() && Player.CanChangeToPose("LegsClosed")) {
        PoseSetActive(Player, "LegsClosed");
        if (ServerPlayerIsInChatRoom()) ServerSend("ChatRoomCharacterPoseUpdate", { Pose: Player.ActivePose });
    }
}

export default function () {
    customFixup({ Old: { Group: "动物身体_Luzi", Name: asset.Name }, New: { Group: "外观工具", Name: asset.Name } });

    const group = "外观工具";
    registerDrawHook(asset, group, { scriptDraw });
    AssetManager.addAssetWithConfig(group, asset, { translation, layerNames: {} });
}
