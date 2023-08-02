import {
  CartUIProvider,
  CartContainer,
  useCartUI,
} from '@shopify/hydrogen/client';

import Header from './Header.client';
import Footer from './Footer';
import Cart from './Cart.client';

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
      <div className="min-h-screen max-w-screen text-gray-700">
        <Header />
        {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
        <div>
          <div
            className={`z-50 fixed top-0 bottom-0 left-0 right-0 bg-black transition-opacity duration-400 ${
              isCartOpen ? 'opacity-20' : 'opacity-0 pointer-events-none'
            }`}
            onClick={isCartOpen ? closeCart : null}
          />
          <CartContainer
            id="cart"
            className={`pointer-events-none z-50 fixed right-0 top-0 bottom-0 md:p-5 flex flex-col w-full max-w-md min-w-sm transition-transform duration-500 transform-gpu ${
              isCartOpen ? 'right-0' : 'translate-x-full'
            }`}
          >
            <Cart />
          </CartContainer>
        </div>
        <main
          id="mainContent"
          className="mx-auto max-w-7xl p-4 md:py-5 md:px-8"
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
