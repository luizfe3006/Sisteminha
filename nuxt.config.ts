// https://nuxt.com/docs/api/configuration/nuxt-config
import ptLocale from './locales/pt';

export default defineNuxtConfig({
  nitro: {
    preset: 'static'
  },
  ssr: false,
  app: {
    head: {
      title: 'Ticto',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.BACKEND_PUBLIC_API_BASE || '/api',
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-primevue',
    '@vee-validate/nuxt',
    // '@nuxtjs/eslint-module',
  ],
  primevue: {
    options: {
      locale: ptLocale,
      ripple: false, // Desativa o efeito ripple globalmente
    },
    components: {
      prefix: 'Prime',
      include: '*',
      exclude: ["Editor"],
    },
    cssLayerOrder: 'style, tailwind-base, primevue, tailwind-utilities',
  },
  tailwindcss: {
    cssPath: '@/assets/css/tailwind.css',
  },
  css: [
    '@/assets/css/style.css',
    '@/assets/css/menu.css',
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primeicons/primeicons.css',
  ],
  imports: {
    dirs: [
      'composables',
      'composables/**',
    ],
  },
});
