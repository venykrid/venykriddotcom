// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkCallouts from './src/plugins/remark-callouts.mjs';
import shikiIndentGuides from './src/plugins/shiki-indent-guides.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://venykrid.com',
    integrations: [sitemap()],
    markdown: {
        remarkPlugins: [remarkCallouts],
        shikiConfig: {
            themes: {
                light: 'catppuccin-latte',
                dark: 'catppuccin-mocha',
            },
            transformers: [shikiIndentGuides()],
        },
    },
    vite: {
        server: {
            allowedHosts: "gumball",
        }
    }
});
