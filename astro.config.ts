import { loadEnv } from "vite";
import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

const {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
  GISCUS_MAPPING,
  GISCUS_STRICT,
  GISCUS_REACTIONS_ENABLED,
  GISCUS_EMIT_METADATA,
  GISCUS_LANG
} = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
const config = defineConfig({
  site: 'https://l0l.zip',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'l0l.zip',
      openGraph: {
        home: {
          title: 'l0l.zip',
          description: 'A minimalistic theme for Astro.'
        },
        blog: {
          title: 'Blog',
          description: 'News and guides for l0l.zip.'
        },
        projects: {
          title: 'Projects'
        }
      },
      giscus: false
    })
  ],
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    server: {
      allowedHosts: ["l0l.zip"],
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
  }
});

export default config;
