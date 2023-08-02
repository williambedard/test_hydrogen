import {Link, CartToggle} from '@shopify/hydrogen/client';

import {CartIcon} from './Cart.client';

export default function Header() {
  return (
    <header
      className="z-10 relative flex items-center justify-between pt-3 md:pt-12 md:pb-4 md:px-8 max-w-7xl mx-auto"
      role="banner"
    >
      <nav>
        <ul className="hidden md:flex items-center justify-center space-x-6 font-medium relative">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/" className="flex items-center justify-center">
              Collections
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
      <Link
        className="text-center font-bold uppercase text-2xl tracking-widest absolute left-1/2 transform -translate-x-1/2"
        to="/"
      >
        My Shop
      </Link>
      <CartToggle className="h-12 w-12 p-2 mr-2 md:mr-0 md:h-7 md:w-7 md:p-0">
        <CartIcon />
      </CartToggle>
    </header>
  );
}
