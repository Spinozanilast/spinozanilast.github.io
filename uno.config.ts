import { defineConfig, transformerDirectives, transformerVariantGroup } from "unocss";
import { presetWind4 } from "@unocss/preset-wind4";

export default defineConfig({
  presets: [
    presetWind4({
      preflights: {
        theme: {
          mode: true,
        },
      },
    }),
  ],
  rules: [
    ["text-dm-xs", { fontSize: "11px" }],
    ["text-dm-sm", { fontSize: "22px" }],
    ["text-dm-base", { fontSize: "33px" }],
    ["text-dm-lg", { fontSize: "44px" }],
    ["text-dm-xl", { fontSize: "55px" }],
    ["text-dm-2xl", { fontSize: "66px" }],
    ["text-dm-3xl", { fontSize: "77px" }],
    ["text-dm-4xl", { fontSize: "88px" }],
    ["text-dm-5xl", { fontSize: "99px" }],
    ["text-dm-6xl", { fontSize: "110px" }],
    ["text-dm-7xl", { fontSize: "121px" }],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      "primary-background": "var(--background-color)",
      "section-background": "var(--section-background)",
      "section-secondary": "var(--section-secondary)",
      actions: "var(--actions)",
      "actions-background": "var(--actions-background)",
      "popup-background": "var(--popup-background)",
      "wave-color": "var(--wave-color)",
      "logo-underline": "var(--logo-underline)",
      "logo-stroke": "var(--logo-stroke)",
      "util-icon-color": "var(--util-icon-color)",
      "util-panel-background": "var(--util-panel-background)",
      accent: "var(--accent-color)",
      "contrast-theme-background": "var(--contrast-theme-background)",
      "paper-background": "var(--paper-background)",
      "paper-border": "var(--paper-border)",
      "level-0": "var(--level-0)",
      "level-1": "var(--level-1)",
      "level-2": "var(--level-2)",
      "level-3": "var(--level-3)",
      "level-4": "var(--level-4)",
      "keyboard-push-button-background": "var(--keyboard-push-button-background)",
      foreground: "var(--text-color)",
      "foreground-accent-red": "var(--red-accent-color)",
      "foreground-accent-blue": "var(--blue-accent-color)",
      selection: "var(--selection-color)",
    },
    font: {
      pixelify: "var(--font-pixelify-sans)",
      extrude: "var(--font-extrude)",
      retrogression: "var(--font-retrogression)",
      departuremono: "var(--font-departure-mono)",
    },
  },
});
