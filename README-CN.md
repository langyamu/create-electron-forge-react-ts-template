# Electron + Vite + React + TypeScript 启动模板（集成 shadcn/ui、Zustand、ahooks、TanStack Router）

一个可用于生产的 Electron Forge 模板，使用 Vite 打包，并采用现代 React + TypeScript 技术栈。内置 shadcn/ui（通过 CLI）、Tailwind CSS v4、Zustand（结合 use-immer）、ahooks、TanStack Router。

## 技术栈
- Electron Forge + Vite（主进程/预加载/渲染进程）
- React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui 组件
- TanStack Router（配置式路由）
- Zustand 状态管理（本地状态示例用 use-immer）
- ahooks 常用 Hooks

## 环境要求
- Node.js 18+（已在 Node 22 上测试）
- Yarn 4.x（已配置 nodeLinker: node-modules）
- Windows 作为打包目标（其他平台可配置）

## 快速开始
```bash
# 安装依赖
yarn

# 开发启动（Electron + Vite 开发服务器）
yarn start
```
启动后会打开 Electron 窗口并显示 React 页面。默认打开 DevTools。

## 目录结构
```
├─ src
│  ├─ _main/            # Electron 主进程（入口：src/_main/index.ts）
│  ├─ _preload/         # 预加载脚本（入口：src/_preload/preload.ts）
│  ├─ components/
│  │  └─ ui/button.tsx  # shadcn/ui Button 组件
│  ├─ lib/utils.ts      # shadcn 工具 'cn'
│  ├─ store/counter.ts  # Zustand + use-immer 示例
│  ├─ app.tsx           # React 应用（TanStack Router + 示例）
│  ├─ renderer.ts       # 渲染入口 -> 引入 ./app
│  └─ index.css         # Tailwind v4 入口 + 主题 token
│
├─ forge.config.ts              # Electron Forge 配置（启用 Vite 插件）
├─ vite.main.config.ts          # 主进程 Vite 配置
├─ vite.preload.config.ts       # 预加载 Vite 配置
├─ vite.renderer.config.mts     # 渲染进程 Vite 配置（ESM）
├─ tailwind.config.ts
├─ components.json              # shadcn/ui CLI 配置
├─ index.html                   # 渲染 HTML（加载 src/renderer.ts）
└─ package.json
```

## 脚本
- `yarn start` – 开发模式（Vite dev server + Electron）
- `yarn package` – 仅打包可运行目录（无安装器）
- `yarn make` – 生成分发包（Windows 下默认 Squirrel .exe）
- `yarn publish` – 通过 Electron Forge 发布（需先配置 provider）

## Windows 打包
```bash
# 生成安装器与分发包（win32/x64）
yarn make
# 或显式指定
# yarn make --platform=win32 --arch=x64
```
产物位于 `out/make`。打包时 Vite 会构建：
- main/preload 到 `.vite/build/`（主进程入口为 `.vite/build/index.js`）
- renderer 根据 `vite.renderer.config.mts` 生成静态资源（ESM）

## shadcn/ui
项目已通过 CLI 配置好 shadcn/ui：
- 配置：`components.json`
- Tailwind：使用 v4，`@tailwindcss/vite` 插件与 `src/index.css`
- 新增组件：
```bash
yarn shadcn add input card tabs
```

## 路由
为适配打包后的 file:// 环境，默认使用 Hash History。若改为 History API，建议结合自定义协议或本地服务。

## 注意与排错
- ESM-only 插件（`@vitejs/plugin-react`、`@tailwindcss/vite`）：
  - 渲染配置使用 `vite.renderer.config.mts` 并在 `forge.config.ts` 中引用，避免 `require()` 加载报错。
- 打包后资源路径：
  - 在 `vite.renderer.config.mts` 设置 `base: './'`，确保 `index.html` 使用相对路径。
- Index 脚本路径：
  - `index.html` 使用相对路径 `src/renderer.ts`，以便在 file:// 下可用。
- 开发期 CSP 警告：
  - 由于 Vite 的 eval/inline，开发时 Electron 会告警；打包后不再出现。生产可添加更严格的 CSP。
- Yarn 配置：
  - 使用 Yarn 4 且 `nodeLinker: node-modules`，便于兼容生态。

## 安全
发布前请审阅 Electron 安全最佳实践：
https://www.electronjs.org/docs/latest/tutorial/security

建议：
- 在生产构建中设置明确的 Content Security Policy
- 关闭渲染进程的 `nodeIntegration`（本项目默认关闭）
- 使用 `contextIsolation` 与安全的 preload 桥接

## 许可证
MIT
