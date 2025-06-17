const path = require("path");
const { createModRollupConfig, parseEnv } = require("./utils/rollupUtils.cjs");
const fs = require("fs");

const packageJSON = require(path.join(process.cwd(), "package.json"));

const banner = (() => {
    const repo = (() => {
        let url = packageJSON.repository?.url;
        if (!url) return "";

        if (url.startsWith("git+")) {
            url = url.slice(4);
        }
        if (url.endsWith(".git")) {
            url = url.slice(0, -4);
        }
        return url;
    })();
    return `/*\n${fs.readFileSync("LICENSE")}\n\n${repo}\n@preserve\n*/`;
})();

module.exports = async (cliArgs) => {
    const env = parseEnv(__dirname, cliArgs);
    return [await createModRollupConfig({ env, packageJSON, banner })];
};
