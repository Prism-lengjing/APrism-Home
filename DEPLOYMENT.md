# Vercel 部署指南 (Vercel Deployment Guide)

本项目针对 **Vercel** 进行了优化，这是部署 Next.js 应用最简单、最推荐的方式。

## 📋 准备工作

1.  确保你有一个 [GitHub](https://github.com/) 账号。
2.  确保你有一个 [Vercel](https://vercel.com/) 账号（可以直接用 GitHub 登录）。
3.  准备好你的飞书 SMTP 配置信息（即 `.env.local` 中的内容）。

## 🚀 部署步骤

### 第一步：推送到 GitHub

如果你还没有将代码推送到 GitHub，请先创建一个新的仓库（可以是私有的），然后执行：

```bash
# 初始化 git (如果尚未初始化)
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit"

# 关联远程仓库 (替换为你的仓库地址)
git remote add origin https://github.com/your-username/your-repo-name.git

# 推送到主分支
git push -u origin main
```

### 第二步：在 Vercel 中导入项目

1.  登录 [Vercel Dashboard](https://vercel.com/dashboard)。
2.  点击右上角的 **"Add New..."** -> **"Project"**。
3.  在 "Import Git Repository" 列表中，找到你刚才推送的 `aprism-website` 仓库，点击 **"Import"**。

### 第三步：配置环境变量 (关键!)

在配置页面 (Configure Project) 中：

1.  **Framework Preset**: 保持默认 (Next.js)。
2.  **Root Directory**: 保持默认 (`./`).
3.  展开 **Environment Variables** (环境变量) 区域。
4.  你需要将本地 `.env.local` 文件中的配置逐一填入：

| Key (键) | Value (值) | 说明 |
| :--- | :--- | :--- |
| `SMTP_HOST` | `smtp.feishu.cn` | 飞书 SMTP 服务器 |
| `SMTP_PORT` | `465` | 端口 |
| `SMTP_USER` | `your@email.com` | 你的飞书邮箱 |
| `SMTP_PASS` | `xxxxxx` | 你的飞书授权码/密码 |
| `SMTP_SECURE` | `true` | 开启 SSL |
| `CONTACT_EMAIL` | `receiver@email.com` | 接收通知的邮箱 |

*提示：你可以直接复制粘贴键值对，Vercel 支持批量添加。*

### 第四步：开始部署

1.  点击底部的 **"Deploy"** 按钮。
2.  等待约 1-2 分钟，Vercel 会自动构建并发布你的网站。
3.  构建完成后，你会看到满屏的彩带 🎉，点击图片即可访问你的网站！

## 🔄 后续更新

以后你只需要在本地修改代码，然后执行 `git push` 推送到 GitHub，Vercel 会自动检测到更新并重新部署，无需任何额外操作。

## 🌐 绑定自定义域名 (可选)

如果你有自己的域名 (如 `aprism.top`)：
1.  在 Vercel 项目页面，点击 **Settings** -> **Domains**。
2.  输入你的域名，点击 **Add**。
3.  按照提示去你的域名服务商 (如阿里云、腾讯云、Cloudflare) 添加 CNAME 记录即可。
