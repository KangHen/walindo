// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss'
  ],
  primevue: {
      options: {
          ripple: true,
          inputVariant: 'filled',
          theme: {
              preset: Aura,
              options: {
                  prefix: 'p',
                  darkModeSelector: 'system',
                  cssLayer: false
              }
          }
      }
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ["@types/node"]
      }
    }
  },

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },

  css: [
    'primeicons/primeicons.css',
    '@/assets/css/main.css'
  ],

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
})