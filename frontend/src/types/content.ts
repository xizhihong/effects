export interface Effect {
  slug: string
  name: string
  tagline: string
  description: string
  thumbnail: string
  cover: string
  videoDemo: string
  categories: string[]
  difficulty: 'Starter' | 'Creator' | 'Pro'
  processingTime: string
  creditsCost: number
}

export type SectionLayout = 'stacked' | 'split' | 'gallery' | 'steps'

export interface MarketingSection {
  id: string
  layout: SectionLayout
  eyebrow: string
  title: string
  description: string
  media: {
    type: 'image' | 'video'
    src: string
    alt: string
  }
  cta?: {
    label: string
    href: string
  }
  highlights?: Array<{
    title: string
    description: string
    icon?: string
  }>
  grid?: Array<{
    title: string
    image: string
    badges: string[]
  }>
  steps?: Array<{
    title: string
    description: string
    badge?: string
  }>
}

export interface Generation {
  id: string
  title: string
  effectSlug: string
  preview: string
  createdAt: string
  status: 'Ready' | 'Rendering' | 'Failed'
}

export interface Template {
  id: string
  name: string
  model: string
  previewImage: string
  previewVideo: string
  prompt: string
  creditsCost: number
}
