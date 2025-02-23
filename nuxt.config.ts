// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/icon", "@vueuse/nuxt"],
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Source+Serif+4:opsz@8..60&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700;9..40,800&family=Inter:wght@400;500;600;700&family=Noto+Sans:wght@400;600;700&family=Poppins:wght@400;500;600;700;900&family=Raleway:wght@400;800&family=Rubik:wght@400;500;700;800&display=swap",
        },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
      ],
    },
  },
  css: ["@/assets/css/main.less"],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import './assets/css/theme.less';`,
        },
      },
    },
  },
  runtimeConfig: {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    public: {
      SUPABASE_URL: "https://jyqgjotvulqukidtwivg.supabase.co", // Exposed to the frontend as well.
      SUPABASE_KEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cWdqb3R2dWxxdWtpZHR3aXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNzM4NDMsImV4cCI6MjA1NTg0OTg0M30.nYCyaFtBjG1hBZU9YMES8nQteb8IMbN1lFwVnagEXmE",
    },
  },
});
