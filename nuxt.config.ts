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
    preset: "vercel",
    externals: {
      inline: ["@prisma/client"],
    },
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js",
        ".prisma/client/default": "./node_modules/.prisma/client/index.js",
      },
    },
  },
  build: {
    transpile: ["@prisma/client"],
  },
})
