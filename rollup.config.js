const path = require("path");
const { createModRollupConfig, parseEnv } = require("./utils/rollupUtils.cjs");

const packageJSON = require(path.join(process.cwd(), "package.json"));

module.exports = async (cliArgs) => {
    const env = parseEnv(__dirname, cliArgs);
    return [await createModRollupConfig({ env, packageJSON })];
};
