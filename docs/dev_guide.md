# 开发指南

本项目使用 [`pnpm`](https://pnpm.io/) 作为包管理工具，并且使用 [`git`](https://git-scm.com/) 进行版本控制。以下是开发流程的简单介绍。

- [开发指南](#开发指南)
  - [环境准备](#环境准备)
    - [获取仓库](#获取仓库)
    - [拉取子模块(submodule)](#拉取子模块submodule)
    - [准备 Node.js 和 pnpm](#准备-nodejs-和-pnpm)
    - [安装依赖](#安装依赖)
  - [编译本地版本](#编译本地版本)
  - [启动本地服务器](#启动本地服务器)
  - [使用油猴进行本地调试](#使用油猴进行本地调试)
  - [提交信息规范](#提交信息规范)
  - [代码规范附加规则](#代码规范附加规则)
    - [`local/no-underscore-in-custom-asset-name`](#localno-underscore-in-custom-asset-name)
    - [`local/tapedhands-last-in-assetposemapping`](#localtapedhands-last-in-assetposemapping)
    - [`local/no-targetcharacters-possessive`](#localno-targetcharacters-possessive)


## 环境准备

### 获取仓库

1. 确保已经安装了 [`git`](https://git-scm.com/)。
2. 在你的计算机上找到一个合适的目录，使用以下命令克隆仓库：

```bash
git clone https://github.com/SugarChain-Studio/echo-clothing-ext.git
``` 

现在，如果一切正常，在你执行命令的位置应该已经创建了一个目录 `echo-clothing-ext`，使用 `cd` 命令进入该目录：

```bash
cd ./echo-clothing-ext
```

这个目录称为项目的**根目录**，多数操作都将在这个目录下进行。

### 拉取子模块(submodule)

在项目的**根目录**运行以下命令：

```bash
git submodule update --init
```

将会拉取 [utils 模块](https://github.com/SugarChain-Studio/bc-modding-utilities.git) 到 `/utils` 目录


### 准备 Node.js 和 pnpm

1. 确保已安装 [Node.js](https://nodejs.org/)（建议使用 LTS 版本）。
2. 在项目**根目录**运行以下命令，安装 `pnpm`：

```bash
corepack prepare pnpm --activate
```

### 安装依赖

在项目**根目录**运行以下命令，安装依赖：

```bash
pnpm install
```

这可能要花一些时间，具体取决于你的网络速度和计算机性能。
有的时候安装速度会过于慢，或者安装失败，可以尝试使用以下命令来切换镜像源：

```bash
npm config set registry https://registry.npmmirror.com
```

## 编译本地版本

在项目**根目录**运行以下命令，编译本地开发版本：

```bash
pnpm dev
```

此命令会根据项目的配置生成开发版本的文件，编译后的文件会存放在 `./public` 目录下，以下是重点需要注意的文件：

- `./public/bc-cloth.js`：编译后的主脚本文件。
- `./public/bc-cloth.user.js`: 油猴脚本文件，用于在浏览器中安装和使用。

## 启动本地服务器

在项目**根目录**运行以下命令，启动本地服务器：

```bash
pnpm serve
```

默认这会在 `8080` 端口启动一个本地服务器，提供对 `./public` 目录的访问。
> 如果 `8080` 端口已被占用，可以临时修改 `package.json` 中的配置以使服务从其他端口启动，但需要注意重新编译本地版本，并且在提交时应当恢复这些修改。

## 使用油猴进行本地调试

1. 确保浏览器已安装 [Tampermonkey](https://www.tampermonkey.net/) 或其他油猴脚本管理工具。
2. 在 `pnpm serve` 启动本地服务器后，访问 `http://localhost:8080/bc-cloth.user.js`。
3. 点击页面中的 "安装" 按钮，将脚本添加到油猴中。
4. 脚本安装完成后，即可在浏览器中进行本地调试。

通过这种方式，可以快速验证本地修改的效果，而无需每次重新部署到生产环境。

## 提交信息规范

项目使用经过稍微调整的 angular 提交信息规范（Conventional Commits）来规范提交信息，方便生成变更日志和版本发布。

项目里的提交信息需要遵循一定的格式，写法很简单：用“类型 + 简短说明”，中文就行。格式如下：

```text
类型: 做了啥
```

常用类型：

- feat：新增功能/内容（比如新增物品）
- fix：修复问题（比如路径错了、图层不对、遮罩出问题）
- adjust：用户能感觉到的可见调整（比如加了个选项、调整图层优先级、改了文本）
- refactor：重构代码（不影响功能和用户体验的代码改动，增加开发用的库也在此列）
- chore: 工具脚本、构建流程等杂项改动
- docs：只改文档

直接看例子（拿去改字就能用）：

```text
feat: 新增“xxx”物品

adjust: 提高 xxx/yyy 层优先级，避免被发型挡住
adjust: 将“xxx”物品中文显示改为“yyy”
adjust: 调整“yyy”默认颜色

fix: 修复“xxx”在Yoked姿势下错位
fix: 修正“xxx”物品两个选项的英文拼写
```

小贴士：

- 一句话说清楚“改了什么”和“为什么”
- 一个提交尽量只做一件事；改动多就拆开几条提交
- 提交前可以用 `pnpm lint` 检查代码格式

## 代码规范附加规则

项目的 ESLint 包含一些定制规则（前缀 `local/`），以下逐条说明：

### `local/no-underscore-in-custom-asset-name`

限制：`CustomAssetDefinition` 顶层字段 `Name` 不允许出现下划线 `_`。

原因：基础系统的图片资源名到物品资产的“反向查找”是以“第一个下划线出现的位置”为分界，将文件名前缀视为物品的 `Name`。如果 `Name` 本身含有下划线，就会让系统误判边界（例如 `Cool_Top_Layer1.png`，系统会把 `Cool` 解析为 Name 而不是期望的 `Cool_Top`），导致资源匹配失败或错位。为避免二义性，`Name` 禁止出现 `_`。除此之外没有强制的大小写 / 单词分隔要求；保持你在项目里其它资产的已有风格即可。

如果确实需要兼容历史带下划线的名称（极少数情况），建议：
1. 使用新规范名称作为主定义；
2. 在扩展或兼容映射里加入旧名称的处理（不直接将旧名称继续作为 `Name`）。

---

### `local/tapedhands-last-in-assetposemapping`

在定义 `AssetPoseMapping` 对象时，必须把 `TapedHands` 属性写在最后。

如果顺序不正确会报错，并且可以使用自动修复 (`pnpm lint --fix`) 将 `TapedHands` 移动到末尾。其原因是：实现里会按定义顺序遍历姿势映射，`TapedHands` 是一个特殊姿势；如果它没有放在最后，会被过早匹配，使其优先级高于正常上半身姿势（例如普通站立/背后捆绑等），导致这些普通姿势被错误隐藏或覆盖。

### `local/no-targetcharacters-possessive`

禁止在字符串（普通字面量与模板字符串）中出现 `TargetCharacter's`，改用 `DestinationCharacter`。

原因：`DestinationCharacter` 在目标为自身时会自动进行人称与所有格的正确替换（her / his / their 等），而直接拼接 `TargetCharacter's` 会生成错误输出（例如 `her's`、`he's`）。

该规则支持自动修复（`pnpm lint --fix`），会把出现的 `TargetCharacter's` 替换为 `DestinationCharacter`。如果确实需要原样引用（极少数情况），请添加解释性注释并避免直接使用该模式。
