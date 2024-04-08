// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icons"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "nerdy-cards",
      meta: [
        { name: "description", content: "It's helps you to learn anything" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
});
