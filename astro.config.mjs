// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), 
    sitemap(
      {
        changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date(),
      entryLimit: 1000,

      }
    )
  ]
});