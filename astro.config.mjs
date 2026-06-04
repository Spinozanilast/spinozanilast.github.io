import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

export default defineConfig({
    site: "https://spinozanilast.github.io",
    base: "/",

    integrations: [
        icon({
            iconDir: "src/assets/icons",
        }),
    ],

    vite: {
        plugins: [tailwindcss()],
    },
});
