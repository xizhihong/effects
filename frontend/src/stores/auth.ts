import { defineStore } from 'pinia'
import { requestLogin, requestRegister } from '../services/api'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  provider: 'google' | 'email'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    user: null as UserProfile | null,
    loading: false,
    error: '',
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.user),
    avatarFallback: (state) =>
      state.user?.avatar ??
      'https://api.dicebear.com/7.x/identicon/svg?seed=fx-default&backgroundColor=c0aede',
  },
  actions: {
    async login(email: string, provider: 'google' | 'email' = 'email') {
      try {
        this.loading = true
        const data = await requestLogin({ email, provider })
        this.token = data.token ?? ''
        this.user = data.user
        this.error = ''
      } catch (error) {
        this.error = 'Unable to login right now.'
      } finally {
        this.loading = false
      }
    },
    async register(email: string) {
      try {
        this.loading = true
        await requestRegister({ email })
        await this.login(email, 'email')
      } catch (error) {
        this.error = 'Unable to register right now.'
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.token = ''
      this.user = null
    },
  },
})
