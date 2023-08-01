// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/supabase'
  ],
  supabase:{
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  }
})
