import {ShopifyProvider, DefaultRoutes} from '@shopify/hydrogen';
import {Switch} from 'react-router-dom';
import shopifyConfig from '../shopify.config';
import './index.css';
import CartContext from './components/CartContext';

export default function App() {
  const pages = import.meta.globEager('./pages/**/*.(jsx|tsx)');

  return (
    <div className="bg-gray-100 min-h-screen max-w-screen overflow-y-hidden">
      <ShopifyProvider shopifyConfig={shopifyConfig}>
        <CartContext>
          <Switch>
            <DefaultRoutes pages={pages} />
          </Switch>
        </CartContext>
      </ShopifyProvider>
    </div>
  );
}
