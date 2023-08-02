/**
 * NOTE: This is a workaround to be able to use Hydrogen-provided Provider components
 * as Client Components in a app. We should revisit this and make the bundler smarter.
 */
import {CartUIProvider} from '@shopify/hydrogen/client';

export default CartUIProvider;
