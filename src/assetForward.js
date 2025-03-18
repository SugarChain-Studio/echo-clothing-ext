import { AssetManager as originalAssetManager } from "@sugarch/bc-asset-manager";

/** @type { import("@sugarch/bc-asset-manager")._AssetManager<CustomGroupBodyName> } */
const AssetManager = originalAssetManager.typeBodyGroupNames();

export { AssetManager };
