import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';

const TURSO_URL = 'libsql://aprism-website-bb0813.aws-ap-northeast-1.turso.io';
const TURSO_TOKEN = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODA5NDUyNDQsImlkIjoiMDE5ZWE4OTgtMTEwMS03YWQyLWE0N2EtNzFjYmQyNzg3MDkzIiwicmlkIjoiYWNhOWU0ZTEtODFiOC00YzVlLWE1YjUtYzVmZDg4MzQ2NGNmIn0.AQzLmaKVQMY0PZBY_xOJhUaRyeFTmvOvjSjeqEBEcydFEQDWKn4CLlKaeMOHxmgmeQh4NeBQiv_GGaZYUn6aAA';

async function main() {
  const client = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });

  console.log('Seeding Turso database...');

  // Admin user
  const adminHash = await bcrypt.hash('aprism-admin-2024', 12);
  await client.execute({
    sql: `INSERT OR IGNORE INTO users (id, email, name, password_hash, role) VALUES (?, ?, ?, ?, ?)`,
    args: ['admin', 'admin@aprism.top', 'Admin', adminHash, 'admin']
  });

  // Team members
  const members = [
    ['binbim', 'Binbim', '彬彬Binbim', 'Founder & Lead Designer', '创始人 & 核心开发者', 'Full Stack Developer, a geek who loves tinkering with new technologies.', '全栈开发者，热爱折腾新技术的极客。', 'https://q1.qlogo.cn/g?b=qq&nk=1721822150&s=640', 'member', 1],
    ['sarah', 'BeiChen', '北尘BeiChen', 'Founder & Core Developer', '创始人 & 核心开发者', 'Frontend Engineer & Expert at Slacking Off', '前端工程师 & 摸鱼小能手', 'https://q1.qlogo.cn/g?b=qq&nk=3579267163&s=640', 'member', 2],
    ['advan10', 'advan10', '赤焰鸿燏advan10', 'Founder & Core Developer', '创始人 & 核心开发者', 'Be a fish', '做一条鱼', 'https://q1.qlogo.cn/g?b=qq&nk=3655144879&s=640', 'member', 3],
    ['stralightnwn', 'stralightnwn', '不知道先生stralightnwn', 'Founder & Core Developer', '创始人 & 核心开发者', 'Top hacker in information competitions(', '信竞大手子(', 'https://q1.qlogo.cn/g?b=qq&nk=1287830257&s=640', 'member', 4],
    ['emily', 'Join Us', '欢迎加入', 'None for now, welcome to join', '暂无 欢迎加入', 'None for now, welcome to join', '暂无 欢迎加入', '/images/team/logo.png', 'member', 5],
  ];

  for (const m of members) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO team_members (id, name, name_zh, role, role_zh, bio, bio_zh, image, type, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: m
    });
  }

  // Sub teams
  await client.execute({
    sql: `INSERT OR IGNORE INTO team_members (id, name, name_zh, role, role_zh, bio, bio_zh, image, website, type, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['subteam-lab', 'Quantum Flow (Simulated)', 'Quantum Flow（模拟数据）', 'R&D', '研发', 'Focused on frontier technology exploration.', '专注于前沿技术探索。', '/images/projects/APrism-Home.png', 'https://lab.apertureprism.com', 'subteam', 1]
  });

  await client.execute({
    sql: `INSERT OR IGNORE INTO team_members (id, name, name_zh, role, role_zh, bio, bio_zh, image, website, type, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['subteam-design', 'Quantum Flow (Simulated)', 'Quantum Flow（模拟数据）', 'Design', '设计', 'Responsible for visual identity systems.', '负责视觉识别系统。', '/images/projects/APrism-Home.png', 'https://design.apertureprism.com', 'subteam', 2]
  });

  // Co-creation team
  await client.execute({
    sql: `INSERT OR IGNORE INTO team_members (id, name, name_zh, role, role_zh, bio, bio_zh, image, website, type, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: ['cocreation-furcraft', 'FurCraft', 'FurCraft', 'Team', '团队', 'Focus on furry-related projects.', '专注于furry相关项目。', 'https://furcraft.top/logo.png', 'https://furcraft.top/', 'co-creation', 1]
  });

  // Projects
  const projects = [
    ['alpha', 'APrism-Home', 'APrism-Home', 'AperturePrism Team Official Website', 'AperturePrism团队官网', 'Official website of the AperturePrism team.', '光圈棱镜团队的官方网站。', 'Web Development', 'Web 开发', '/images/projects/APrism-Home.png', 'Next.js, React, Tailwind CSS, TypeScript', '4 People', '3 Months', 'Full Stack & Design', '2024', 1],
    ['neon', 'Fur-Img-API', 'Fur-Img-API', 'Random Image API Based on Node.js', '基于Node.js的随机图片API', 'High-performance random image distribution service.', '高性能的随机图片分发服务。', 'Backend Development', '后端开发', '/images/projects/Fur-Img-API_V2.png', 'Node.js, Express, Redis, Docker', '2 People', '2 Months', 'Backend Developer', '2024', 2],
    ['nai2openai', 'NovelAI to OpenAI Proxy', 'NovelAI to OpenAI Proxy', 'NovelAI Image Generation API to OpenAI Format', 'NovelAI 图像生成 API 转 OpenAI 格式', 'High-performance middleware service.', '高性能中间件服务。', 'Backend Tool', '后端工具', '/images/projects/nai2openai.png', 'Python, FastAPI, HTTPX, AsyncIO', '1 Person', '1 Month', 'Backend Developer', '2024', 3],
    ['adminWebUI', 'Aprism FRP Admin', 'Aprism FRP Admin', 'Management platform for intranet penetration', '面向私有化内网穿透的管理平台', 'Management and access platform.', '管理与接入平台。', 'Web Development', 'Web 开发', '/images/projects/Aprism-Frp-adminWebUI.png', 'Node.js, React, Vite, SQLite', '2 People', '4 Months', 'Full Stack', '2024', 4],
    ['gmi', 'GMI Mental Illness Guide', 'GMI 精神疾病指南', 'Chinese mental health knowledge base', '中文精神健康知识库', 'Chinese mental health knowledge base.', '中文精神健康知识库。', 'Wiki & Education', '公益科普', '/images/projects/GMI.png', 'MkDocs, Python, Markdown', '2 People', '2 Months', 'Content & Dev', '2024', 5],
    ['quantum', 'Quantum Flow', 'Quantum Flow（模拟数据）', 'Productivity application for workflows', '管理复杂工作流的生产力应用', 'Redefines project management on mobile.', '重新定义了移动端的项目管理体验。', 'Mobile App', '移动应用', '/images/projects/APrism-Home.png', 'React Native, GraphQL, Firebase', '3 People', '6 Months', 'Full Stack', '2024', 6],
  ];

  for (const p of projects) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO projects (slug, title, title_zh, description, description_zh, content, content_zh, category, category_zh, image, technologies, teamSize, timeline, role, year, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: p
    });
  }

  // Friend links
  const friends = [
    ['nextjs', 'Next.js', 'Next.js', 'The React Framework for the Web', 'Web 的 React 框架', 'https://nextjs.org', 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png', 1],
    ['vercel', 'Vercel', 'Vercel', 'Develop. Preview. Ship.', '开发、预览、发布', 'https://vercel.com', 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico', 2],
    ['tailwindcss', 'Tailwind CSS', 'Tailwind CSS', 'Rapidly build modern websites', '无需离开 HTML 即可快速构建现代网站', 'https://tailwindcss.com', 'https://www.tailwindcss.cn/favicons/apple-touch-icon.png?v=3', 3],
    ['furcraft', 'FurCraft', 'FurCraft', 'Focus on furry-related projects.', '专注于furry相关项目的开发与维护。', 'https://furcraft.top/', 'https://furcraft.top/logo.png', 4],
  ];

  for (const f of friends) {
    await client.execute({
      sql: `INSERT OR IGNORE INTO friend_links (id, name, name_zh, description, description_zh, url, logo, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: f
    });
  }

  console.log('Seeding complete!');
  await client.close();
}

main().catch(console.error);
