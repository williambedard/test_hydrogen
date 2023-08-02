import {Link, CartToggle} from '@shopify/hydrogen/client';
import {CartIcon} from './Cart.client';
import VibrantView from './VibrantView.client';

export default function Header() {
  return (
    <>
      <VibrantView>
        <header
          className="flex items-center justify-between pt-3 md:pt-12 md:pb-4 md:px-8 max-w-7xl mx-auto"
          role="banner"
        >
          <CartToggle className="md:hidden p-4 mix-blend-overlay z-40 relative">
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
            <ul className="hidden md:flex items-center justify-center space-x-6 font-medium text-black mix-blend-overlay z-40 relative">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/" className="flex items-center justify-center">
                  Collections
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
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
            className="text-center font-medium uppercase text-2xl tracking-widest absolute left-1/2 transform -translate-x-1/2 text-blackrew text-white mix-blend-overlay z-40"
            to="/"
          >
            Snowdevil
          </Link>
          <div className="flex space-x-2 items-center">
            <CartToggle className="h-12 w-12 p-2 mr-2 md:mr-0 md:h-7 md:w-7 md:p-0 mix-blend-overlay z-10">
              <CartIcon />
            </CartToggle>
          </div>
        </header>
      </VibrantView>
    </>
  );
}
