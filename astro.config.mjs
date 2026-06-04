import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: "https://spinozanilast.github.io",
    base: "/personal",

    integrations: [],

    vite: {
        plugins: [tailwindcss()],
    },
});
