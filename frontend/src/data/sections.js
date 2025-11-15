export const sectionsRegistry = {
  home: [
    {
      id: 'home-stack',
      layout: 'stacked',
      eyebrow: 'Video Effects Studio',
      title: 'Ship premium video magic without touching a timeline.',
      subheading:
        'Drop your assets, pick a vibe, and publish branded video effects that feel handcrafted. Built for creators who care about cinematic polish and growth teams who need speed.',
      ctaText: 'Explore All Effects',
      ctaLink: '/video-effects',
      secondaryText: 'See How It Works',
      secondaryLink: '/generator',
      cards: [
        { title: '42 AI effects', copy: 'Romance, cinematic, creator-first templates updated weekly.' },
        { title: '15 min average', copy: 'From upload to approved render with automated QA gates.' },
        { title: 'Global ready', copy: 'Auto localize captions, pacing, and grades in one pass.' },
      ],
      media: {
        label: 'Live preview',
        url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80',
      },
    },
    {
      id: 'home-split',
      layout: 'split',
      eyebrow: 'Creator + Brand Control',
      title: 'Campaign creative to conversion in one board.',
      copy:
        'Stack multi-layout hero sections to highlight romance generators, neon creator packs, and admin-ready controls without bouncing between tools.',
      bullets: [
        'Left column hero image toggles between romance + neon packs.',
        'Right column callouts emphasize credits and instant preview.',
        'Buttons link to generator workspace for immediate testing.',
      ],
      media:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Launch Generator',
      ctaLink: '/generator',
    },
    {
      id: 'home-gallery',
      layout: 'gallery',
      eyebrow: 'Featured Effects',
      title: 'Borrow energy from our most viral looks.',
      copy:
        'Borrow the blueprint from pollo.ai’s most booked effects—grid layout keeps every card tappable on mobile.',
      assets: [
        {
          label: 'Hug Bloom',
          title: 'AI Hug Generator',
          description: 'Volumetric hugs with fabric-aware physics.',
          image:
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
        },
        {
          label: 'Portal Sync',
          title: 'Portal Transition',
          description: 'Teleport talent through iridescent rings.',
          image:
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
        },
        {
          label: 'Focus Halo',
          title: 'AI Focus Change',
          description: 'Liquid rack focus for hero products.',
          image:
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
        },
        {
          label: 'Neon Trail',
          title: 'Neon Wings',
          description: 'Creator-first LED wings with auto tracking.',
          image:
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
        },
      ],
      ctaText: 'View All Templates',
      ctaLink: '/video-effects',
    },
    {
      id: 'home-steps',
      layout: 'steps',
      eyebrow: 'Workflow',
      title: 'Four steps from idea to shoppable effect.',
      copy: 'Mirror pollo.ai’s stepper: upload, pick template, generate, publish.',
      steps: [
        { title: 'Upload 1‑3 photos', description: 'JPG/PNG/WebP up to 5 MB each with smart validation.' },
        { title: 'Switch effect', description: 'Tap through modal to test romance, cinematic, and creator packs.' },
        { title: 'Generate preview', description: 'Button activates after upload—auto renders sample video.' },
        { title: 'Publish globally', description: 'Send to video effects hub, my creations, and admin dashboards.' },
      ],
      media:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
    },
  ],
  generator: [
    {
      id: 'generator-stack',
      layout: 'stacked',
      eyebrow: '功能生成页',
      title: 'Upload, iterate, and approve in one split view.',
      subheading:
        'Left rail holds uploads + effect switching. Right rail mirrors pollo.ai with state-based video preview cards.',
      ctaText: 'Browse All Effects',
      ctaLink: '/video-effects',
      cards: [
        { title: '3 uploads max', copy: 'Validate JPG, PNG, JPEG, WebP and 5 MB ceiling per asset.' },
        { title: 'Locked CTA', copy: 'Generate button glows only after valid files exist.' },
        { title: 'State previews', copy: 'Before render: curated demo reels. After: generated clip.' },
      ],
      media: {
        label: 'Generator UI',
        url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
      },
    },
    {
      id: 'generator-steps',
      layout: 'steps',
      eyebrow: '操作步骤',
      title: 'Every touchpoint is explained.',
      copy: 'Reference pollo.ai: crisp steps with micro copy and supportive imagery.',
      steps: [
        { title: '1. 上传图片', description: '拖拽或点击上传，系统立即做体积/格式校验。' },
        { title: '2. 切换特效', description: '点击「特效切换」弹窗，预览不同模板灯光风格。' },
        { title: '3. 一键生成', description: '上传完成后按钮点亮，自动调用生成 API。' },
        { title: '4. 发布/下载', description: '将视频同步到特效聚合页或下载原片。' },
      ],
      media:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
    },
  ],
  hub: [
    {
      id: 'hub-copy',
      layout: 'stacked',
      eyebrow: '特效聚合页',
      title: 'Grid 4-5 cards per row, instant deep links.',
      subheading:
        'Describe total effect count, highlight trending packs, and guide visitors back into generator or pricing.',
      ctaText: 'Start Creating',
      ctaLink: '/generator',
      cards: [
        { title: '42 ready-to-ship', copy: 'Romance, cinematic, portal, creator, and anime packs.' },
        { title: 'SEO friendly slugs', copy: '/video-effects/ai-hug-generator style URLs for every card.' },
        { title: 'One-click deep links', copy: 'Each card drives to detail pages that mirror pollo.ai detail layout.' },
      ],
      media: {
        label: 'Effects grid',
        url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
      },
    },
    {
      id: 'hub-gallery',
      layout: 'gallery',
      eyebrow: 'Layout styles',
      title: 'Mix grid, split, and stepper blocks for storytelling.',
      copy: 'Use gallery cards to highlight AI Hug, Portal, Focus, and Neon variations.',
      assets: [
        {
          label: 'Romance stack',
          title: 'AI Hug & Kissing',
          description: 'Warm gradients, soft blur, CTA to /video-effects/ai-hug-generator.',
          image:
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
        },
        {
          label: 'Creator lane',
          title: 'Neon Wings',
          description: 'Grid overlay with hover stats, perfect for Shorts banks.',
          image:
            'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80',
        },
        {
          label: 'Cinematic duo',
          title: 'Focus Change',
          description: 'Hero copy sits right, image left for desktop split layout.',
          image:
            'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
        },
      ],
      ctaText: 'View Generator',
      ctaLink: '/generator',
    },
  ],
  creation: [
    {
      id: 'creation-copy',
      layout: 'split',
      eyebrow: '创作中心页',
      title: 'Showcase generated videos in reverse chronological order.',
      copy:
        'Each card shows preview, effect name, date, credit spend, and quick actions (preview, download). One line summary states total effect count pushed live.',
      bullets: [
        '4-5 cards per row grid, switch to masonry on mobile.',
        'Filter by effect slug to jump into /video-effects/:slug detail.',
        'Secondary CTA drives to billing/pricing depending on entitlement.',
      ],
      media:
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1200&q=80',
      ctaText: 'Go to Billing',
      ctaLink: 'https://XXX.ai/billing',
    },
    {
      id: 'creation-steps',
      layout: 'steps',
      eyebrow: 'Re-engagement flow',
      title: 'My Creation -> Billing -> Contact in two clicks.',
      copy:
        'Avatar dropdown mirrors requirement (My Creation, Billing, Contact Us via Outlook, Logout). Use this stepper as contextual reminder.',
      steps: [
        { title: 'My Creation', description: '跳转 https://XXX.ai/my-creation，展示倒序视频。' },
        { title: 'Billing', description: '付费用户进入 https://XXX.ai/billing 管理积分。' },
        { title: 'Contact Us', description: '触发 Outlook 邮件，附带 effect slug + user id。' },
        { title: 'Logout', description: '清除 Pinia 状态并回到未登录导航。' },
      ],
      media:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
    },
  ],
  admin: [
    {
      id: 'admin-stack',
      layout: 'stacked',
      eyebrow: '管理后台',
      title: 'Configure template pricing, model, and prompts in one table.',
      subheading:
        'Each row lists template name, model, sample image/video, prompt, and credit pricing exactly as requirement states. Buttons open drawer for edits.',
      ctaText: 'Add Template',
      ctaLink: '/admin/templates',
      cards: [
        { title: 'Prompt control', copy: 'Update CN + EN prompts to match campaign copywriting.' },
        { title: 'Asset pairs', copy: 'Upload still + video reference for creators to preview.' },
        { title: 'Credit guardrails', copy: 'Tie every template to MySQL tiers for billing accuracy.' },
      ],
      media: {
        label: 'Admin UI',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
      },
    },
    {
      id: 'admin-steps',
      layout: 'steps',
      eyebrow: '配置流程',
      title: '参考 modao 原型的操作顺序。',
      copy: '从模版选择到 prompt 编辑，再到积分定价，一次完成。',
      steps: [
        { title: '选择模板', description: '点击模板卡片，查看模型、案例素材。' },
        { title: '编辑 Prompt', description: '支持多语种，自动同步到生成页。' },
        { title: '设置积分', description: '输入积分数，实时同步到 pricing/billing。' },
        { title: '发布', description: '保存后立即出现在特效聚合页和切换弹窗。' },
      ],
      media:
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
    },
  ],
};
