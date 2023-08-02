import handleEvent from '@shopify/hydrogen/worker';
import entrypoint from './src/entry-server.jsx';
// eslint-disable-next-line node/no-missing-import
import indexHtml from './dist/client/index.html?raw';
import shopifyConfig from './shopify.config';

addEventListener('fetch', (event) => {
  try {
    event.respondWith(handleEvent(event, entrypoint, indexHtml, shopifyConfig));
  } catch (error) {
    event.respondWith(
      new Response(error.message || error.toString(), {
        status: 500,
      })
    );
  }
});
