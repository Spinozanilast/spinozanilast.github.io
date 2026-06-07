import { defineConfig } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default defineConfig(eslintPluginAstro.configs.recommended, tseslint.configs.recommended);
