export const translations = {
  en: {
    // Hero Section
    hero: {
      title: 'Initium',
      subtitle: '"Beginning, origin" — Latin',
      description:
        'From idea to execution — entrepreneurship and startup development programs designed to help founders build, launch, and scale their ventures.',
      ctaStart: 'Start Your Journey',
      ctaView: 'View Programs',
    },

    // Stats Section
    stats: {
      serviceAreas: 'Service Areas',
      programs: 'Programs',
      approach: 'Approach',
      mentorship: 'Included',
    },

    // Services Section
    services: {
      label: 'What We Offer',
      title: 'Startup Development Services',
      description: 'Everything you need to go from idea to launch and beyond.',
      items: [
        {
          title: 'Startup Bootcamps',
          description:
            'Intensive programs to validate ideas, build MVPs, and launch your venture with confidence.',
          features: [
            'Idea Validation Framework',
            'Business Model Canvas',
            'MVP Development',
            'Go-to-Market Strategy',
            'Investor Readiness',
          ],
        },
        {
          title: 'Business Modeling',
          description:
            'Learn to design sustainable business models that scale and attract investment.',
          features: [
            'Revenue Model Design',
            'Unit Economics',
            'Market Sizing (TAM/SAM/SOM)',
            'Competitive Analysis',
            'Financial Projections',
          ],
        },
        {
          title: 'Pitch Training',
          description:
            'Master the art of pitching to investors, partners, and customers with compelling narratives.',
          features: [
            'Pitch Deck Creation',
            'Storytelling for Startups',
            'Investor Q&A Prep',
            'Demo Day Preparation',
            'Negotiation Skills',
          ],
        },
        {
          title: 'Growth Strategies',
          description: 'Scale your venture with proven growth tactics and operational excellence.',
          features: [
            'Growth Hacking',
            'Customer Acquisition',
            'Retention Strategies',
            'Partnership Development',
            'Scaling Operations',
          ],
        },
      ],
    },

    // Programs Section
    programs: {
      label: 'Programs',
      title: 'Launch Your Venture',
      description: 'Structured programs to take you from concept to launch.',
      items: [
        { name: 'Founder Bootcamp', duration: '12 weeks', focus: 'Idea to MVP launch' },
        { name: 'Pitch Perfect Workshop', duration: '2 days', focus: 'Investor pitch mastery' },
        { name: 'Business Model Sprint', duration: '1 week', focus: 'Validate & refine your model' },
        { name: 'Growth Accelerator', duration: '8 weeks', focus: 'Scale your early-stage startup' },
        { name: 'E-commerce Launchpad', duration: '6 weeks', focus: 'Start selling online' },
        { name: 'Solopreneur Starter', duration: '4 weeks', focus: 'Build your one-person business' },
      ],
    },

    // CTA Section
    cta: {
      title: 'Ready to',
      highlight: 'Begin',
      description:
        'Every successful venture starts with a single step. Let Initium guide your entrepreneurial journey from the very beginning.',
      ctaBook: 'Book Consultation',
    },
  },

  zh: {
    // Hero Section
    hero: {
      title: 'Initium',
      subtitle: '"开始，起源" — 拉丁语',
      description:
        '从想法到执行 — 创业和初创企业发展项目，旨在帮助创始人建立、启动和扩展他们的事业。',
      ctaStart: '开启您的旅程',
      ctaView: '查看项目',
    },

    // Stats Section
    stats: {
      serviceAreas: '服务领域',
      programs: '项目',
      approach: '方法',
      mentorship: '包含',
    },

    // Services Section
    services: {
      label: '我们提供',
      title: '初创企业发展服务',
      description: '从创意到上线所需的一切。',
      items: [
        {
          title: '创业训练营',
          description: '密集项目，帮助您验证想法、构建MVP并自信地启动您的事业。',
          features: [
            '创意验证框架',
            '商业模式画布',
            'MVP开发',
            '市场进入策略',
            '投资者准备',
          ],
        },
        {
          title: '商业建模',
          description: '学习设计可扩展并吸引投资的可持续商业模式。',
          features: [
            '收入模式设计',
            '单位经济学',
            '市场规模（TAM/SAM/SOM）',
            '竞争分析',
            '财务预测',
          ],
        },
        {
          title: '路演培训',
          description: '掌握向投资者、合作伙伴和客户进行有说服力的路演技巧。',
          features: [
            '路演演示文稿制作',
            '创业故事讲述',
            '投资者问答准备',
            '演示日准备',
            '谈判技巧',
          ],
        },
        {
          title: '增长策略',
          description: '通过经过验证的增长策略和卓越运营来扩展您的事业。',
          features: ['增长黑客', '客户获取', '留存策略', '合作伙伴开发', '规模化运营'],
        },
      ],
    },

    // Programs Section
    programs: {
      label: '项目',
      title: '启动您的事业',
      description: '结构化项目，带您从概念到上线。',
      items: [
        { name: '创始人训练营', duration: '12周', focus: '从创意到MVP上线' },
        { name: '路演完美工作坊', duration: '2天', focus: '投资者路演精通' },
        { name: '商业模式冲刺', duration: '1周', focus: '验证和完善您的模式' },
        { name: '增长加速器', duration: '8周', focus: '扩展您的早期初创企业' },
        { name: '电商启动台', duration: '6周', focus: '开始在线销售' },
        { name: '独立创业者起步', duration: '4周', focus: '建立您的单人企业' },
      ],
    },

    // CTA Section
    cta: {
      title: '准备好',
      highlight: '开始',
      description:
        '每一个成功的事业都从第一步开始。让Initium从最开始引导您的创业旅程。',
      ctaBook: '预约咨询',
    },
  },
} as const;

export type Language = keyof typeof translations;

type ServiceItem = {
  title: string;
  description: string;
  features: readonly string[];
};

type ProgramItem = {
  name: string;
  duration: string;
  focus: string;
};

export type TranslationKeys = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaStart: string;
    ctaView: string;
  };
  stats: {
    serviceAreas: string;
    programs: string;
    approach: string;
    mentorship: string;
  };
  services: {
    label: string;
    title: string;
    description: string;
    items: readonly ServiceItem[];
  };
  programs: {
    label: string;
    title: string;
    description: string;
    items: readonly ProgramItem[];
  };
  cta: {
    title: string;
    highlight: string;
    description: string;
    ctaBook: string;
  };
};
