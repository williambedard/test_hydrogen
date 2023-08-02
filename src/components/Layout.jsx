import Header from './Header';
import Footer from './Footer';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import Cart from './Cart';
import {useCartContext} from './CartContext';

export default function Layout({children}) {
  const {cartOpen, setCartOpen} = useCartContext();

  return (
    <div>
      <ScrollToTop />
      <Header />
      <div>
        <div
          className={`z-50 md:fixed md:top-0 md:bottom-0 md:left-0 md:right-0 md:bg-white md:transition-opacity md:duration-400 ${
            cartOpen ? 'md:opacity-50' : 'md:opacity-0 pointer-events-none'
          }`}
          onClick={
            cartOpen
              ? () => {
                  setCartOpen(false);
                }
              : null
          }
        ></div>
        <aside
          className={`z-50 fixed left-full top-0 bottom-0 flex flex-col shadow-md w-full md:w-1/4 max-w-md min-w-sm transition-transform duration-500 transform ${
            cartOpen ? '-translate-x-full' : ''
          }`}
        >
          <Cart />
        </aside>
      </div>
      <div className="mx-auto max-w-7xl md:p-4">{children}</div>
      <Footer />
    </div>
  );
}

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
