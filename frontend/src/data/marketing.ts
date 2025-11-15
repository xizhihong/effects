import type { MarketingSection } from '../types/content'

export const marketingSections: MarketingSection[] = [
  {
    id: 'stacked-showcase',
    layout: 'stacked',
    eyebrow: 'Trusted by creative pods worldwide',
    title: 'Launch video effects faster than your inspiration hits',
    description:
      'Pollinate campaigns with AI-ready templates sourced from the pollo.ai style library. Ship same-day edits without touching a node graph.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=80',
      alt: 'Stacked showcase board',
    },
    cta: {
      label: 'Explore all effects',
      href: '/video-effects',
    },
    highlights: [
      {
        title: '35+ realtime FX templates',
        description: 'Curated looks from pollo.ai best-performers & motion studios.',
      },
      {
        title: 'Grid-based previews',
        description: 'Hover to scrub each effect and compare before/after in one glance.',
      },
      {
        title: 'One-click deploy',
        description: 'Send your assets to the generator with brand safe presets.',
      },
    ],
  },
  {
    id: 'split-dual',
    layout: 'split',
    eyebrow: 'Campaign-ready in 3 steps',
    title: 'Direct your effects from a single split canvas',
    description:
      'Left: drop your hero image or reference clip. Right: adjust camera drift, light sweeps, and schedule generation windows for teammates.',
    media: {
      type: 'video',
      src: 'https://cdn.coverr.co/videos/coverr-movements-of-colors-2054/1080p.mp4',
      alt: 'Dual canvas workflow',
    },
    cta: {
      label: 'Jump into the studio',
      href: '/video-effects/studio',
    },
    highlights: [
      {
        title: 'Live direction',
        description: 'Sync adjustments with editors over shared sessions.',
      },
      {
        title: 'Performance overlay',
        description: 'See credit cost and render ETA before you click generate.',
      },
    ],
  },
  {
    id: 'gallery-grid',
    layout: 'gallery',
    eyebrow: 'Effect families inspired by pollo.ai',
    title: 'Preview multiple looks at once',
    description:
      'Tile cinematic stills next to teaser loops to help clients pick their vibe instantly.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
      alt: 'Gallery grid',
    },
    grid: [
      {
        title: 'Cinematic Duos',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
        badges: ['AI Hug', 'AI Kissing'],
      },
      {
        title: 'Momentum FX',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
        badges: ['Clone', 'Beat Trails'],
      },
      {
        title: 'Product Glow',
        image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80',
        badges: ['Dream Lens', 'Celestial Bloom'],
      },
    ],
    cta: {
      label: 'View lookbook',
      href: '/video-effects',
    },
  },
  {
    id: 'four-step-flow',
    layout: 'steps',
    eyebrow: 'Workflow clarity',
    title: 'From upload to downloadable effect in under a minute',
    description:
      'Design teams at pollo.ai-inspired studios follow this same loop for every short-form brief.',
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80',
      alt: 'Workflow overview',
    },
    steps: [
      { title: 'Upload references', description: 'Max 3 JPG/PNG/WebP up to 5 MB each.', badge: '1' },
      { title: 'Select template', description: 'Tap any effect tile or use the quick switcher.', badge: '2' },
      { title: 'Tune motion cues', description: 'Pick camera drift, pacing, and light accents.', badge: '3' },
      { title: 'Generate & share', description: 'Receive HQ mp4 + GIF previews instantly.', badge: '4' },
    ],
    cta: {
      label: 'Start for free',
      href: '#auth',
    },
  },
]
