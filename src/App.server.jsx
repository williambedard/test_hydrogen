import {
  ShopifyProvider,
  DefaultRoutes,
  ServerFetchProvider,
} from '@shopify/hydrogen';
import CartUIProvider from './components/CartUIProvider.client';
import {Switch} from 'react-router-dom';
import shopifyConfig from '../shopify.config';
import './index.css';

export default function App({manager, ...props}) {
  const pages = import.meta.globEager('./pages/**/*.server.(jsx|tsx)');

  return (
    <>
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <div className="bg-gray-100 min-h-screen max-w-screen overflow-y-hidden">
        <ShopifyProvider shopifyConfig={shopifyConfig}>
          <ServerFetchProvider manager={manager}>
            <CartUIProvider>
              <Switch>
                <DefaultRoutes pages={pages} props={props} />
              </Switch>
            </CartUIProvider>
          </ServerFetchProvider>
        </ShopifyProvider>
      </div>
    </>
  );
}
