import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ── Team Members ────────────────────────────────

  const binbim = await prisma.teamMember.upsert({
    where: { id: 'binbim' },
    update: {},
    create: {
      id: 'binbim',
      name: 'Binbim',
      nameZh: '彬彬Binbim',
      role: 'Founder & Lead Designer',
      roleZh: '创始人 & 核心开发者',
      bio: 'Full Stack Developer, a geek who loves tinkering with new technologies.',
      bioZh: '全栈开发者，热爱折腾新技术的极客。',
      image: 'https://q1.qlogo.cn/g?b=qq&nk=1721822150&s=640',
      type: 'member',
      sortOrder: 1,
    },
  });

  const sarah = await prisma.teamMember.upsert({
    where: { id: 'sarah' },
    update: {},
    create: {
      id: 'sarah',
      name: 'BeiChen',
      nameZh: '北尘BeiChen',
      role: 'Founder & Core Developer',
      roleZh: '创始人 & 核心开发者',
      bio: 'Frontend Engineer & Expert at Slacking Off',
      bioZh: '前端工程师 & 摸鱼小能手',
      image: 'https://q1.qlogo.cn/g?b=qq&nk=3579267163&s=640',
      type: 'member',
      sortOrder: 2,
    },
  });

  const advan10 = await prisma.teamMember.upsert({
    where: { id: 'advan10' },
    update: {},
    create: {
      id: 'advan10',
      name: 'advan10',
      nameZh: '赤焰鸿燏advan10',
      role: 'Founder & Core Developer',
      roleZh: '创始人 & 核心开发者',
      bio: 'Be a fish',
      bioZh: '做一条鱼',
      image: 'https://q1.qlogo.cn/g?b=qq&nk=3655144879&s=640',
      type: 'member',
      sortOrder: 3,
    },
  });

  const stralightnwn = await prisma.teamMember.upsert({
    where: { id: 'stralightnwn' },
    update: {},
    create: {
      id: 'stralightnwn',
      name: 'stralightnwn',
      nameZh: '不知道先生stralightnwn',
      role: 'Founder & Core Developer',
      roleZh: '创始人 & 核心开发者',
      bio: 'Top hacker in information competitions(',
      bioZh: '信竞大手子(',
      image: 'https://q1.qlogo.cn/g?b=qq&nk=1287830257&s=640',
      type: 'member',
      sortOrder: 4,
    },
  });

  const emily = await prisma.teamMember.upsert({
    where: { id: 'emily' },
    update: {},
    create: {
      id: 'emily',
      name: 'Join Us',
      nameZh: '欢迎加入',
      role: 'None for now, welcome to join',
      roleZh: '暂无 欢迎加入',
      bio: 'None for now, welcome to join',
      bioZh: '暂无 欢迎加入',
      image: '/images/team/logo.png',
      type: 'member',
      sortOrder: 5,
    },
  });

  // ── Sub Teams ───────────────────────────────────

  await prisma.teamMember.upsert({
    where: { id: 'subteam-lab' },
    update: {},
    create: {
      id: 'subteam-lab',
      name: 'Quantum Flow (Simulated Data)',
      nameZh: 'Quantum Flow（模拟数据）',
      role: 'R&D',
      roleZh: '研发',
      bio: 'Focused on frontier technology exploration, experimental project incubation, and infrastructure building.',
      bioZh: '专注于前沿技术探索、实验性项目孵化与技术基础设施构建。',
      image: '/images/projects/APrism-Home.png',
      website: 'https://lab.apertureprism.com',
      type: 'subteam',
      sortOrder: 1,
    },
  });

  await prisma.teamMember.upsert({
    where: { id: 'subteam-design' },
    update: {},
    create: {
      id: 'subteam-design',
      name: 'Quantum Flow (Simulated Data)',
      nameZh: 'Quantum Flow（模拟数据）',
      role: 'Design',
      roleZh: '设计',
      bio: 'Responsible for visual identity systems, user experience design, and creative interaction implementation.',
      bioZh: '负责视觉识别系统、用户体验设计与创意交互的落地。',
      image: '/images/projects/APrism-Home.png',
      website: 'https://design.apertureprism.com',
      type: 'subteam',
      sortOrder: 2,
    },
  });

  // ── Co-Creation Teams ───────────────────────────

  await prisma.teamMember.upsert({
    where: { id: 'cocreation-furcraft' },
    update: {},
    create: {
      id: 'cocreation-furcraft',
      name: 'FurCraft',
      nameZh: 'FurCraft',
      role: 'Team',
      roleZh: '团队',
      bio: 'Focus on the development and maintenance of furry-related projects.',
      bioZh: '专注于furry相关项目的开发与维护。',
      image: 'https://furcraft.top/logo.png',
      website: 'https://furcraft.top/',
      type: 'co-creation',
      sortOrder: 1,
    },
  });

  // ── Projects ────────────────────────────────────

  const projects = [
    {
      slug: 'alpha',
      title: 'APrism-Home',
      titleZh: 'APrism-Home',
      description: 'AperturePrism Team Official Website',
      descriptionZh: 'AperturePrism团队官网',
      content: 'This is the official website of the AperturePrism team, showcasing our vision, team members, and core projects. Built with Next.js 15, it combines Tailwind CSS and Framer Motion to create a fluid visual experience.',
      contentZh: '这是光圈棱镜团队的官方网站，展示了我们的愿景、团队成员以及核心项目。网站采用 Next.js 15 构建，结合了 Tailwind CSS 和 Framer Motion，打造出流畅的视觉体验。',
      category: 'Web Development',
      categoryZh: 'Web 开发',
      image: '/images/projects/APrism-Home.png',
      technologies: 'Next.js, React, Tailwind CSS, Framer Motion, TypeScript',
      teamSize: '4 People',
      timeline: '3 Months',
      role: 'Full Stack & Design',
      year: '2024',
      sortOrder: 1,
    },
    {
      slug: 'neon',
      title: 'Fur-Img-API',
      titleZh: 'Fur-Img-API',
      description: 'Team Project: Random Image API Based on Node.js',
      descriptionZh: '团队项目 基于Node.js的随机图片API',
      content: 'Fur-Img-API is a high-performance random image distribution service designed for community developers.',
      contentZh: 'Fur-Img-API 是一个高性能的随机图片分发服务，专为社区开发者设计。',
      category: 'Backend Development',
      categoryZh: '后端开发',
      image: '/images/projects/Fur-Img-API_V2.png',
      technologies: 'Node.js, Express, Redis, Docker',
      teamSize: '2 People',
      timeline: '2 Months',
      role: 'Backend Developer',
      year: '2024',
      sortOrder: 2,
    },
    {
      slug: 'quantum',
      title: 'Quantum Flow (Simulated)',
      titleZh: 'Quantum Flow（模拟数据）',
      description: 'Productivity application helping teams manage complex workflows.',
      descriptionZh: '帮助团队轻松管理复杂工作流的生产力应用。',
      content: 'Quantum Flow redefines the project management experience on mobile.',
      contentZh: 'Quantum Flow 重新定义了移动端的项目管理体验。',
      category: 'Mobile App',
      categoryZh: '移动应用',
      image: '/images/projects/APrism-Home.png',
      technologies: 'React Native, GraphQL, Firebase',
      teamSize: '3 People',
      timeline: '6 Months',
      role: 'Full Stack',
      year: '2024',
      sortOrder: 3,
    },
    {
      slug: 'nai2openai',
      title: 'NovelAI to OpenAI Proxy',
      titleZh: 'NovelAI to OpenAI Proxy',
      description: 'NovelAI Image Generation API to OpenAI Format Proxy Service',
      descriptionZh: 'NovelAI 图像生成 API 转 OpenAI 格式代理服务',
      content: 'A high-performance middleware service that converts NovelAI image generation API to OpenAI format.',
      contentZh: '一个高性能中间件服务，将 NovelAI 图像生成 API 转换为 OpenAI 格式。',
      category: 'Backend Tool',
      categoryZh: '后端工具',
      image: '/images/projects/nai2openai.png',
      technologies: 'Python, FastAPI, HTTPX, AsyncIO',
      githubUrl: 'https://github.com/Prism-lengjing/nai2openai',
      teamSize: '1 Person',
      timeline: '1 Month',
      role: 'Backend Developer',
      year: '2024',
      sortOrder: 4,
    },
    {
      slug: 'adminWebUI',
      title: 'Aprism FRP Admin',
      titleZh: 'Aprism FRP Admin',
      description: 'Management and access platform for private intranet penetration',
      descriptionZh: '面向私有化内网穿透的管理与接入平台',
      content: 'AperturePrism is a management and access platform for private intranet penetration.',
      contentZh: 'AperturePrism 是一个面向私有化内网穿透的管理与接入平台。',
      category: 'Web Development',
      categoryZh: 'Web 开发',
      image: '/images/projects/Aprism-Frp-adminWebUI.png',
      technologies: 'Node.js, React, Vite, SQLite, Express',
      githubUrl: 'https://github.com/Prism-lengjing/Aprism-Frp-adminWebUI',
      teamSize: '2 People',
      timeline: '4 Months',
      role: 'Full Stack',
      year: '2024',
      sortOrder: 5,
    },
    {
      slug: 'gmi',
      title: 'GMI Mental Illness Guide',
      titleZh: 'GMI 精神疾病指南',
      description: 'Chinese mental health knowledge base based on MkDocs',
      descriptionZh: '基于 MkDocs 的中文精神健康知识库',
      content: 'GMI is a Chinese mental health knowledge base built on MkDocs and mkdocs-material.',
      contentZh: 'GMI 是一个基于 MkDocs 与 mkdocs-material 构建的中文精神健康知识库。',
      category: 'Wiki & Education',
      categoryZh: '公益科普',
      image: '/images/projects/GMI.png',
      technologies: 'MkDocs, Python, Markdown',
      githubUrl: 'https://github.com/Prism-lengjing/GMI',
      teamSize: '2 People',
      timeline: '2 Months',
      role: 'Content & Dev',
      year: '2024',
      sortOrder: 6,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  // ── Friend Links ────────────────────────────────

  const friends = [
    {
      name: 'Next.js',
      nameZh: 'Next.js',
      description: 'The React Framework for the Web',
      descriptionZh: 'Web 的 React 框架',
      url: 'https://nextjs.org',
      logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
      sortOrder: 1,
    },
    {
      name: 'Vercel',
      nameZh: 'Vercel',
      description: 'Develop. Preview. Ship.',
      descriptionZh: '开发、预览、发布',
      url: 'https://vercel.com',
      logo: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
      sortOrder: 2,
    },
    {
      name: 'Tailwind CSS',
      nameZh: 'Tailwind CSS',
      description: 'Rapidly build modern websites without ever leaving your HTML',
      descriptionZh: '无需离开 HTML 即可快速构建现代网站',
      url: 'https://tailwindcss.com',
      logo: 'https://www.tailwindcss.cn/favicons/apple-touch-icon.png?v=3',
      sortOrder: 3,
    },
    {
      name: 'FurCraft',
      nameZh: 'FurCraft',
      description: 'Focus on the development and maintenance of furry-related projects.',
      descriptionZh: '专注于furry相关项目的开发与维护。',
      url: 'https://furcraft.top/',
      logo: 'https://furcraft.top/logo.png',
      sortOrder: 4,
    },
  ];

  for (const friend of friends) {
    await prisma.friendLink.upsert({
      where: { id: friend.name.toLowerCase().replace(/\s+/g, '-') },
      update: friend,
      create: {
        id: friend.name.toLowerCase().replace(/\s+/g, '-'),
        ...friend,
      },
    });
  }

  // ── Admin User ─────────────────────────────────

  const adminPassword = process.env.ADMIN_PASSWORD || 'aprism-admin-2024';
  const adminHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: 'admin@aprism.top' },
    update: {},
    create: {
      email: 'admin@aprism.top',
      name: 'Admin',
      passwordHash: adminHash,
      role: 'admin',
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
