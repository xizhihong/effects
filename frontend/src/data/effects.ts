import type { Effect, Generation, Template } from '../types/content'

export const effectsCatalog: Effect[] = [
  {
    slug: 'ai-hug-generator',
    name: 'AI Hug Generator',
    tagline: 'Blend two portraits into an emotive hug animation.',
    description:
      'Upload up to three portraits and the AI Hug Generator will stitch them into a cinematic embrace with subtle cloth dynamics and volumetric light.',
    thumbnail:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-a-loving-couple-4682/1080p.mp4',
    categories: ['Cinematic', 'People'],
    difficulty: 'Starter',
    processingTime: '38s avg',
    creditsCost: 4,
  },
  {
    slug: 'ai-kissing-video-generator',
    name: 'AI Kissing Video Generator',
    tagline: 'Story-driven kissing shots with tasteful camera motion.',
    description:
      'Select camera styles, upload references, and let the generator craft elegant transitions inspired by romance films.',
    thumbnail:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1524504388940-0f21a7a1a19c?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-love-in-the-city-0208/1080p.mp4',
    categories: ['Romance', 'People'],
    difficulty: 'Creator',
    processingTime: '44s avg',
    creditsCost: 6,
  },
  {
    slug: 'focus-change-transitions',
    name: 'Focus Change Transitions',
    tagline: 'Rack-focus magic for reels and travel edits.',
    description:
      'Blend two footage sources using depth-aware rack focus to spotlight key subjects mid-shot.',
    thumbnail:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-focus-on-the-lens-4753/1080p.mp4',
    categories: ['Creator', 'Transition'],
    difficulty: 'Starter',
    processingTime: '22s avg',
    creditsCost: 3,
  },
  {
    slug: 'neon-portal-builder',
    name: 'Neon Portal Builder',
    tagline: 'Summon glowing portals that respond to beats.',
    description:
      'Perfect for music videos—drop assets into the portal builder and export chroma-ready passes.',
    thumbnail:
      'https://images.unsplash.com/photo-1482192597420-4817fdd7e8b0?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-lights-of-the-city-9339/1080p.mp4',
    categories: ['Sci-Fi', 'Concert'],
    difficulty: 'Pro',
    processingTime: '58s avg',
    creditsCost: 9,
  },
  {
    slug: 'dynamic-clone-multiplier',
    name: 'Dynamic Clone Multiplier',
    tagline: 'Multiply performers with motion-aware masking.',
    description:
      'Upload a single acting take and replicate it across the scene with automatic occlusion handling.',
    thumbnail:
      'https://images.unsplash.com/photo-1475724017904-b712052c192a?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-dancing-with-a-shadow-9404/1080p.mp4',
    categories: ['Experiment', 'Music Video'],
    difficulty: 'Creator',
    processingTime: '41s avg',
    creditsCost: 7,
  },
  {
    slug: 'dream-lens-glow',
    name: 'Dream Lens Glow',
    tagline: 'Soft bloom, anamorphic streaks, tactile grain.',
    description:
      'A finishing effect inspired by 35mm film labs. Ideal for campaign hero shots and product glamour loops.',
    thumbnail:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-night-drive-8944/1080p.mp4',
    categories: ['Product', 'Finishing'],
    difficulty: 'Starter',
    processingTime: '12s avg',
    creditsCost: 2,
  },
  {
    slug: 'celestial-bloom',
    name: 'Celestial Bloom',
    tagline: 'Transform simple footage into cosmic botanicals.',
    description:
      'Procedurally grow luminous petals, aurora trails, and particle botanicals from motion cues.',
    thumbnail:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-flowers-4747/1080p.mp4',
    categories: ['Beauty', 'Fantasy'],
    difficulty: 'Creator',
    processingTime: '33s avg',
    creditsCost: 5,
  },
  {
    slug: 'sonic-beat-trails',
    name: 'Sonic Beat Trails',
    tagline: 'Audio-reactive streaks that pulse with BPM detection.',
    description:
      'Upload a track and get ready-to-drop beat trails for festival recaps or TikTok drops.',
    thumbnail:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
    cover:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    videoDemo: 'https://cdn.coverr.co/videos/coverr-dj-mixing-3134/1080p.mp4',
    categories: ['Concert', 'Motion'],
    difficulty: 'Pro',
    processingTime: '47s avg',
    creditsCost: 8,
  },
]

export const highlightedEffects = effectsCatalog.slice(0, 4)

export const demoGenerations: Generation[] = [
  {
    id: 'gen-101',
    title: 'Midnight Rooftop Hug',
    effectSlug: 'ai-hug-generator',
    preview: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    createdAt: '2025-11-10T10:14:00Z',
    status: 'Ready',
  },
  {
    id: 'gen-102',
    title: 'Firefly Portal Loop',
    effectSlug: 'neon-portal-builder',
    preview: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80',
    createdAt: '2025-11-09T08:42:00Z',
    status: 'Ready',
  },
  {
    id: 'gen-103',
    title: 'Dream Lens Product',
    effectSlug: 'dream-lens-glow',
    preview: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    createdAt: '2025-11-08T21:05:00Z',
    status: 'Rendering',
  },
  {
    id: 'gen-104',
    title: 'Clone Alley Run',
    effectSlug: 'dynamic-clone-multiplier',
    preview: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    createdAt: '2025-11-08T18:55:00Z',
    status: 'Ready',
  },
]

export const templateLibrary: Template[] = effectsCatalog.map((effect, index) => ({
  id: `tpl-${index + 1}`,
  name: effect.name,
  model: index % 2 === 0 ? 'Flux Fusion XL' : 'Vivid Motion S',
  previewImage: effect.thumbnail,
  previewVideo: effect.videoDemo,
  prompt: `Create ${effect.name} with ${effect.tagline.toLowerCase()}`,
  creditsCost: effect.creditsCost,
}))
