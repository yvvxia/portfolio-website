// Portfolio content - bilingual (EN / Chinese).
// Edit copy, project data, and links here. Components read from this file.

export const EMAIL = "i.wuchen@outlook.com";
export const RESUME_URL = "";

const XIAOHONGSHU_URL = "https://www.xiaohongshu.com/user/profile/69a093d9000000001d0028ef";
const DOUYIN_URL =
  "https://www.douyin.com/user/MS4wLjABAAAAI3fPfPsoJ2QCwZAhLDKISBTyJ9akH8zKO1RZSsDY0q0Tf_decdRepGrbktJ_hvcp";
const BILIBILI_URL = "https://space.bilibili.com/3707022755236680";

const PROFILES_EN = [
  { label: "RED", href: XIAOHONGSHU_URL },
  { label: "Douyin", href: DOUYIN_URL },
  { label: "bilibili", href: BILIBILI_URL },
];

const PROFILES_ZH = [
  { label: "小红书", href: XIAOHONGSHU_URL },
  { label: "抖音", href: DOUYIN_URL },
  { label: "哔哩哔哩", href: BILIBILI_URL },
];

export const PORTFOLIO_CONTENT = {
  en: {
    name: "Wu Chen",
    metaLeft: "Class of 2027",
    metaRight: "Open to internships",
    navWork: "Work",
    navOther: "More",
    navContact: "Contact",
    langToggle: "中文",
    h1a1: "Visual",
    h1a2: "Designer",
    h1b1: "Design",
    h1b2: "Works",
    aboutTag: "A little about me",
    aboutLead:
      "Visual communication design student graduating in 2027, focused on UI/UX and AIGC-driven design.",
    aboutBody:
      "I am currently looking for internship opportunities and building a portfolio around visual systems, interface design, and AI-assisted creative workflows.",
    profilesTag: "Profiles",
    currentlyTag: "Currently",
    profiles: PROFILES_EN,
    workEyebrow: "Works in progress",
    otherEyebrow: "More to come",
    lblType: "Type",
    lblRole: "Role",
    lblYear: "Year",
    marquee: "Open to internships - Available through 2026 - Visual Design / UI/UX / AIGC - ",
    contactEyebrow: "Contact",
    contactTitle: "Let's talk about internship opportunities",
    contactBody:
      "Available for visual design, UI/UX, and AIGC design internship opportunities. Email me or follow my social profiles for new work updates.",
    footerEmail: "Email",
    footerResume: "Resume coming soon",
    copyright: "© 2026 Wu Chen. All rights reserved.",
    wordmark: "wu chen",
    csOverview: "Overview",
    csProcess: "Process",
    csOutcome: "Outcome",
    csClose: "Close",
    csOpen: "View progress",
    imgType: "Image",
    currently: [
      { label: "Updated", value: "Jul. 2026" },
      { label: "Status", value: "Open to internships" },
      { label: "Focus", value: "Visual Design / UI/UX / AIGC" },
    ],
    featured: [
      {
        id: "visual-systems",
        index: "(01)",
        title: "Visual Design Archive",
        blurb:
          "A placeholder for selected visual communication work. Project details and images will be added as the portfolio is organized.",
        kind: "Visual design",
        role: "Student designer",
        year: "2026",
        reverse: false,
        overview:
          "This section will collect visual communication projects, including typography, layout, poster, and brand exploration work.",
        process:
          "Future case studies will document research, visual exploration, iteration, and final presentation decisions.",
        outcome:
          "Project images, context, and outcomes are being organized and will be published here when ready.",
      },
      {
        id: "uiux-studies",
        index: "(02)",
        title: "UI/UX Study Notes",
        blurb:
          "A placeholder for interface and experience design explorations, including product thinking and interaction details.",
        kind: "UI/UX",
        role: "Student designer",
        year: "2026",
        reverse: true,
        overview:
          "This section will present UI/UX studies, interface redesigns, and product design exercises.",
        process:
          "Future entries will cover problem definition, user flows, wireframes, interface systems, and usability refinement.",
        outcome:
          "Screens, prototypes, and design rationale will be added after the work is organized.",
      },
      {
        id: "aigc-experiments",
        index: "(03)",
        title: "AIGC Experiments",
        blurb:
          "A placeholder for AI-assisted creative workflows and digital design experiments.",
        kind: "AIGC design",
        role: "Student designer",
        year: "2026",
        reverse: false,
        overview:
          "This section will collect experiments using AI tools as part of the visual and digital design process.",
        process:
          "Future case studies will describe prompts, iteration logic, image direction, and post-production decisions.",
        outcome:
          "Selected experiments and reflections will be added as the portfolio grows.",
      },
    ],
    other: [
      { n: "(01)", title: "Poster studies", kind: "Coming soon", year: "2026" },
      { n: "(02)", title: "Typography exercises", kind: "Coming soon", year: "2026" },
      { n: "(03)", title: "Interface practice", kind: "Coming soon", year: "2026" },
      { n: "(04)", title: "AIGC explorations", kind: "Coming soon", year: "2026" },
      { n: "(05)", title: "Course projects", kind: "Coming soon", year: "2026" },
    ],
  },
  zh: {
    name: "Wu Chen",
    metaLeft: "2027 毕业",
    metaRight: "寻找实习机会",
    navWork: "作品",
    navOther: "更多",
    navContact: "联系",
    langToggle: "EN",
    h1a1: "视觉",
    h1a2: "设计师",
    h1b1: "设计",
    h1b2: "作品",
    aboutTag: "关于我",
    aboutLead:
      "2027 毕业视觉传达设计学生，关注 UI/UX 设计与 AIGC 设计，目前正在寻找实习机会。",
    aboutBody:
      "我在整理作品集的过程中持续关注视觉系统、界面体验与 AI 辅助创作流程。正式作品还在整理中，页面会先保留清晰的方向与更新入口。",
    profilesTag: "社交主页",
    currentlyTag: "当前",
    profiles: PROFILES_ZH,
    workEyebrow: "作品整理中",
    otherEyebrow: "更多方向",
    lblType: "类型",
    lblRole: "角色",
    lblYear: "年份",
    marquee: "寻找实习机会 - 2026 年全年可实习 - 视觉设计 / UI/UX / AIGC 设计 - ",
    contactEyebrow: "联系",
    contactTitle: "期待实习与合作机会",
    contactBody:
      "我正在寻找视觉设计、UI/UX、AIGC 设计相关实习机会。欢迎通过邮箱联系，也可以在社交平台查看后续作品更新。",
    footerEmail: "邮箱",
    footerResume: "简历整理中",
    copyright: "© 2026 Wu Chen · 保留所有权利",
    wordmark: "Wu Chen",
    csOverview: "概述",
    csProcess: "过程",
    csOutcome: "成果",
    csClose: "关闭",
    csOpen: "查看进度",
    imgType: "图片",
    currently: [
      { label: "更新", value: "2026 年 7 月" },
      { label: "状态", value: "寻找实习" },
      { label: "方向", value: "视觉设计 / UI/UX / AIGC" },
    ],
    featured: [
      {
        id: "visual-systems",
        index: "(01)",
        title: "视觉设计整理中",
        blurb:
          "这里会放置视觉传达方向的代表作品，包括排版、海报、品牌视觉与版式探索。",
        kind: "视觉设计",
        role: "学生设计师",
        year: "2026",
        reverse: false,
        overview:
          "这一部分将用于整理视觉传达设计相关项目，包含字体、版式、海报、品牌视觉等方向。",
        process:
          "后续会补充项目背景、调研过程、视觉探索、迭代思路与最终呈现。",
        outcome:
          "作品图片、项目说明与阶段成果正在整理中，完成后会在这里更新。",
      },
      {
        id: "uiux-studies",
        index: "(02)",
        title: "UI/UX 作品整理中",
        blurb:
          "这里会放置界面与体验设计练习，包括产品思考、界面系统与交互细节。",
        kind: "UI/UX",
        role: "学生设计师",
        year: "2026",
        reverse: true,
        overview:
          "这一部分将用于展示 UI/UX 方向的学习、练习和阶段性项目。",
        process:
          "后续会补充问题定义、用户流程、线框图、界面系统与体验优化过程。",
        outcome:
          "界面稿、原型和设计说明正在整理中，完成后会在这里更新。",
      },
      {
        id: "aigc-experiments",
        index: "(03)",
        title: "AIGC 实验整理中",
        blurb:
          "这里会放置 AI 辅助创作与数字设计实验，记录工具、流程和视觉方向探索。",
        kind: "AIGC 设计",
        role: "学生设计师",
        year: "2026",
        reverse: false,
        overview:
          "这一部分将用于整理 AI 工具参与视觉设计和数字设计流程的实验。",
        process:
          "后续会补充提示词思路、生成迭代、视觉筛选、后期处理与设计判断。",
        outcome:
          "精选实验和过程复盘正在整理中，作品集完善后会在这里更新。",
      },
    ],
    other: [
      { n: "(01)", title: "海报练习", kind: "整理中", year: "2026" },
      { n: "(02)", title: "字体与版式练习", kind: "整理中", year: "2026" },
      { n: "(03)", title: "界面设计练习", kind: "整理中", year: "2026" },
      { n: "(04)", title: "AIGC 视觉实验", kind: "整理中", year: "2026" },
      { n: "(05)", title: "课程项目", kind: "整理中", year: "2026" },
    ],
  },
};
