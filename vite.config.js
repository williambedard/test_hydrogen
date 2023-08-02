import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import hydrogen from '@shopify/h2-internal/plugin';
import shopifyConfig from './shopify.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hydrogen(shopifyConfig), reactRefresh()],

  // TODO: Remove when Hydrogen is released publicly.
  resolve: {
    alias: {
      '@shopify/hydrogen': '@shopify/h2-internal',
    },
  },

  // TODO: Move this to be a @shopify/hydrogen default
  esbuild: {
    // Automatically inject each JSX file with this line, similar to Next.js
    // Also makes SSR work.
    jsxInject: `import React from 'react';`,
  },

  build: {
    sourcemap: true,
  },

  // TODO: Move this to the @shopify/hydrogen plugin
  ssr: {
    external: ['isomorphic-dompurify'],
    target: process.env.WORKER ? 'webworker' : 'node',

    /**
     * These tell Vite to bundle these dependencies of @shopify/hydrogen in the file
     * rather than require() them. It seems odd that we have to do this.
     * TODO: Determine if this is a bug and file it.
     */
    noExternal: process.env.WORKER
      ? [
          'react',
          'urql',
          'react-router-dom',
          '@google-pay/button-react',
          'react-dom',
          'react-ssr-prepass',
        ]
      : [],
  },

  // TODO: Move this to the @shopify/hydrogen plugin
  optimizeDeps: {
    /**
     * We think there's a bug in Vite due to the nature of linking a package `@shopify/hydrogen`
     * as a relative filepath. When running in dev mode in the monorepo, `urql.es.js` is used.
     * But when running using the local dev templated version, `urql.js` is used. This causes a
     * strange `i is undefined` error. TODO: Revisit this and/or file bug with Vite.
     */
    include: ['urql'],
  },
});
