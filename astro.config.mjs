import { defineConfig, fontProviders } from "astro/config";
import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://spinozanilast.github.io",
  base: "/",
  markdown: {
    processor: satteri({
      hastPlugins: [satteriHeadingIdsPlugin()],
    }),
    shikiConfig: {
      theme: "css-variables",
    },
  },
  integrations: [
    react(),
    icon({
      iconDir: "src/assets/icons",
    }),
    mdx(),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      https: {
        key: "./localhost-key.pem",
        cert: "./localhost.pem",
      },
    },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "DepartureMono",
      cssVariable: "--font-departure-mono",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/DepartureMono.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Extrude",
      cssVariable: "--font-extrude",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Extrude.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "PixelifySans",
      cssVariable: "--font-pixelify-sans",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            weight: "400 700",
            style: "normal",
            src: ["./src/assets/fonts/PixelifySans.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Manrope",
      cssVariable: "--font-manrope",
      fallbacks: ["sans-serif"],
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Manrope.woff2"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Boldonse",
      cssVariable: "--font-boldonse",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            weight: "400",
            style: "normal",
            src: ["./src/assets/fonts/Boldonse.woff2"],
          },
        ],
      },
    },
  ],
});
