import { assetOverridesURL, resourceBaseURL, ModInfo } from "@mod-utils/rollupHelper";
import { AssetManager, resolveAssetOverrides } from "@sugarch/bc-asset-manager";

async function fetchWithRetry(url, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const urlWithVersion = new URL(url);
            urlWithVersion.searchParams.set("version", ModInfo.version);

            const response = await fetch(urlWithVersion.toString());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Attempt ${attempt} failed: ${error.message}`);
            if (attempt < retries) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
            }
        }
    }
}

export async function fetchAssetOverrides() {
    const assetOverrides = await fetchWithRetry(assetOverridesURL);
    resolveAssetOverrides(resourceBaseURL, assetOverrides).then((overrides) => {
        AssetManager.imageMapping.setBasicImgMapping(overrides);
    });
}
