export type ProgramSlug = 'ai-agent-builder' | 'ai-assisted-coding' | 'ai-media-studio';

export interface CurriculumWeek {
  week: number;
  title: { en: string; zh: string };
  topics: { en: string[]; zh: string[] };
  deliverable: { en: string; zh: string };
  phase?: { en: string; zh: string };
}

export interface ProgramData {
  slug: ProgramSlug;
  name: { en: string; zh: string };
  tagline: { en: string; zh: string };
  description: { en: string; zh: string };
  target: { en: string; zh: string };
  duration: { en: string; zh: string };
  weeks: number;
  totalHours: number;
  weeklyHours: string;
  format: {
    liveSessions: { en: string; zh: string };
    projectWork: { en: string; zh: string };
    community: { en: string; zh: string };
    deliverable: { en: string; zh: string };
  };
  tools: string[];
  curriculum: CurriculumWeek[];
  outcomes: { en: string[]; zh: string[] };
  color: {
    gradient: string;
    text: string;
    glow: string;
    border: string;
    bg: string;
    badge: string;
  };
}

export const programs: Record<ProgramSlug, ProgramData> = {
  'ai-agent-builder': {
    slug: 'ai-agent-builder',
    name: { en: 'AI Agent Builder', zh: 'AI智能体构建师' },
    tagline: {
      en: 'Build autonomous AI agents that research, decide, execute, and report back.',
      zh: '构建能够研究、决策、执行和反馈的自主AI智能体。',
    },
    description: {
      en: 'Master the most valuable skill of 2026 — building AI agents that automate entire business processes. Not chatbots. Autonomous systems that handle research, analysis, execution, and reporting without hand-holding.',
      zh: '掌握2026年最有价值的技能——构建能够自动化整个业务流程的AI智能体。不是聊天机器人，而是能够独立处理研究、分析、执行和报告的自主系统。',
    },
    target: {
      en: 'Developers, technical professionals, and ambitious non-coders (Python basics pre-work provided) who want to automate business processes with AI agents.',
      zh: '开发者、技术专业人员和有志于学习的非编程人员（提供Python基础预习材料），想要用AI智能体自动化业务流程。',
    },
    duration: { en: '10 Weeks', zh: '10周' },
    weeks: 10,
    totalHours: 170,
    weeklyHours: '15-20',
    format: {
      liveSessions: { en: '4-6 hrs/week — 2 evenings or 1 evening + Saturday', zh: '每周4-6小时 — 2个晚上或1个晚上+周六' },
      projectWork: { en: '6-8 hrs/week — async with mentor check-ins', zh: '每周6-8小时 — 异步学习，导师定期辅导' },
      community: { en: '2-3 hrs/week — Discord, pair sessions, peer review', zh: '每周2-3小时 — Discord交流、结对练习、同伴互评' },
      deliverable: { en: 'Ship a working agent every single week', zh: '每周交付一个可运行的AI智能体' },
    },
    tools: ['OpenAI Agents SDK', 'Large Language Models', 'Agent Orchestration Frameworks', 'Workflow Automation Platforms', 'Python', 'API Integration', 'Cloud Deployment', 'Vector Databases', 'Function Calling', 'Agent Monitoring'],
    curriculum: [
      {
        week: 1,
        phase: { en: 'Phase 1: Foundations', zh: '阶段一：基础' },
        title: { en: 'Agent Foundations & AI Assistants', zh: 'AI智能体基础与AI助手' },
        topics: {
          en: ['How AI agents work: perception → reasoning → action', 'Setting up your AI toolkit', 'API keys, environments, prompt playgrounds', 'Building your first single-purpose agent'],
          zh: ['AI智能体工作原理：感知→推理→行动', '搭建AI工具包', 'API密钥、环境配置、提示词playground', '构建第一个单功能智能体'],
        },
        deliverable: { en: 'Personal AI assistant that summarizes your daily emails', zh: '能够总结每日邮件的个人AI助手' },
      },
      {
        week: 2,
        title: { en: 'Prompt Architecture & Chain-of-Thought', zh: '提示词架构与思维链' },
        topics: {
          en: ['System prompts that actually work', 'Chain-of-thought reasoning patterns', 'Tool use and function calling', 'Building 3 specialized agents'],
          zh: ['真正有效的系统提示词', '思维链推理模式', '工具使用与函数调用', '构建3个专用智能体'],
        },
        deliverable: { en: 'AI research agent that finds, summarizes, and formats industry news', zh: '能够查找、总结和格式化行业新闻的AI研究智能体' },
      },
      {
        week: 3,
        title: { en: 'Memory, Context & Learning Agents', zh: '记忆、上下文与学习型智能体' },
        topics: {
          en: ['Short-term vs long-term agent memory', 'Context window management', 'RAG basics for agents', 'Agents that improve over time'],
          zh: ['短期与长期智能体记忆', '上下文窗口管理', '智能体的RAG基础', '持续改进的智能体'],
        },
        deliverable: { en: 'Agent that tracks meeting action items and sends automated follow-ups', zh: '跟踪会议行动项并自动发送跟进邮件的智能体' },
      },
      {
        week: 4,
        title: { en: 'Tool Use & Real-World Connections', zh: '工具使用与现实世界连接' },
        topics: {
          en: ['Connecting agents via MCP (Model Context Protocol)', 'Reading/writing spreadsheets, documents, and databases', 'Web scraping and data extraction agents', 'Error handling, retries, and cost tracking'],
          zh: ['通过MCP（模型上下文协议）连接智能体', '读写电子表格、文档和数据库', '网页抓取和数据提取智能体', '错误处理、重试和成本跟踪'],
        },
        deliverable: { en: 'Agent that pulls live data, analyzes trends, and writes a weekly report', zh: '提取实时数据、分析趋势并撰写每周报告的智能体' },
      },
      {
        week: 5,
        phase: { en: 'Phase 2: Orchestrate', zh: '阶段二：编排' },
        title: { en: 'Multi-Agent Orchestration', zh: '多智能体编排' },
        topics: {
          en: ['OpenAI Agents SDK — building agent teams', 'Agent delegation, handoffs, and collaboration', 'Sequential vs parallel agent workflows', 'Browser agents, computer use, and multi-agent pipelines'],
          zh: ['OpenAI Agents SDK — 构建智能体团队', '智能体委派、交接与协作', '顺序与并行智能体工作流', '浏览器智能体、计算机使用和多智能体管线'],
        },
        deliverable: { en: 'Automated content pipeline: research → draft → publish-ready article', zh: '自动化内容管线：研究→草稿→可发布文章' },
      },
      {
        week: 6,
        title: { en: 'Human-in-the-Loop & Guardrails', zh: '人机协同与安全护栏' },
        topics: {
          en: ['Approval workflows, conditional branching, and stateful agents', 'Output validation and quality checks', 'Cost management, rate limiting, and persistent state', 'Safety guardrails and content filtering'],
          zh: ['审批工作流、条件分支和有状态智能体', '输出验证和质量检查', '成本管理、速率限制和持久化状态', '安全护栏和内容过滤'],
        },
        deliverable: { en: 'Business process agent with approval steps (e.g., expense review)', zh: '带审批步骤的业务流程智能体（如费用审核）' },
      },
      {
        week: 7,
        title: { en: 'Agents for Business Operations', zh: 'AI智能体赋能业务运营' },
        topics: {
          en: ['HR automation — screening, onboarding workflows', 'Finance agents — invoice processing, reconciliation', 'Customer service — intelligent routing and response', 'Sales agents — lead qualification and outreach'],
          zh: ['HR自动化 — 简历筛选、入职流程', '财务智能体 — 发票处理、对账', '客服 — 智能路由和响应', '销售智能体 — 线索评估和外联'],
        },
        deliverable: { en: 'Department-specific agent blueprint + working prototype', zh: '部门专用智能体蓝图 + 可运行原型' },
      },
      {
        week: 8,
        phase: { en: 'Phase 3: Ship & Launch', zh: '阶段三：发布与上线' },
        title: { en: 'Agent Evaluation, Testing & Reliability', zh: '智能体评估、测试与可靠性' },
        topics: {
          en: ['Systematic agent evaluation frameworks', 'Testing agent outputs — accuracy, safety, consistency', 'Monitoring and observability in production', 'Responsible AI — ethics, bias detection, and compliance'],
          zh: ['系统化智能体评估框架', '测试智能体输出 — 准确性、安全性、一致性', '生产环境中的监控和可观测性', '负责任的AI — 伦理、偏见检测和合规'],
        },
        deliverable: { en: 'Production agent with evaluation suite, monitoring dashboard, and test coverage', zh: '带评估套件、监控仪表板和测试覆盖的生产级智能体' },
      },
      {
        week: 9,
        title: { en: 'Capstone: End-to-End Agent System', zh: '毕业项目：端到端智能体系统' },
        topics: {
          en: ['Scoping your capstone project', 'Architecture design for multi-agent systems', 'Deployment, monitoring, and observability', 'Performance optimization and cost tracking'],
          zh: ['确定毕业项目范围', '多智能体系统架构设计', '部署、监控和可观测性', '性能优化和成本跟踪'],
        },
        deliverable: { en: 'Working multi-agent system solving a real business problem', zh: '解决实际业务问题的多智能体系统' },
      },
      {
        week: 10,
        title: { en: 'Demo Day & Portfolio Launch', zh: '演示日与作品集发布' },
        topics: {
          en: ['Pitch preparation and storytelling', 'Portfolio assembly and documentation', 'Pricing your agent-building services', 'Present to panel of business leaders'],
          zh: ['演讲准备和故事讲述', '作品集整理和文档化', '为智能体构建服务定价', '向企业领导者小组展示'],
        },
        deliverable: { en: 'Demo Day — present your capstone to a live panel', zh: '演示日 — 向现场评审团展示你的毕业项目' },
      },
    ],
    outcomes: {
      en: [
        '6+ deployed AI agents in your portfolio',
        'A production-ready multi-agent capstone system',
        'Ability to automate entire business departments',
        'Portfolio site showcasing your agent builds',
        'Skills to freelance or consult — agent projects typically command PHP 50-150K+',
      ],
      zh: [
        '作品集中包含6+个已部署的AI智能体',
        '一个生产就绪的多智能体毕业项目系统',
        '自动化整个业务部门的能力',
        '展示智能体作品的作品集网站',
        '自由职业或咨询能力 — 智能体项目通常收费PHP 50-150K+',
      ],
    },
    color: {
      gradient: 'from-violet-500 to-purple-500',
      text: 'text-violet-400',
      glow: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      bg: 'bg-violet-500',
      badge: 'bg-violet-500/10 text-violet-300',
    },
  },

  'ai-assisted-coding': {
    slug: 'ai-assisted-coding',
    name: { en: 'AI-Assisted Coding', zh: 'AI辅助编程' },
    tagline: {
      en: 'Ship real products with AI — no CS degree required.',
      zh: '用AI发布真正的产品 — 无需计算机学位。',
    },
    description: {
      en: 'Vibe coding is building real software by describing what you want to AI — right inside your code editor and terminal. This program turns non-technical people into product shippers using AI-assisted development in VS Code. In 12 weeks, you\'ll build and deploy 7+ apps — including your own product with real users.',
      zh: 'Vibe编程是在代码编辑器和终端中通过向AI描述需求来构建真正的软件。这个项目利用VS Code中的AI辅助开发，将非技术人员转变为产品发布者。在12周内，你将构建和部署7+个应用程序——包括拥有真实用户的自己的产品。',
    },
    target: {
      en: 'Aspiring builders, intrapreneurs, startup founders, and anyone who wants to ship products without learning to code the traditional way.',
      zh: '有抱负的构建者、企业内部创业者、创业公司创始人，以及任何想要在不走传统编程学习路线的情况下发布产品的人。',
    },
    duration: { en: '12 Weeks', zh: '12周' },
    weeks: 12,
    totalHours: 200,
    weeklyHours: '15-20',
    format: {
      liveSessions: { en: '4-6 hrs/week — 2 evenings or 1 evening + Saturday', zh: '每周4-6小时 — 2个晚上或1个晚上+周六' },
      projectWork: { en: '6-8 hrs/week — build, iterate, ship', zh: '每周6-8小时 — 构建、迭代、发布' },
      community: { en: '2-3 hrs/week — code reviews, pair building, Discord', zh: '每周2-3小时 — 代码审查、结对构建、Discord交流' },
      deliverable: { en: 'Ship a working app every single week', zh: '每周发布一个可运行的应用' },
    },
    tools: ['AI Code Assistants', 'VS Code + Extensions', 'Terminal / CLI Tools', 'Cloud Databases', 'Authentication Services', 'Payment Integration', 'Mobile Frameworks', 'Deployment Platforms', 'Version Control', 'API Integration'],
    curriculum: [
      {
        week: 1,
        phase: { en: 'Phase 1: Build', zh: '阶段一：构建' },
        title: { en: 'Your First App in 60 Minutes', zh: '60分钟内构建第一个应用' },
        topics: {
          en: ['What vibe coding is and how AI writes code', 'Setting up VS Code, terminal, and git basics', 'From idea to deployed app in one session', 'Understanding what AI generates'],
          zh: ['什么是Vibe编程以及AI如何写代码', '配置VS Code、终端和git基础', '一次课程从想法到部署应用', '理解AI生成的内容'],
        },
        deliverable: { en: 'Deployed personal portfolio site — built entirely with AI', zh: '部署的个人作品集网站 — 完全由AI构建' },
      },
      {
        week: 2,
        title: { en: 'Layouts, Components & Beautiful UIs', zh: '布局、组件与精美界面' },
        topics: {
          en: ['Frontend fundamentals through AI prompting', 'Responsive layouts and component thinking', 'Styling with AI — beautiful UIs without memorizing syntax', 'Building 2 different app UIs'],
          zh: ['通过AI提示学习前端基础', '响应式布局和组件化思维', '用AI构建样式 — 无需记忆语法的精美界面', '构建2个不同的应用界面'],
        },
        deliverable: { en: 'Deployed landing page for a real business idea', zh: '为一个真实商业想法部署的落地页' },
      },
      {
        week: 3,
        title: { en: 'Data, Forms & User Input', zh: '数据、表单与用户输入' },
        topics: {
          en: ['Databases made simple — cloud-hosted backends', 'CRUD operations via AI', 'Forms, validation, and storing user data', 'Debugging with AI — reading errors and fixing broken builds'],
          zh: ['简化数据库 — 云托管后端', '通过AI实现CRUD操作', '表单、验证和用户数据存储', '用AI调试 — 阅读错误信息和修复构建故障'],
        },
        deliverable: { en: 'Working app with user accounts and saved data', zh: '带用户账户和数据保存的可运行应用' },
      },
      {
        week: 4,
        title: { en: 'Auth & Payments — Make It Real', zh: '认证与支付 — 让它变真实' },
        topics: {
          en: ['User authentication and session management', 'Payment gateway integration', 'Protected routes and user dashboards', 'The full SaaS stack with AI'],
          zh: ['用户认证和会话管理', '支付网关集成', '受保护路由和用户仪表板', '用AI构建完整的SaaS技术栈'],
        },
        deliverable: { en: 'SaaS app with login, dashboard, and payment flow', zh: '带登录、仪表板和支付流程的SaaS应用' },
      },
      {
        week: 5,
        phase: { en: 'Phase 2: Scale', zh: '阶段二：扩展' },
        title: { en: 'APIs & External Integrations', zh: 'API与外部集成' },
        topics: {
          en: ['What APIs are and how to connect them', 'Building apps that pull from multiple sources', 'Webhooks and real-time data', 'Error handling for external services'],
          zh: ['什么是API以及如何连接它们', '构建从多个数据源提取数据的应用', 'Webhooks和实时数据', '外部服务的错误处理'],
        },
        deliverable: { en: 'Tool that aggregates data from multiple sources into one dashboard', zh: '将多个数据源聚合到一个仪表板的工具' },
      },
      {
        week: 6,
        title: { en: 'AI-Powered Features', zh: 'AI驱动的功能' },
        topics: {
          en: ['Embedding large language models into your apps', 'AI chat interfaces and smart search', 'Content generation features', 'API costs, rate limits, and responsible AI use'],
          zh: ['将大语言模型嵌入你的应用', 'AI聊天界面和智能搜索', '内容生成功能', 'API成本、速率限制和负责任的AI使用'],
        },
        deliverable: { en: 'App with built-in AI assistant (e.g., AI-powered FAQ tool)', zh: '带内置AI助手的应用（如AI驱动的FAQ工具）' },
      },
      {
        week: 7,
        title: { en: 'Go Mobile — Cross-Platform Apps', zh: '移动端 — 跨平台应用' },
        topics: {
          en: ['Cross-platform mobile development with AI coding', 'One codebase, iOS + Android', 'Mobile-specific UI patterns', 'Testing on real devices'],
          zh: ['用AI编程进行跨平台移动开发', '一套代码，iOS + Android', '移动端特有的UI模式', '在真实设备上测试'],
        },
        deliverable: { en: 'Working mobile app running on your device — ready for app store submission', zh: '在你设备上运行的移动应用 — 可提交到应用商店' },
      },
      {
        week: 8,
        title: { en: 'Internal Tools & Business Apps', zh: '内部工具与商业应用' },
        topics: {
          en: ['Admin panels and dashboards', 'Operations tools for real workflows', 'Building for your actual company', 'Data visualization and reporting'],
          zh: ['管理面板和仪表板', '用于实际工作流的运营工具', '为你的实际公司构建', '数据可视化和报告'],
        },
        deliverable: { en: 'Working internal tool solving a real workplace problem', zh: '解决实际工作问题的内部工具' },
      },
      {
        week: 9,
        phase: { en: 'Phase 3: Launch', zh: '阶段三：发布' },
        title: { en: 'Production Polish', zh: '生产环境优化' },
        topics: {
          en: ['Performance optimization with AI', 'SEO and meta tags', 'Analytics integration', 'Error monitoring and logging'],
          zh: ['用AI进行性能优化', 'SEO和元标签', '分析工具集成', '错误监控和日志'],
        },
        deliverable: { en: 'Production-grade app with monitoring and analytics', zh: '带监控和分析的生产级应用' },
      },
      {
        week: 10,
        title: { en: 'Capstone Kickoff — Your Product', zh: '毕业项目启动 — 你的产品' },
        topics: {
          en: ['Choose your product idea', 'Architecture and scope planning', 'MVP definition — what ships in 2 weeks', 'First working prototype'],
          zh: ['选择你的产品创意', '架构和范围规划', 'MVP定义 — 2周内发布什么', '第一个可运行原型'],
        },
        deliverable: { en: 'Deployed MVP of your own product idea', zh: '你自己产品创意的已部署MVP' },
      },
      {
        week: 11,
        title: { en: 'Capstone Build Sprint', zh: '毕业项目冲刺构建' },
        topics: {
          en: ['Feature-complete build sprint', 'User testing and iteration', 'Mentor feedback integration', 'Landing page and onboarding flow'],
          zh: ['功能完整的构建冲刺', '用户测试和迭代', '导师反馈整合', '落地页和引导流程'],
        },
        deliverable: { en: 'Feature-complete product ready for users', zh: '功能完整、可供用户使用的产品' },
      },
      {
        week: 12,
        title: { en: 'Demo Day — Pitch & Launch', zh: '演示日 — 路演与发布' },
        topics: {
          en: ['Pitch preparation and storytelling', 'Live product demo practice', 'Portfolio assembly', 'Present to investors, hiring managers, and partners'],
          zh: ['路演准备和故事讲述', '现场产品演示练习', '作品集整理', '向投资者、招聘经理和合作伙伴展示'],
        },
        deliverable: { en: 'Demo Day — 5-minute pitch + live product demo', zh: '演示日 — 5分钟路演 + 现场产品演示' },
      },
    ],
    outcomes: {
      en: [
        '7+ shipped and deployed applications',
        '1 polished product with real users',
        'Full-stack product building skills with AI tools',
        'GitHub portfolio showcasing your work',
        'A launchable product and the skills to keep building',
      ],
      zh: [
        '7+个已发布和部署的应用程序',
        '1个有真实用户的精品产品',
        '使用AI工具的全栈产品构建技能',
        '展示你作品的GitHub作品集',
        '一个可发布的产品和持续构建的技能',
      ],
    },
    color: {
      gradient: 'from-cyan-500 to-blue-500',
      text: 'text-cyan-400',
      glow: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500',
      badge: 'bg-cyan-500/10 text-cyan-300',
    },
  },

  'ai-media-studio': {
    slug: 'ai-media-studio',
    name: { en: 'AI Content & Media Studio', zh: 'AI内容与媒体工作室' },
    tagline: {
      en: 'Build a full creative studio powered by AI and code.',
      zh: '用AI和代码打造完整的创意工作室。',
    },
    description: {
      en: 'Build a one-person media company — programmatically. Go beyond clicking buttons in AI apps. You\'ll learn basic scripting alongside code-based video tools and AI coding assistants to build automated content pipelines that produce professional campaigns at scale. Graduate with a client project and a freelance studio ready to take clients.',
      zh: '以编程方式打造一人媒体公司。超越在AI应用中点击按钮。你将学习基础脚本，结合代码驱动的视频工具和AI编程助手构建自动化内容管线，规模化制作专业营销活动。毕业时带着客户项目和准备接客户的自由工作室。',
    },
    target: {
      en: 'Marketers, freelancers, and content creators ready to level up with code. No prior programming needed — you\'ll learn scripting as you go.',
      zh: '准备用代码升级的营销人员、自由职业者和内容创作者。无需编程经验 — 在学习中掌握脚本技能。',
    },
    duration: { en: '8 Weeks', zh: '8周' },
    weeks: 8,
    totalHours: 140,
    weeklyHours: '15-20',
    format: {
      liveSessions: { en: '4-6 hrs/week — 2 evenings or 1 evening + Saturday', zh: '每周4-6小时 — 2个晚上或1个晚上+周六' },
      projectWork: { en: '6-8 hrs/week — produce real content assets', zh: '每周6-8小时 — 制作真实内容素材' },
      community: { en: '2-3 hrs/week — creative critiques, Discord, collabs', zh: '每周2-3小时 — 创意评审、Discord交流、协作' },
      deliverable: { en: 'Produce a professional content piece every week', zh: '每周制作一个专业内容作品' },
    },
    tools: ['Google Veo', 'Google Imagen', 'Code-Based Video Rendering', 'AI Coding Assistants', 'AI Image APIs', 'AI Voice Synthesis', 'AI Music Generation', 'Programmatic Video', 'Content Automation Scripts', 'Code-Based Media Pipelines'],
    curriculum: [
      {
        week: 1,
        phase: { en: 'Phase 1: Master the Stack', zh: '阶段一：掌握工具栈' },
        title: { en: 'AI Image Generation & Brand Visuals', zh: 'AI图像生成与品牌视觉' },
        topics: {
          en: ['Terminal basics, scripting 101, and your AI toolkit setup', 'AI image generation via APIs — Google Imagen and beyond', 'Prompt engineering for visual consistency', 'Brand visual systems — generating assets with scripts'],
          zh: ['终端基础、脚本入门和AI工具包配置', '通过API进行AI图像生成 — Google Imagen及更多', '视觉一致性的提示词工程', '品牌视觉系统 — 用脚本生成素材'],
        },
        deliverable: { en: 'Complete brand visual package — logo concepts, social templates, ad creatives', zh: '完整品牌视觉包 — 标志概念、社交模板、广告创意' },
      },
      {
        week: 2,
        title: { en: 'AI Video Production & Programmatic Pipelines', zh: 'AI视频制作与程序化管线' },
        topics: {
          en: ['Programmatic video foundations — building videos with code', 'Google Veo — text and image to video generation', 'Building reusable video templates programmatically', 'Short-form video for social media at scale'],
          zh: ['程序化视频基础 — 用代码制作视频', 'Google Veo — 文本和图像转视频生成', '程序化构建可复用的视频模板', '规模化社交媒体短视频'],
        },
        deliverable: { en: '30-second product/service ad — ready to run as a paid campaign', zh: '30秒产品/服务广告 — 可直接投放' },
      },
      {
        week: 3,
        title: { en: 'Programmatic Audio — Voice, Music & Scoring', zh: '程序化音频 — 语音、音乐与配乐' },
        topics: {
          en: ['Voice synthesis APIs — text-to-speech and voice cloning', 'Programmatic podcast production with scripts', 'AI music generation APIs — custom scores and jingles', 'Integrating audio into programmatic video pipelines'],
          zh: ['语音合成API — 文本转语音和声音克隆', '用脚本进行程序化播客制作', 'AI音乐生成API — 定制配乐和广告曲', '将音频集成到程序化视频管线中'],
        },
        deliverable: { en: 'Branded video with programmatic voiceover + AI-generated music score', zh: '带程序化配音和AI生成音乐的品牌视频' },
      },
      {
        week: 4,
        phase: { en: 'Phase 2: Build Systems', zh: '阶段二：构建系统' },
        title: { en: 'AI Copywriting & Scripted Content Generation', zh: 'AI文案与脚本化内容生成' },
        topics: {
          en: ['Brand voice development with LLM prompts and AI coding tools', 'Scripted content generation — bulk copy from templates', 'SEO-optimized content pipelines with code', 'Content briefs → finished assets via automated scripts'],
          zh: ['用LLM提示词和AI编程工具开发品牌语调', '脚本化内容生成 — 从模板批量生成文案', '用代码构建SEO优化内容管线', '内容简报→通过自动化脚本生成成品素材'],
        },
        deliverable: { en: '10 social posts + 5-email sequence + landing page copy — generated programmatically in brand voice', zh: '10篇社交帖子 + 5封邮件序列 + 落地页文案 — 程序化生成，符合品牌调性' },
      },
      {
        week: 5,
        title: { en: 'Programmatic Campaign Production', zh: '程序化营销活动制作' },
        topics: {
          en: ['End-to-end campaign assembly with code — images, copy, video, landing page', 'A/B variant generation via scripts and AI APIs', 'Platform-specific asset export automation', 'Orchestrating multi-asset campaigns with AI coding tools'],
          zh: ['用代码端到端组装营销活动 — 图像、文案、视频、落地页', '通过脚本和AI API生成A/B变体', '平台特定素材导出自动化', '用AI编程工具编排多素材营销活动'],
        },
        deliverable: { en: 'Launch-ready campaign package built programmatically — an agency would charge PHP 100K+ for this', zh: '程序化构建的可发布营销活动包 — 代理公司会为此收费PHP 100K+' },
      },
      {
        week: 6,
        title: { en: 'Code-Driven Content Pipelines', zh: '代码驱动的内容管线' },
        topics: {
          en: ['Building automated pipelines with Python and AI coding tools', 'Programmatic repurposing: 1 piece → 10 formats with code-based video', 'Distribution strategy — platform algorithms and posting automation', 'Content authenticity, AI disclosure, and platform compliance'],
          zh: ['用Python和AI编程工具构建自动化管线', '程序化内容再利用：用代码将1个作品→10种格式', '分发策略 — 平台算法和发布自动化', '内容真实性、AI披露和平台合规'],
        },
        deliverable: { en: 'Self-running code pipeline producing 5+ content pieces per day', zh: '每天程序化产出5+内容的自运行代码管线' },
      },
      {
        week: 7,
        phase: { en: 'Phase 3: Go Pro', zh: '阶段三：职业化' },
        title: { en: 'Client Project — Real Brief, Real Deadline', zh: '客户项目 — 真实需求，真实截止日' },
        topics: {
          en: ['Working with a real local business or startup', 'Client communication and brief interpretation', 'Full production sprint under deadline', 'Revision rounds and delivery'],
          zh: ['与真实本地企业或创业公司合作', '客户沟通和需求理解', '截止日期内的全面制作冲刺', '修改轮次和交付'],
        },
        deliverable: { en: 'Delivered client package: brand visuals + video + copy + campaign', zh: '交付客户包：品牌视觉+视频+文案+营销活动' },
      },
      {
        week: 8,
        title: { en: 'Studio Launch & Showcase Day', zh: '工作室发布与展示日' },
        topics: {
          en: ['Portfolio site creation with your own pipeline demos', 'Pricing strategy and service packages', 'Freelance platform profiles and client acquisition', 'Outreach automation with scripts'],
          zh: ['用你自己的管线演示创建作品集网站', '定价策略和服务套餐', '自由职业平台档案和客户获取', '用脚本自动化客户外联'],
        },
        deliverable: { en: 'Showcase Day — present client work + launch your studio', zh: '展示日 — 展示客户作品 + 发布你的工作室' },
      },
    ],
    outcomes: {
      en: [
        'Client-ready portfolio with a completed client project',
        'Automated content pipeline producing daily output',
        'One-person creative studio ready to take paying clients',
        'Mastery of programmatic content creation with AI APIs and code',
        'Freelance-ready with earning potential of PHP 30-80K/month',
      ],
      zh: [
        '包含已完成客户项目的专业作品集',
        '每日产出的自动化内容管线',
        '准备接付费客户的一人创意工作室',
        '精通AI API和代码的程序化内容创作',
        '具备自由职业能力，月收入潜力PHP 30-80K',
      ],
    },
    color: {
      gradient: 'from-amber-500 to-orange-500',
      text: 'text-amber-400',
      glow: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500',
      badge: 'bg-amber-500/10 text-amber-300',
    },
  },
};

export const programSlugs: ProgramSlug[] = ['ai-agent-builder', 'ai-assisted-coding', 'ai-media-studio'];

export function getProgram(slug: string): ProgramData | undefined {
  return programs[slug as ProgramSlug];
}
