export const translations = {
  en: {
    // Hero Section
    hero: {
      title: 'Ascenda',
      subtitle: '"To climb, to rise" — Latin',
      description:
        'Career acceleration and professional growth programs designed to help individuals reach new heights in their professional journey.',
      ctaStart: 'Start Your Ascent',
      ctaView: 'View Programs',
    },

    // Stats Section
    stats: {
      serviceAreas: 'Service Areas',
      programs: 'Programs',
      coaching: 'Coaching',
      schedules: 'Schedules',
    },

    // Services Section
    services: {
      label: 'What We Offer',
      title: 'Career Development Services',
      description: 'Comprehensive programs designed to accelerate your professional growth.',
      items: [
        {
          title: 'Career Coaching',
          description:
            'One-on-one guidance to navigate career transitions, set goals, and create actionable career development plans.',
          features: [
            'Career Path Assessment',
            'Goal Setting & Action Plans',
            'Career Transition Support',
            'Promotion Strategies',
            'Work-Life Integration',
          ],
        },
        {
          title: 'Personal Branding',
          description:
            'Build a compelling professional identity that opens doors and creates opportunities.',
          features: [
            'Brand Strategy Development',
            'LinkedIn Profile Optimization',
            'Professional Portfolio Creation',
            'Thought Leadership',
            'Online Presence Management',
          ],
        },
        {
          title: 'Interview Mastery',
          description:
            'Master the art of interviewing with techniques that showcase your value and land offers.',
          features: [
            'Behavioral Interview Prep',
            'Technical Interview Skills',
            'Salary Negotiation',
            'Mock Interview Sessions',
            'Confidence Building',
          ],
        },
        {
          title: 'Freelancing & Side Hustles',
          description:
            'Build income streams outside traditional employment with practical freelancing skills.',
          features: [
            'Freelance Business Setup',
            'Client Acquisition',
            'Pricing Strategies',
            'Portfolio Building',
            'Contract & Legal Basics',
          ],
        },
      ],
    },

    // Programs Section
    programs: {
      label: 'Programs',
      title: 'Accelerate Your Career',
      description: 'Structured programs designed for measurable career advancement.',
      items: [
        { name: 'Career Accelerator Program', duration: '8 weeks', focus: 'Complete career transformation' },
        { name: 'Executive Presence Intensive', duration: '2 weeks', focus: 'Leadership communication' },
        { name: 'Job Search Bootcamp', duration: '4 weeks', focus: 'Land your next role faster' },
        {
          name: 'LinkedIn Mastery Workshop',
          duration: '1 day',
          focus: 'Profile & networking optimization',
        },
        { name: 'Personal Brand Sprint', duration: '3 days', focus: 'Define and launch your brand' },
        { name: 'Freelancer Launchpad', duration: '6 weeks', focus: 'Start earning independently' },
      ],
    },

    // CTA Section
    cta: {
      title: 'Ready to',
      highlight: 'Climb Higher',
      description:
        "Let's discuss how Ascenda can accelerate your career journey. Book a consultation to explore your options.",
      ctaBook: 'Book Consultation',
    },
  },

  zh: {
    // Hero Section
    hero: {
      title: 'Ascenda',
      subtitle: '"攀登，崛起" — 拉丁语',
      description: '职业加速和专业成长项目，旨在帮助个人在职业道路上达到新的高度。',
      ctaStart: '开启您的攀登',
      ctaView: '查看项目',
    },

    // Stats Section
    stats: {
      serviceAreas: '服务领域',
      programs: '项目',
      coaching: '教练',
      schedules: '时间安排',
    },

    // Services Section
    services: {
      label: '我们提供',
      title: '职业发展服务',
      description: '全面的项目，旨在加速您的职业成长。',
      items: [
        {
          title: '职业教练',
          description: '一对一指导，帮助您应对职业转型、设定目标并制定可行的职业发展计划。',
          features: ['职业路径评估', '目标设定与行动计划', '职业转型支持', '晋升策略', '工作生活平衡'],
        },
        {
          title: '个人品牌',
          description: '打造令人信服的职业形象，开启机遇之门。',
          features: [
            '品牌策略开发',
            'LinkedIn资料优化',
            '专业作品集创建',
            '思想领导力',
            '在线形象管理',
          ],
        },
        {
          title: '面试精通',
          description: '掌握面试技巧，展示您的价值并获得录用通知。',
          features: ['行为面试准备', '技术面试技能', '薪资谈判', '模拟面试', '自信心培养'],
        },
        {
          title: '自由职业与副业',
          description: '通过实用的自由职业技能，在传统就业之外建立收入来源。',
          features: ['自由职业业务设置', '客户获取', '定价策略', '作品集建设', '合同与法律基础'],
        },
      ],
    },

    // Programs Section
    programs: {
      label: '项目',
      title: '加速您的职业发展',
      description: '结构化项目，旨在实现可衡量的职业进步。',
      items: [
        { name: '职业加速项目', duration: '8周', focus: '完整的职业转型' },
        { name: '高管形象密集班', duration: '2周', focus: '领导力沟通' },
        { name: '求职训练营', duration: '4周', focus: '更快找到下一份工作' },
        { name: 'LinkedIn精通工作坊', duration: '1天', focus: '资料与人脉优化' },
        { name: '个人品牌冲刺', duration: '3天', focus: '定义并推出您的品牌' },
        { name: '自由职业者启动台', duration: '6周', focus: '开始独立赚钱' },
      ],
    },

    // CTA Section
    cta: {
      title: '准备好',
      highlight: '攀登更高',
      description: '让我们讨论Ascenda如何加速您的职业旅程。预约咨询，探索您的选择。',
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
    coaching: string;
    schedules: string;
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
