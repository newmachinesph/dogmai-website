export const translations = {
  en: {
    // Hero Section
    hero: {
      title: 'Elevare',
      subtitle: '"To lift, to elevate" — Latin',
      description:
        "Elevare is DOGM's dedicated training division, delivering transformative learning experiences that empower people and organizations to reach their highest potential.",
      ctaConsultation: 'Request Consultation',
      ctaView: 'View Programs',
    },

    // Stats Section
    stats: {
      serviceCategories: 'Service Categories',
      trainingPrograms: 'Training Programs',
      deliveryFormats: 'Delivery Formats',
      industriesServed: 'Industries Served',
    },

    // Services Section
    services: {
      label: 'Training Categories',
      title: 'Corporate Training Solutions',
      description: 'Comprehensive programs designed to transform every aspect of your organization.',
      categories: [
        {
          id: 'corporate',
          title: 'Corporate Training',
          subtitle: 'Human Capital Development',
          description:
            'Transform your workforce with comprehensive leadership and organizational development programs.',
          programs: [
            'Leadership Development Programs (Emerging, Mid-level, Executive)',
            'Team Building & High-Performance Teams',
            'Executive Coaching (1-on-1 and Group)',
            'Change Management',
            'Talent Management & Succession Planning',
            'Employee Engagement & Retention Strategies',
            'Organizational Culture Transformation',
            'Communication & Interpersonal Skills',
            'Conflict Resolution & Negotiation',
            'Emotional Intelligence (EQ) Training',
          ],
        },
        {
          id: 'process',
          title: 'Process Optimization',
          subtitle: 'Lean Six Sigma & Operational Excellence',
          description:
            'Streamline operations and drive efficiency through proven methodologies and certifications.',
          programs: [
            'Lean Six Sigma Yellow Belt Certification',
            'Lean Six Sigma Green Belt Certification',
            'Lean Six Sigma Black Belt Certification',
            'Business Process Improvement',
            'Operational Excellence',
            'Workflow Optimization',
            'Quality Management Systems',
            'Kaizen & Continuous Improvement',
            'Root Cause Analysis',
            'Project Management (PMP prep, Agile, Scrum)',
          ],
        },
        {
          id: 'future',
          title: 'Future-Ready Skills',
          subtitle: 'Digital Transformation & AI',
          description:
            'Prepare your team for tomorrow with cutting-edge technology and digital skills training.',
          programs: [
            'AI & Digital Transformation Training',
            'Data-Driven Decision Making',
            'Agile Methodologies',
            'Digital Leadership',
            'Automation & Technology Adoption',
            'Data Analytics Fundamentals',
            'Cybersecurity Awareness',
            'Prompt Engineering / AI Tools for Professionals',
          ],
        },
        {
          id: 'workforce',
          title: 'Workforce Management',
          subtitle: 'HR & People Operations',
          description: 'Optimize your human resources function with modern HR practices and systems.',
          programs: [
            'HR Analytics',
            'Performance Management Systems',
            'Workforce Planning & Optimization',
            'Managing Remote/Hybrid Teams',
            'Labor Law & Compliance (PH context)',
            'HRIS Implementation',
          ],
        },
        {
          id: 'executive',
          title: 'Executive Programs',
          subtitle: 'C-Suite & Leadership Excellence',
          description: 'Elevate your leadership capabilities with world-class executive development.',
          programs: [
            'C-Suite Leadership Development',
            'Transformational Leadership',
            'Strategic Thinking & Planning',
            'Global Leadership Readiness',
            'Board Governance Training',
            'Executive Presence & Communication',
          ],
        },
        {
          id: 'wealth',
          title: 'Wealth Management',
          subtitle: 'Financial Literacy & Planning',
          description:
            'Build financial acumen across your organization with comprehensive wealth education.',
          programs: [
            'Personal Financial Planning',
            'Investment Fundamentals',
            'Retirement Planning',
            'Financial Literacy for Employees',
            'Wealth Building for Professionals',
            'Stock Market / Mutual Funds / UITF Basics',
            'Insurance & Estate Planning Fundamentals',
          ],
        },
      ],
    },

    // Bootcamps Section
    bootcamps: {
      label: 'Accelerated Learning',
      title: 'Intensive Bootcamps',
      description: 'Fast-track skill development with our intensive, hands-on bootcamp programs.',
      items: [
        { name: 'Leadership Bootcamp', duration: 'Intensive', focus: 'Leadership fundamentals to advanced' },
        { name: 'Lean Six Sigma Bootcamp', duration: '2-4 weeks', focus: 'Belt certifications' },
        {
          name: 'Digital Transformation Bootcamp',
          duration: '3-5 days',
          focus: 'AI, automation, digital tools',
        },
        { name: 'Sales & Business Development', duration: '3 days', focus: 'Revenue growth strategies' },
        { name: 'Project Management Bootcamp', duration: '5 days', focus: 'Agile, Scrum, PMP prep' },
        { name: 'Data Analytics Bootcamp', duration: '4-6 weeks', focus: 'Data-driven decision making' },
        { name: 'AI for Business Bootcamp', duration: '2-3 days', focus: 'Practical AI applications' },
        {
          name: 'Supervisory Skills Bootcamp',
          duration: '2 days',
          focus: 'First-time manager essentials',
        },
        { name: 'HR Professionals Bootcamp', duration: '3-5 days', focus: 'Modern HR practices' },
      ],
    },

    // Team Building Section
    teamBuilding: {
      label: 'Build Stronger Teams',
      title: 'Team Building Programs',
      description:
        'Foster collaboration, strengthen bonds, and align your teams with customized team building experiences that create lasting impact.',
      ctaPlan: 'Plan Your Event',
      activities: [
        'Indoor/Outdoor Team Building Activities',
        'Virtual Team Building',
        'Department Alignment Workshops',
        'Cross-functional Collaboration Programs',
        'Values & Vision Alignment Sessions',
        'New Team Integration / Onboarding Experiences',
      ],
      values: [
        { value: 'Collaboration', icon: '🤝' },
        { value: 'Communication', icon: '💬' },
        { value: 'Trust', icon: '🛡️' },
        { value: 'Innovation', icon: '💡' },
      ],
    },

    // Industries Section
    industries: {
      label: 'Specialized Training',
      title: 'Industries We Serve',
      description: 'Tailored programs with industry-specific content and best practices.',
      items: [
        { name: 'BPO / Contact Center', icon: '🎧' },
        { name: 'Banking & Financial Services', icon: '🏦' },
        { name: 'Manufacturing & Operations', icon: '🏭' },
        { name: 'Healthcare', icon: '🏥' },
        { name: 'Retail & Hospitality', icon: '🛍️' },
        { name: 'Government & Public Sector', icon: '🏛️' },
      ],
    },

    // Delivery Formats Section
    delivery: {
      label: 'Flexible Learning',
      title: 'Delivery Formats',
      description: 'Choose the learning modality that works best for your team.',
      formats: [
        { name: 'In-person', description: 'On-site or off-site delivery', icon: '📍' },
        { name: 'Virtual / Online Live', description: 'Real-time remote sessions', icon: '💻' },
        { name: 'Hybrid', description: 'Combination of in-person and virtual', icon: '🔄' },
        { name: 'Self-paced E-learning', description: 'Learn at your own pace', icon: '📱' },
        { name: 'Blended Learning', description: 'Mixed methodology approach', icon: '🎯' },
        { name: 'Microlearning Modules', description: 'Bite-sized learning content', icon: '⚡' },
      ],
    },

    // Consulting Section
    consulting: {
      label: 'Expert Guidance',
      title: 'Assessment & Consulting',
      description1:
        'Before diving into training, we help you understand where you are and where you need to go. Our consulting services provide the foundation for targeted, effective development programs.',
      description2:
        'From comprehensive organizational assessments to ROI measurement, we ensure every investment in training delivers measurable business impact.',
      ctaSchedule: 'Schedule Assessment',
      services: [
        'Organizational Needs Assessment',
        'Training Needs Analysis (TNA)',
        'Culture & Engagement Surveys',
        'Leadership 360° Assessments',
        'Process Audits',
        'ROI Measurement & Impact Evaluation',
      ],
    },

    // CTA Section
    cta: {
      title: 'Ready to',
      highlight: 'Elevate',
      description:
        "Let's discuss how Elevare can help transform your organization. Our team is ready to design a customized solution for your needs.",
      ctaProposal: 'Request a Proposal',
      benefits: ['Free consultation', 'Customized programs', 'Flexible delivery'],
    },
  },

  zh: {
    // Hero Section
    hero: {
      title: 'Elevare',
      subtitle: '"提升，升华" — 拉丁语',
      description:
        'Elevare是DOGM的专业培训部门，提供变革性的学习体验，帮助个人和组织发挥最大潜力。',
      ctaConsultation: '咨询服务',
      ctaView: '查看课程',
    },

    // Stats Section
    stats: {
      serviceCategories: '服务类别',
      trainingPrograms: '培训课程',
      deliveryFormats: '授课形式',
      industriesServed: '服务行业',
    },

    // Services Section
    services: {
      label: '培训类别',
      title: '企业培训解决方案',
      description: '全面的培训项目，旨在全方位提升您的组织。',
      categories: [
        {
          id: 'corporate',
          title: '企业培训',
          subtitle: '人力资本发展',
          description: '通过全面的领导力和组织发展项目，打造卓越团队。',
          programs: [
            '领导力发展项目（新晋、中层、高管）',
            '团队建设与高绩效团队',
            '高管教练（一对一和小组）',
            '变革管理',
            '人才管理与继任计划',
            '员工敬业度与留存策略',
            '组织文化转型',
            '沟通与人际关系技巧',
            '冲突解决与谈判',
            '情商（EQ）培训',
          ],
        },
        {
          id: 'process',
          title: '流程优化',
          subtitle: '精益六西格玛与卓越运营',
          description: '通过成熟的方法论和认证，优化运营并提高效率。',
          programs: [
            '精益六西格玛黄带认证',
            '精益六西格玛绿带认证',
            '精益六西格玛黑带认证',
            '业务流程改进',
            '卓越运营',
            '工作流程优化',
            '质量管理体系',
            '改善与持续改进',
            '根因分析',
            '项目管理（PMP备考、敏捷、Scrum）',
          ],
        },
        {
          id: 'future',
          title: '未来技能',
          subtitle: '数字化转型与人工智能',
          description: '通过前沿技术和数字技能培训，为团队的未来做好准备。',
          programs: [
            'AI与数字化转型培训',
            '数据驱动决策',
            '敏捷方法论',
            '数字化领导力',
            '自动化与技术应用',
            '数据分析基础',
            '网络安全意识',
            '提示工程/专业人士AI工具',
          ],
        },
        {
          id: 'workforce',
          title: '劳动力管理',
          subtitle: '人力资源与人员运营',
          description: '通过现代人力资源实践和系统优化您的人力资源职能。',
          programs: [
            '人力资源分析',
            '绩效管理系统',
            '劳动力规划与优化',
            '远程/混合团队管理',
            '劳动法与合规（菲律宾背景）',
            'HRIS实施',
          ],
        },
        {
          id: 'executive',
          title: '高管项目',
          subtitle: 'C级管理层与领导力卓越',
          description: '通过世界级的高管发展项目提升您的领导力。',
          programs: [
            'C级领导力发展',
            '变革型领导力',
            '战略思维与规划',
            '全球领导力准备',
            '董事会治理培训',
            '高管形象与沟通',
          ],
        },
        {
          id: 'wealth',
          title: '财富管理',
          subtitle: '金融素养与规划',
          description: '通过全面的财富教育提升组织的金融素养。',
          programs: [
            '个人理财规划',
            '投资基础',
            '退休规划',
            '员工金融素养',
            '专业人士财富积累',
            '股票市场/共同基金/UITF基础',
            '保险与遗产规划基础',
          ],
        },
      ],
    },

    // Bootcamps Section
    bootcamps: {
      label: '加速学习',
      title: '密集训练营',
      description: '通过我们密集的实践训练营项目，快速提升技能。',
      items: [
        { name: '领导力训练营', duration: '密集', focus: '从基础到高级领导力' },
        { name: '精益六西格玛训练营', duration: '2-4周', focus: '带级认证' },
        { name: '数字化转型训练营', duration: '3-5天', focus: 'AI、自动化、数字工具' },
        { name: '销售与业务发展', duration: '3天', focus: '营收增长策略' },
        { name: '项目管理训练营', duration: '5天', focus: '敏捷、Scrum、PMP备考' },
        { name: '数据分析训练营', duration: '4-6周', focus: '数据驱动决策' },
        { name: 'AI商业应用训练营', duration: '2-3天', focus: '实用AI应用' },
        { name: '主管技能训练营', duration: '2天', focus: '新晋经理必备' },
        { name: 'HR专业人士训练营', duration: '3-5天', focus: '现代人力资源实践' },
      ],
    },

    // Team Building Section
    teamBuilding: {
      label: '打造更强团队',
      title: '团队建设项目',
      description: '通过定制化的团队建设体验，促进协作、加强联系、统一团队，创造持久影响。',
      ctaPlan: '规划您的活动',
      activities: [
        '室内/户外团队建设活动',
        '虚拟团队建设',
        '部门协调工作坊',
        '跨职能协作项目',
        '价值观与愿景统一会议',
        '新团队融合/入职体验',
      ],
      values: [
        { value: '协作', icon: '🤝' },
        { value: '沟通', icon: '💬' },
        { value: '信任', icon: '🛡️' },
        { value: '创新', icon: '💡' },
      ],
    },

    // Industries Section
    industries: {
      label: '专业培训',
      title: '服务行业',
      description: '针对行业特定内容和最佳实践的定制项目。',
      items: [
        { name: 'BPO/呼叫中心', icon: '🎧' },
        { name: '银行与金融服务', icon: '🏦' },
        { name: '制造与运营', icon: '🏭' },
        { name: '医疗保健', icon: '🏥' },
        { name: '零售与酒店', icon: '🛍️' },
        { name: '政府与公共部门', icon: '🏛️' },
      ],
    },

    // Delivery Formats Section
    delivery: {
      label: '灵活学习',
      title: '授课形式',
      description: '选择最适合您团队的学习方式。',
      formats: [
        { name: '线下', description: '现场或场外授课', icon: '📍' },
        { name: '虚拟/在线直播', description: '实时远程课程', icon: '💻' },
        { name: '混合式', description: '线下与线上相结合', icon: '🔄' },
        { name: '自主在线学习', description: '按自己的节奏学习', icon: '📱' },
        { name: '混合学习', description: '多种方法结合', icon: '🎯' },
        { name: '微学习模块', description: '碎片化学习内容', icon: '⚡' },
      ],
    },

    // Consulting Section
    consulting: {
      label: '专家指导',
      title: '评估与咨询',
      description1:
        '在开始培训之前，我们帮助您了解现状和目标。我们的咨询服务为有针对性、有效的发展项目奠定基础。',
      description2:
        '从全面的组织评估到投资回报率衡量，我们确保每一项培训投资都能产生可衡量的业务影响。',
      ctaSchedule: '预约评估',
      services: [
        '组织需求评估',
        '培训需求分析（TNA）',
        '文化与敬业度调查',
        '领导力360°评估',
        '流程审计',
        '投资回报率衡量与影响评估',
      ],
    },

    // CTA Section
    cta: {
      title: '准备好',
      highlight: '提升',
      description: '让我们讨论Elevare如何帮助您的组织转型。我们的团队随时为您设计定制解决方案。',
      ctaProposal: '获取方案',
      benefits: ['免费咨询', '定制项目', '灵活授课'],
    },
  },
} as const;

export type Language = keyof typeof translations;

type ServiceCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  programs: readonly string[];
};

type BootcampItem = {
  name: string;
  duration: string;
  focus: string;
};

type IndustryItem = {
  name: string;
  icon: string;
};

type DeliveryFormat = {
  name: string;
  description: string;
  icon: string;
};

type TeamValue = {
  value: string;
  icon: string;
};

export type TranslationKeys = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaConsultation: string;
    ctaView: string;
  };
  stats: {
    serviceCategories: string;
    trainingPrograms: string;
    deliveryFormats: string;
    industriesServed: string;
  };
  services: {
    label: string;
    title: string;
    description: string;
    categories: readonly ServiceCategory[];
  };
  bootcamps: {
    label: string;
    title: string;
    description: string;
    items: readonly BootcampItem[];
  };
  teamBuilding: {
    label: string;
    title: string;
    description: string;
    ctaPlan: string;
    activities: readonly string[];
    values: readonly TeamValue[];
  };
  industries: {
    label: string;
    title: string;
    description: string;
    items: readonly IndustryItem[];
  };
  delivery: {
    label: string;
    title: string;
    description: string;
    formats: readonly DeliveryFormat[];
  };
  consulting: {
    label: string;
    title: string;
    description1: string;
    description2: string;
    ctaSchedule: string;
    services: readonly string[];
  };
  cta: {
    title: string;
    highlight: string;
    description: string;
    ctaProposal: string;
    benefits: readonly string[];
  };
};
