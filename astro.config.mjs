import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
    site: "https://spinozanilast.github.io",
    base: "/",

    markdown: {
        shikiConfig: {
            theme: "css-variables",
        },
    },

    integrations: [
        icon({
            iconDir: "src/assets/icons",
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
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
            name: "Retrogression",
            cssVariable: "--font-retrogression",
            fallbacks: ["sans-serif"],
            options: {
                variants: [
                    {
                        weight: "100 900",
                        style: "normal",
                        src: ["./src/assets/fonts/Retrogression.woff2"],
                    },
                ],
            },
        },
    ],
});
