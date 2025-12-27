# AperturePrism 官网 (AperturePrism Official Website)

**版本**: V1.2.0

[English](./README.en.md) | [简体中文](./README.md)

这是一个基于 [Next.js](https://nextjs.org) 15 的现代化团队官网，采用 **Apple-Class 设计风格**，旨在展示 AperturePrism 团队的创新与设计理念。

## 📅 更新日志 (Changelog)

### V1.3.0 (Current)
- 📰 **博客系统**: 新增 `/blog` 博客列表页和详情页，支持分类筛选、阅读进度条和侧边栏。
- 🚀 **项目详情页**: 全新设计的项目详情页，包含数据仪表盘、图库展示和关键特性列表。
- 🎨 **UI 组件**: 新增 Shadcn UI 风格的 Button 组件，优化 404 页面视觉。
- 🐛 **修复**: 修复了 Next.js 15+ 中动态路由参数解包的运行时错误。
- 🔧 **工程化**: 升级 `package.json` 版本号，更新文档指南。

### V1.2.0
- 🚀 **团队页面重构**: 新增“旗下团队”和“共创团队”板块，采用富媒体卡片展示。
- ✨ **共创计划**: 新增共创计划横幅，引导合作伙伴加入。
- 🆕 **新增页面**: 创建了 `/services` 服务范围页面，完善了站点结构。
- 🔗 **导航栏更新**: 新增“友链”入口，添加品牌 Logo 图片。
- 🐛 **修复**: 修复了页脚“服务范围”链接无法访问的问题。
- 🎨 **UI 优化**: 优化了卡片图片显示模式 (Contain)，增大了外部链接按钮触控区域。
- 🔧 **配置更新**: 新增 `furcraft.top` 图片域名白名单。
- 📝 **文档更新**: 新增“页面与内容修改指南”。

### V1.1.2
- ✨ **新增友情链接页面**: 创建了 `/friends` 页面，展示合作伙伴和友链。
- 🌍 **友链国际化**: 友链数据支持中英双语切换。
- 🔧 **页脚更新**: 在 Footer 中添加了友情链接入口。

### V1.0.0
- 🎉 **初始发布**: AperturePrism 官网正式上线。
- ⚛️ **核心架构**: 基于 Next.js 15 App Router 构建，使用 Server Components 优化性能。
- 🎨 **设计语言**: 确立 Apple-Class 极简设计风格，实现玻璃态和流畅动画效果。
- 🌍 **国际化**: 支持中英双语 (i18n) 切换。
- 📱 **响应式**: 完美适配桌面端和移动端设备。
- 📧 **功能**: 集成 SMTP 邮件发送功能的联系表单。

## ✨ 特性

- **国际化 (i18n)**: 支持简体中文 (zh) 和英文 (en) 双语切换，默认语言为中文。
- **Apple 设计风格**: 极简主义，玻璃态效果，流畅的动画。
- **响应式设计**: 完美适配桌面端和移动端，包括移动端汉堡菜单。
- **深色模式**: 自动跟随系统或手动切换深浅色主题。
- **联系表单**: 集成邮件发送功能，支持 SMTP 配置（如飞书、Gmail）。
- **招聘页面**: 独立的招聘信息展示与申请流程。
- **法律条款**: 完整的隐私政策和服务条款页面。
- **高性能**: 基于 Next.js App Router 和 Server Components 构建。
- **Docker 部署**: 提供生产环境优化的 Docker 镜像。

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **国际化**: next-intl
- **邮件**: Nodemailer
- **图标**: Lucide React, React Icons

## 📝 页面与内容修改指南

因为本项目使用了**国际化 (i18n)**，所以页面内容的修改位置分两部分：**文字内容** 和 **页面结构**。

### 1. 修改文字内容 (最常用)
如果你只是想改文字（比如把 "About Us" 改成 "关于我们"，或者修改简介文案），请修改 `messages` 文件夹下的 JSON 文件：

*   **中文内容**: 编辑 `messages/zh.json`
*   **英文内容**: 编辑 `messages/en.json`

### 2. 修改页面结构/布局
如果你想增加新的模块、修改排版、或者添加图片，需要修改对应的页面代码文件 (`src/app/[locale]/...`)：

| 页面名称 | 对应文件路径 | 修改说明 |
| :--- | :--- | :--- |
| **关于 (About)** | `src/app/[locale]/about/page.tsx` | 修改关于我们页面的布局 |
| **团队 (Team)** | `src/app/[locale]/team/page.tsx` | **修改成员名字**、添加旗下团队、共创计划板块 |
| **项目 (Projects)** | `src/app/[locale]/projects/page.tsx` | **修改项目图片**、调整项目卡片布局 |
| **项目详情 (Project Details)** | `src/app/[locale]/projects/[slug]/page.tsx` | 修改详情页结构、**统计数据逻辑**、图库布局 |
| **友情链接 (Friends)** | `src/app/[locale]/friends/page.tsx` | **修改友链Logo**、调整友链展示方式 |
| **博客列表 (Blog)** | `src/app/[locale]/blog/page.tsx` | 修改文章列表布局、筛选逻辑 |
| **博客详情 (Blog Post)** | `src/app/[locale]/blog/[slug]/page.tsx` | 修改文章阅读页样式、**侧边栏**、进度条逻辑 |
| **联系 (Contact)** | `src/app/[locale]/contact/page.tsx` | 修改联系表单、社交媒体链接 |
| **招聘 (Careers)** | `src/app/[locale]/careers/page.tsx` | 修改职位列表结构 |

### 3. 修改图片
*   **团队成员头像**: 放在 `public/images/team/` 目录。
*   **项目封面图**: 放在 `public/images/projects/` 目录。
*   **Logo/图标**: 放在 `public/` 根目录。

### 4. 社交媒体链接
修改 `src/app/[locale]/contact/page.tsx` 中的 `socialLinks` 数组，替换 `href` 为你的真实链接。

## 🚀 快速开始

首先，安装依赖：

```bash
npm install
```

配置环境变量（可选，用于邮件功能）：

```bash
cp .env.local.example .env.local
# 编辑 .env.local 填入 SMTP 信息
```

然后，启动开发服务器：

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可预览。

## 📂 项目结构

```
src/
├── app/
│   └── [locale]/       # 国际化路由页面
│       ├── about/      # 关于页面
│       ├── careers/    # 招聘页面
│       ├── contact/    # 联系页面
│       ├── friends/    # 友情链接
│       ├── privacy/    # 隐私政策
│       ├── projects/   # 项目页面
│       ├── team/       # 团队页面
│       ├── terms/      # 服务条款
│       ├── page.tsx    # 首页
│       └── layout.tsx  # 根布局
├── components/         # React 组件
│   ├── ui/             # 通用 UI 组件 (Card, Section 等)
│   ├── Navbar.tsx      # 导航栏
│   ├── Footer.tsx      # 页脚
│   ├── ContactForm.tsx # 联系表单
│   └── ...
├── i18n/               # 国际化配置
├── messages/           # 翻译文件 (zh.json, en.json)
└── lib/                # 工具函数
```

## 🌍 国际化 (i18n)

本项目使用 `next-intl` 进行国际化管理。
- 翻译文件位于 `messages/zh.json` (中文) 和 `messages/en.json` (英文)。
- 路由结构为 `/[locale]/path`，例如 `/zh/about` 或 `/en/about`。
- 默认语言配置在 `src/i18n/request.ts` 中。

## 📧 邮件配置

本项目使用 `nodemailer` 发送邮件。你需要配置 SMTP 服务（如飞书企业邮箱、Gmail 等）。
详细配置请参考 `.env.local.example` 文件。

## 🐳 Docker 部署

1. **构建镜像**:
   ```bash
   docker build -t aprism-website .
   ```

2. **运行容器**:
   ```bash
   docker run -p 3000:3000 aprism-website
   ```

## 📄 许可证

[MIT](LICENSE)
