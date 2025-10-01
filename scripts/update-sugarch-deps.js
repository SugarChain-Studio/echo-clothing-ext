#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * 更新package.json中所有@sugarch/*依赖到最新版本的脚本
 */
class SugarchDepsUpdater {
    constructor(options = {}) {
        this.packageJsonPath = path.join(process.cwd(), "package.json");
        this.packageJson = null;
        this.sugarchDeps = {
            dependencies: [],
            devDependencies: [],
        };
        this.dryRun = options.dryRun || false;
    }

    /**
     * 读取package.json文件
     */
    readPackageJson() {
        try {
            const content = fs.readFileSync(this.packageJsonPath, "utf8");
            this.packageJson = JSON.parse(content);
            console.log("✅ 成功读取 package.json");
        } catch (error) {
            console.error("❌ 读取 package.json 失败:", error.message);
            process.exit(1);
        }
    }

    /**
     * 查找所有@sugarch/*依赖
     */
    findSugarchDeps() {
        // 重置依赖列表
        this.sugarchDeps = {
            dependencies: [],
            devDependencies: [],
        };

        // 检查普通依赖
        if (this.packageJson.dependencies) {
            for (const [name, version] of Object.entries(this.packageJson.dependencies)) {
                if (name.startsWith("@sugarch/")) {
                    this.sugarchDeps.dependencies.push({ name, version });
                }
            }
        }

        // 检查开发依赖
        if (this.packageJson.devDependencies) {
            for (const [name, version] of Object.entries(this.packageJson.devDependencies)) {
                if (name.startsWith("@sugarch/")) {
                    this.sugarchDeps.devDependencies.push({ name, version });
                }
            }
        }

        const totalCount = this.sugarchDeps.dependencies.length + this.sugarchDeps.devDependencies.length;
        console.log(`🔍 找到 ${totalCount} 个 @sugarch/* 依赖:`);

        if (this.sugarchDeps.dependencies.length > 0) {
            console.log("  普通依赖:");
            this.sugarchDeps.dependencies.forEach((dep) => {
                console.log(`    - ${dep.name}@${dep.version}`);
            });
        }

        if (this.sugarchDeps.devDependencies.length > 0) {
            console.log("  开发依赖:");
            this.sugarchDeps.devDependencies.forEach((dep) => {
                console.log(`    - ${dep.name}@${dep.version}`);
            });
        }

        if (totalCount === 0) {
            console.log("ℹ️ 没有找到 @sugarch/* 依赖，退出更新。");
            process.exit(0);
        }
    }

    /**
     * 获取包的最新版本
     */
    async getLatestVersion(packageName) {
        try {
            const result = execSync(`pnpm view ${packageName} version`, {
                encoding: "utf8",
                stdio: ["pipe", "pipe", "pipe"],
            });
            return result.trim();
        } catch (error) {
            console.warn(`⚠️ 无法获取 ${packageName} 的最新版本:`, error.message);
            return null;
        }
    }

    /**
     * 使用pnpm更新依赖
     */
    async updateDependencies() {
        const allDeps = [...this.sugarchDeps.dependencies, ...this.sugarchDeps.devDependencies];

        // 检查最新版本
        console.log("\n🔄 检查最新版本...");
        const updateInfo = [];

        for (const dep of allDeps) {
            const latestVersion = await this.getLatestVersion(dep.name);
            if (latestVersion && latestVersion !== dep.version.replace(/^[\^~]/, "")) {
                updateInfo.push({
                    name: dep.name,
                    currentVersion: dep.version,
                    latestVersion: latestVersion,
                    isDev: this.sugarchDeps.devDependencies.some((d) => d.name === dep.name),
                });
            }
        }

        if (updateInfo.length === 0) {
            console.log("✅ 所有 @sugarch/* 依赖都已是最新版本！");
            return;
        }

        console.log("\n📦 需要更新的依赖:");
        updateInfo.forEach((info) => {
            const depType = info.isDev ? "[dev]" : "[prod]";
            console.log(`  ${depType} ${info.name}: ${info.currentVersion} → ${info.latestVersion}`);
        });

        if (this.dryRun) {
            console.log("\n🔍 Dry-run 模式，不执行实际更新。");
            return;
        }

        // 分别更新普通依赖和开发依赖
        const regularDeps = updateInfo.filter((info) => !info.isDev);
        const devDeps = updateInfo.filter((info) => info.isDev);

        try {
            if (regularDeps.length > 0) {
                console.log("\n🔄 更新普通依赖...");
                const depNames = regularDeps.map((dep) => `${dep.name}@latest`).join(" ");
                execSync(`pnpm add ${depNames}`, { stdio: "inherit" });
                console.log("✅ 普通依赖更新完成");
            }

            if (devDeps.length > 0) {
                console.log("\n🔄 更新开发依赖...");
                const devDepNames = devDeps.map((dep) => `${dep.name}@latest`).join(" ");
                execSync(`pnpm add -D ${devDepNames}`, { stdio: "inherit" });
                console.log("✅ 开发依赖更新完成");
            }

            console.log("\n🎉 所有 @sugarch/* 依赖更新完成！");

            // 显示更新后的版本信息
            console.log("\n📋 更新后的版本信息:");
            this.readPackageJson(); // 重新读取更新后的package.json
            this.findSugarchDeps(); // 重新查找依赖
        } catch (error) {
            console.error("❌ 更新依赖时发生错误:", error.message);
            process.exit(1);
        }
    }

    /**
     * 运行更新流程
     */
    async run() {
        const modeText = this.dryRun ? " (Dry-run 模式)" : "";
        console.log(`🚀 开始更新 @sugarch/* 依赖${modeText}...\n`);

        this.readPackageJson();
        this.findSugarchDeps();
        await this.updateDependencies();

        console.log("\n✨ 更新流程完成！");
    }
}

// 运行脚本
if (require.main === module) {
    const args = process.argv.slice(2);
    const dryRun = args.includes("--dry-run") || args.includes("-n");

    if (args.includes("--help") || args.includes("-h")) {
        console.log(`
用法: node update-sugarch-deps.js [选项]

选项:
  --dry-run, -n    只检查更新而不执行实际更新
  --help, -h       显示帮助信息

描述:
  更新 package.json 中所有 @sugarch/* 依赖到最新版本。
  脚本会自动区分普通依赖和开发依赖，使用 pnpm 进行更新。
        `);
        process.exit(0);
    }

    const updater = new SugarchDepsUpdater({ dryRun });
    updater.run().catch((error) => {
        console.error("❌ 脚本执行失败:", error.message);
        process.exit(1);
    });
}

module.exports = SugarchDepsUpdater;
