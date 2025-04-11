# 开发指南

本项目使用 [`pnpm`](https://pnpm.io/) 作为包管理工具，以下是开发流程的简单介绍。

## 环境准备

1. 确保已安装 [Node.js](https://nodejs.org/)（建议使用 LTS 版本）。
2. 安装 `pnpm`（如果尚未安装）：

```bash
corepack prepare pnpm --activate
```

## 安装依赖

在项目根目录下运行以下命令安装依赖：
```bash
pnpm install
```
这可能要花一些时间，具体取决于你的网络速度和计算机性能。
有的时候安装速度会过于慢，或者安装失败，可以尝试使用以下命令来切换到淘宝镜像源：
```bash
npm config set registry https://registry.npmmirror.com
```

## 拉取子模块(submodule)

在项目根目录下运行以下命令：

```bash
git submodule init
git submodule update
```

将会拉取 [utils 模块](https://github.com/SugarChain-Studio/bc-modding-utilities.git) 到 `/utils` 目录

## 编译本地版本

运行以下命令以编译本地开发版本：
```bash
pnpm dev
```
此命令会根据项目的配置生成开发版本的文件，编译后的文件会存放在 `./public` 目录下，以下是重点需要注意的文件：

- `./public/bc-cloth.js`：编译后的主脚本文件。
- `./public/bc-cloth.user.js`: 油猴脚本文件，用于在浏览器中安装和使用。

## 启动本地服务器

运行以下命令启动本地服务器：
```bash
pnpm serve
```

## 使用油猴进行本地调试

1. 确保浏览器已安装 [Tampermonkey](https://www.tampermonkey.net/) 或其他油猴脚本管理工具。
2. 在 `pnpm serve` 启动本地服务器后，访问 `http://localhost:8080/bc-cloth.user.js`。
3. 点击页面中的 "安装" 按钮，将脚本添加到油猴中。
4. 脚本安装完成后，即可在浏览器中进行本地调试。

通过这种方式，可以快速验证本地修改的效果，而无需每次重新部署到生产环境。

如果 `8080` 端口已被占用，可以临时修改 `package.json` 中的配置以使服务从其他端口启动，但需要注意在提交时恢复。