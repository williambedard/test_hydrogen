import Header from './Header.client';
import Footer from './Footer';
import Cart from './Cart.client';

import {
  CartContainer,
  CartUIProvider,
  useCartUI,
} from '@shopify/hydrogen/client';

export default function Layout({children}) {
  return (
    <CartUIProvider>
      <InnerLayout>{children}</InnerLayout>
    </CartUIProvider>
  );
}

function InnerLayout({children}) {
  const {isCartOpen, closeCart} = useCartUI();

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
      <div className="min-h-screen max-w-screen bg-gray-50">
        <Header />
        <img
          src="/teal-blue.png"
          className="w-screen absolute z-0 top-0 filter saturate-200 animate-hue"
        />

        <div>
          <div
            className={`z-50 md:fixed md:top-0 md:bottom-0 md:left-0 md:right-0 md:bg-black md:transition-opacity md:duration-400 ${
              isCartOpen ? 'md:opacity-20' : 'md:opacity-0 pointer-events-none'
            }`}
            onClick={isCartOpen ? closeCart : null}
          ></div>
          <CartContainer
            id="cart"
            className={`z-50 fixed right-0 top-5 bottom-0 flex flex-col w-full md:w-1/4 max-w-md min-w-sm transition-transform duration-500 transform-gpu ${
              isCartOpen ? 'right-5' : 'translate-x-full'
            }`}
          >
            <Cart />
          </CartContainer>
        </div>
        <main id="mainContent" className="mx-auto max-w-7xl p-4 z-10">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
