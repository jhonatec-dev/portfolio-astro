import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercelServerless from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  devToolbar: {
    enabled: false,
  },
  output: "hybrid",
  adapter: vercelServerless(),
});
