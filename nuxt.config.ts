// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@prisma/nuxt",
  ],
  devtools: {
    enabled: true,
  },
  css: ["~/assets/css/main.css"],
  nitro: {
    externals: {
      inline: ["@prisma/client"],
    },
  },
})
