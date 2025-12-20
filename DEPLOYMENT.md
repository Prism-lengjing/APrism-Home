# 部署指南 (Deployment Guide)

## 选项 1: Vercel (推荐 - 完美兼容)

由于本项目使用了 `nodemailer` (SMTP) 发送邮件，**Vercel 是最佳选择**，因为它原生支持 Node.js 运行时，可以直接使用飞书 SMTP。

### 步骤
1.  将代码推送到 **GitHub 私有仓库**。
2.  访问 [Vercel Dashboard](https://vercel.com/new)。
3.  导入你的 GitHub 仓库。
4.  在 **Environment Variables** (环境变量) 部分，填入 `.env.local` 中的所有内容：
    *   `SMTP_HOST`
    *   `SMTP_PORT`
    *   `SMTP_USER`
    *   `SMTP_PASS`
    *   `CONTACT_EMAIL`
5.  点击 **Deploy**。

---

## 选项 2: Cloudflare Pages (需要修改代码)

Cloudflare Pages 运行在 **Edge Runtime** (边缘环境) 上，**不支持** Node.js 的 SMTP 协议 (`nodemailer`)。

### ❌ 常见误区：Resend 能代理飞书 SMTP 吗？
**不能。**
*   **Resend** 是一个独立的邮件发送服务商，它**替代**飞书 SMTP，而不是连接飞书 SMTP。
*   你不能通过 Resend 的 API 去调用飞书的服务器发送邮件。

### 如果你坚持用 Cloudflare，必须做出取舍：

1.  **放弃飞书 SMTP，改用 Resend 服务**：
    *   你需要注册 [Resend](https://resend.com)。
    *   在 Resend 中验证你的域名（例如 `aprism.top`）。
    *   修改代码，将 `nodemailer` 替换为 `resend` SDK。
    *   **优点**：完美支持 Cloudflare，速度快。
    *   **缺点**：邮件是通过 Resend 发出的，不是通过飞书发出的（但在收件人看来都是 `xxx@aprism.top`）。

2.  **放弃 Cloudflare，改用 Vercel**：
    *   继续使用当前的 `nodemailer` + 飞书 SMTP 配置。
    *   **优点**：无需改代码，完全免费，完全兼容。

### Cloudflare 部署步骤 (仅当你已切换到 Resend 后)
1.  安装适配器: `npm install -D @cloudflare/next-on-pages`
2.  修改构建命令为: `npx @cloudflare/next-on-pages@1`
3.  在 Cloudflare 后台设置 Resend 的 API Key 环境变量。

---

## 总结建议

| 你的需求 | 推荐方案 |
| :--- | :--- |
| **我想用飞书 SMTP** | 👉 **部署到 Vercel** (最简单，无需改代码) |
| **我必须用 Cloudflare** | 👉 **改代码接入 Resend** (放弃飞书 SMTP) |
| **我想把 Resend 当跳板连飞书** | ❌ **不可行** (技术不支持) |
