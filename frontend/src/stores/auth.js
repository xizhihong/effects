import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

const defaultAvatar = (seed = 'default') =>
  `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear`;

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const authMethod = ref(null);

  const isAuthenticated = computed(() => !!user.value);
  const avatar = computed(() => {
    if (!user.value) {
      return defaultAvatar('guest');
    }
    return user.value.avatarUrl || defaultAvatar(user.value.email || 'user');
  });

  const profileName = computed(() => user.value?.name || 'Guest Creator');

  const loginWithEmail = ({ email, name }) => {
    user.value = {
      name: name || email.split('@')[0],
      email,
      avatarUrl: null,
    };
    authMethod.value = 'email';
  };

  const loginWithGoogle = ({ email, name, avatarUrl }) => {
    user.value = {
      name: name || 'Google User',
      email,
      avatarUrl: avatarUrl || `https://unavatar.io/${email}`,
    };
    authMethod.value = 'google';
  };

  const logout = () => {
    user.value = null;
    authMethod.value = null;
  };

  return {
    user,
    authMethod,
    isAuthenticated,
    avatar,
    profileName,
    loginWithEmail,
    loginWithGoogle,
    logout,
  };
});
