import {defineConfig} from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import hydrogen from '@shopify/hydrogen/plugin';

import shopifyConfig from './shopify.config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [hydrogen(shopifyConfig), reactRefresh()],
});
