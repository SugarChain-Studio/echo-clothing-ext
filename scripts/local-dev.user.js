// ==UserScript==
// @name         BC 本地开发脚本加载器
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  在本地开发时为 BondageClub 注入可切换的本地脚本（支持 script / module）。
// @author       Auto-generated
// @match        http://localhost:3000/BondageClub/
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_listValues
// @grant        GM_deleteValue
// ==/UserScript==

(function () {
    "use strict";

    /*
	使用说明（中文）
	- 在下面的 `loadList` 中配置要注入的脚本列表。每项包含:
		id: 唯一键（用于存储开关状态）
		name: 在菜单中显示的名称
		url: 脚本的完整 URL（例如 http://localhost:8081/bc-activity.js）
		mode: 'module' 或 'script'
		enabled: 默认是否启用（仅第一次安装/未存储时生效）
	- 页面在 document-end 时会读取每项的启用状态并注入对应的 <script> 标签。
	- 菜单（Tampermonkey 菜单）中会为每个脚本增加一个切换项。切换后会提示是否立即重载页面以应用变更。
	- 注入时会在 url 后附加 timestamp 参数以避免缓存（便于本地开发）。
	*/

    // 配置区域：在此添加/修改要注入的脚本
    const loadList = [
        {
            id: "bc-activity",
            name: "bc-activity",
            url: "http://localhost:8081/bc-activity.js",
            mode: "module",
            enabled: true,
        },
        { id: "bc-cloth", name: "bc-cloth", url: "http://localhost:8080/bc-cloth.js", mode: "script", enabled: false },
        {
            id: "fusam",
            name: "fusam",
            url: "https://sidiousious.gitlab.io/bc-addon-loader/fusam.js",
            mode: "module",
            enabled: true,
        },
    ];

    // Helper: 存储键名构造
    const keyFor = (id) => `localDevLoader.${id}.enabled`;

    // 初始化默认值（仅当值不存在时设置默认 enabled）
    for (const item of loadList) {
        const key = keyFor(item.id);
        const v = GM_getValue(key);
        if (typeof v === "undefined") {
            GM_setValue(key, !!item.enabled);
        }
    }

    // 注入脚本
    function inject(item) {
        try {
            const script = document.createElement("script");
            // 缓存破除
            const sep = item.url.includes("?") ? "&" : "?";
            script.src = `${item.url}${sep}timestamp=${Date.now()}`;
            if (item.mode === "module") {
                script.type = "module";
            } else {
                // 普通 script
                script.type = "text/javascript";
            }
            script.crossOrigin = "anonymous";
            // 可选：为调试加一个 data 属性
            script.setAttribute("data-local-dev-loader-id", item.id);
            // append 到 head，如果没有 head，则 append 到 documentElement
            const target = document.head || document.documentElement;
            target.appendChild(script);
            console.log(`[local-dev-loader] 注入 ${item.name} -> ${script.src}`);
        } catch (err) {
            console.error("[local-dev-loader] 注入失败", item, err);
        }
    }

    // 在页面加载时注入启用的脚本
    function injectEnabledScripts() {
        for (const item of loadList) {
            const enabled = !!GM_getValue(keyFor(item.id));
            if (enabled) {
                inject(item);
            } else {
                console.log(`[local-dev-loader] 跳过已禁用脚本: ${item.name}`);
            }
        }
    }

    // 注册菜单项，用于切换每个脚本的开关
    function registerMenu() {
        for (const item of loadList) {
            const menuLabel = () => {
                const enabled = !!GM_getValue(keyFor(item.id));
                return `${enabled ? "✅" : "⬜"} Toggle ${item.name}`;
            };

            // 需要包一层函数以捕获 item
            GM_registerMenuCommand(menuLabel(), () => {
                const key = keyFor(item.id);
                const newVal = !GM_getValue(key);
                GM_setValue(key, newVal);
                // 提示并在用户同意时刷新页面以使更改生效
                if (confirm(`${item.name} 已 ${newVal ? "启用" : "禁用"}。现在刷新页面以应用更改？`)) {
                    location.reload();
                } else {
                    // 若不刷新，则仅在控制台输出状态
                    console.log(`[local-dev-loader] ${item.name} 已 ${newVal ? "启用" : "禁用"}（未刷新）。`);
                }
            });
        }

        // 额外命令：重载所有脚本（刷新页面）
        GM_registerMenuCommand("Reload page (apply changes)", () => location.reload());

        // 额外命令：重置所有为默认（会删除存储的键）
        GM_registerMenuCommand("Reset all toggles to defaults", () => {
            if (!confirm("确认重置所有脚本的启用状态回默认值吗？")) return;
            for (const item of loadList) {
                try {
                    GM_deleteValue(keyFor(item.id));
                } catch (e) {
                    /* ignore */
                }
            }
            alert("已重置。将刷新页面以应用默认值。");
            location.reload();
        });
    }

    // 启动
    try {
        registerMenu();
        injectEnabledScripts();
    } catch (e) {
        console.error("[local-dev-loader] 启动时发生错误", e);
    }
})();
