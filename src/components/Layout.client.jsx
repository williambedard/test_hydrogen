import Header from './Header.client';
import Footer from './Footer';
import Cart from './Cart.client';
import {CartContainer, useCartUI} from '@shopify/hydrogen/client';

export default function Layout({children}) {
  const {isCartOpen, closeCart} = useCartUI();

  return (
    <div>
      <Header />
      <div>
        <div
          className={`z-50 md:fixed md:top-0 md:bottom-0 md:left-0 md:right-0 md:bg-white md:transition-opacity md:duration-400 ${
            isCartOpen ? 'md:opacity-50' : 'md:opacity-0 pointer-events-none'
          }`}
          onClick={isCartOpen ? closeCart : null}
        ></div>
        <CartContainer
          id="cart"
          className={`z-50 fixed left-full top-0 bottom-0 flex flex-col shadow-md w-full md:w-1/4 max-w-md min-w-sm transition-transform duration-500 transform ${
            isCartOpen ? '-translate-x-full' : ''
          }`}
        >
          <Cart />
        </CartContainer>
      </div>
      <main id="mainContent" className="mx-auto max-w-7xl md:p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
