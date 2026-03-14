import { HookManager } from "@sugarch/bc-mod-hook-manager";
import { AssetManager } from "../assetForward";

const dataKey = "EchoItemPermissionCache";

/** @type {import("@sugarch/bc-asset-manager").ILogger|null} */
let _Logger = null;

/**
 * @template {Object} T
 */
class Storage {
    /**
     * @param {string} key
     * @param {()=>T} defaultValue
     * @param {boolean} [lzCompress] - 是否启用 LZ 压缩，默认为 true
     */
    constructor(key, defaultValue, lzCompress = true) {
        /** @type {T|undefined} */
        this._data = undefined;
        /** @private */
        this._defaultValue = defaultValue;
        /** @private */
        this._key = key;
        /** @private */
        this._lzCompress = lzCompress;
    }

    /** @returns {T} */
    get data() {
        if (this._data === undefined) {
            this.read();
        }
        return this._data;
    }

    read() {
        const value = Player.ExtensionSettings?.[this._key];
        if (value) {
            const data = this._lzCompress ? LZString.decompressFromBase64(value) : value;
            try {
                /** @type {T} */
                this._data = /** @type {T} */ (JSON.parse(data));
            } catch (e) {
                _Logger?.error(`Failed to parse data for key ${this._key}: ${e.message}`);
                this._data = this._defaultValue();
            }
        } else {
            this._data = this._defaultValue();
        }
    }

    update() {
        const stringified = JSON.stringify(this._data);
        const value = this._lzCompress ? LZString.compressToBase64(stringified) : stringified;
        if (!Player.ExtensionSettings) Player.ExtensionSettings = {};
        Player.ExtensionSettings[this._key] = value;
        ServerPlayerExtensionSettingsSync(this._key);
    }
}

/**
 * @typedef {Record<string, ItemPermissions>} ItemPermissionCacheData
 */

/** @type {Storage<ItemPermissionCacheData>} */
const storage = new Storage(dataKey, () => ({}));

/**
 * @param {Record<string, ItemPermissionMode>} typePerm1
 * @param {Record<string, ItemPermissionMode>} typePerm2
 * @returns {boolean}
 */
function compareTypePermissions(typePerm1, typePerm2) {
    const keys1 = Object.keys(typePerm1).filter((k) => k !== "Default");
    const keys2 = Object.keys(typePerm2).filter((k) => k !== "Default");
    if (keys1.length !== keys2.length) return false;
    for (const key of keys1) {
        if (typePerm1[key] === undefined || typePerm2[key] === undefined) return false;
    }
    return true;
}

/**
 * @param {ItemPermissions} perm1
 * @param {ItemPermissions} perm2
 * @returns {boolean}
 */
function comparePermissions(perm1, perm2) {
    return (
        perm1.Hidden === perm2.Hidden &&
        perm1.Permission === perm2.Permission &&
        compareTypePermissions(perm1.TypePermissions, perm2.TypePermissions)
    );
}

function setupImpl() {
    const defaultPerm = PreferencePermissionGetDefault();

    HookManager.hookFunction("InventorySetPermission", 0, (args, next) => {
        const ret = next(args);

        const [groupName, assetName] = args;
        const asset = AssetGet("Female3DCG", groupName, assetName);
        if (asset && AssetManager.assetIsCustomed(asset)) {
            const permissionKey = `${groupName}/${assetName}`;
            storage.data[permissionKey] = Player.PermissionItems[permissionKey];
            if (comparePermissions(storage.data[permissionKey], defaultPerm)) {
                delete storage.data[permissionKey];
            }
            storage.update();
        }

        return ret;
    });

    AssetManager.afterLoad(() => {
        HookManager.afterPlayerLogin(() => {
            storage.read();
            let shouldUpdateStorage = false;
            let shouldUpdatePlayer = false;

            const restored = [];

            for (const [permissionKey, permission] of Object.entries(storage.data)) {
                const [groupName, assetName] = /** @type {[AssetGroupName, string]} */ (permissionKey.split("/"));
                const asset = AssetGet("Female3DCG", groupName, assetName);
                if (asset && AssetManager.assetIsCustomed(asset)) {
                    if (Player.PermissionItems[permissionKey] === undefined) {
                        Player.PermissionItems[permissionKey] = permission;
                        restored.push(permissionKey);
                        shouldUpdatePlayer = true;
                    }
                } else {
                    delete storage.data[permissionKey];
                    shouldUpdateStorage = true;
                }
            }

            if (shouldUpdateStorage) {
                storage.update();
            }

            if (shouldUpdatePlayer) {
                _Logger?.info(`Restored permissions for items: ${restored.join(", ")}`);
                ServerPlayerBlockItemsSync();
            }
        });
    });
}

export class ItemPermissionCache {
    /**
     * @param {import("@sugarch/bc-asset-manager").ILogger} logger
     */
    static setup(logger) {
        _Logger = logger;
        setupImpl();
    }
}
