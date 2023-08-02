import {Link, CartToggle} from '@shopify/hydrogen/client';
import {CartIcon} from './Cart.client';

export default function Header() {
  return (
    <>
      <header
        className="bg-white border-b border-gray-300 border-solid h-20 flex items-center"
        role="banner"
      >
        <div className="md:px-4 flex items-center justify-between max-w-7xl mx-auto flex-grow text-gray-500">
          <CartToggle className="md:hidden p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </CartToggle>
          <nav>
            <ul className="hidden md:flex items-center justify-center space-x-4 font-medium">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/" className="flex items-center justify-center">
                  Collections
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
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
            className="text-center font-medium uppercase text-2xl tracking-widest absolute left-1/2 transform -translate-x-1/2"
            to="/"
          >
            Custom Store
          </Link>
          <div className="flex space-x-2 items-center">
            <CartToggle className="h-12 w-12 p-2 mr-2 md:mr-0 md:h-7 md:w-7 md:p-0">
              <CartIcon />
            </CartToggle>
          </div>
        </div>
      </header>
    </>
  );
}
