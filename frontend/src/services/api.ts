import axios from 'axios'
import { effectsCatalog, demoGenerations, templateLibrary } from '../data/effects'
import { marketingSections } from '../data/marketing'
import type { Effect, Generation, MarketingSection, Template } from '../types/content'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:9501',
  headers: {
    'Content-Type': 'application/json',
  },
})

const withFallback = async <T>(promise: Promise<T>, fallback: T): Promise<T> => {
  try {
    return await promise
  } catch (error) {
    console.warn('[api:fallback]', error)
    return fallback
  }
}

export const fetchEffects = async (): Promise<Effect[]> => {
  return withFallback(
    api.get<{ data: Effect[] }>('/api/effects').then((res) => res.data.data),
    effectsCatalog,
  )
}

export const fetchEffectBySlug = async (slug: string): Promise<Effect | undefined> => {
  return withFallback(
    api.get<{ data: Effect }>(`/api/effects/${slug}`).then((res) => res.data.data),
    effectsCatalog.find((item) => item.slug === slug),
  )
}

export const fetchMarketingSections = async (): Promise<MarketingSection[]> => {
  return withFallback(
    api.get<{ data: MarketingSection[] }>('/api/marketing-sections').then((res) => res.data.data),
    marketingSections,
  )
}

export const fetchGenerations = async (): Promise<Generation[]> => {
  return withFallback(
    api.get<{ data: Generation[] }>('/api/generations').then((res) => res.data.data),
    demoGenerations,
  )
}

export const fetchTemplates = async (): Promise<Template[]> => {
  return withFallback(
    api.get<{ data: Template[] }>('/api/templates').then((res) => res.data.data),
    templateLibrary,
  )
}

export const requestLogin = async (payload: { email: string; provider?: 'google' | 'email' }) => {
  return withFallback(
    api.post('/api/auth/login', payload).then((res) => res.data),
    {
      token: 'mock-token',
      user: {
        id: 'mock',
        name: 'Motion Director',
        email: payload.email,
        avatar:
          payload.provider === 'google'
            ? 'https://i.pravatar.cc/96?img=13'
            : 'https://api.dicebear.com/7.x/identicon/svg?seed=fx',
        provider: payload.provider ?? 'email',
      },
    },
  )
}

export const requestRegister = async (payload: { email: string }) => {
  return withFallback(
    api.post('/api/auth/register', payload).then((res) => res.data),
    {
      message: 'Mock registration successful',
    },
  )
}
