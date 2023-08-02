import {
  ShopifyProvider,
  DefaultRoutes,
  ServerFetchProvider,
} from '@shopify/hydrogen';
import CartUIProvider from './components/CartUIProvider.client';
import {Switch} from 'react-router-dom';
import shopifyConfig from '../shopify.config';
import './index.css';
import Seo from './components/Seo.server';
import NotFound from './components/NotFound.server';

export default function App({manager, ...serverState}) {
  const pages = import.meta.globEager('./pages/**/*.server.(jsx|tsx)');

  return (
    <ShopifyProvider shopifyConfig={shopifyConfig}>
      <ServerFetchProvider manager={manager}>
        <Seo />
        <CartUIProvider>
          <Switch>
            <DefaultRoutes
              pages={pages}
              serverState={serverState}
              fallback={<NotFound />}
            />
          </Switch>
        </CartUIProvider>
      </ServerFetchProvider>
    </ShopifyProvider>
  );
}
