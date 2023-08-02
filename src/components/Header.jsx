import {Link} from '@shopify/hydrogen';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useCartContext} from './CartContext';
import {CartIcon} from './Cart';

export default function Header() {
  const {setCartOpen} = useCartContext();

  return (
    <>
      <header className="bg-white border-b border-gray-300 border-solid h-20 flex items-center">
        <div className="md:px-4 flex items-center justify-between max-w-7xl mx-auto flex-grow text-gray-500">
          <button className="md:hidden p-4">
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
          </button>
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
          <Link
            className="text-center font-medium uppercase text-2xl tracking-widest absolute left-1/2 transform -translate-x-1/2"
            to="/"
          >
            Custom Store
          </Link>
          <div className="flex space-x-2 items-center">
            <nav className="flex space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="h-12 w-12 p-2 mr-2 md:mr-0 md:h-7 md:w-7 md:p-0"
              >
                <CartIcon />
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

function HeaderSearch() {
  const history = useHistory();
  const [query, setQuery] = useState('');

  return (
    <>
      <div className="md:hidden">
        <Link to="/search">Search</Link>
      </div>
      <div className="hidden md:block">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            history.push(`/search?query=${query}`);
          }}
        >
          <label className="sr-only" htmlFor="header-search">
            Search
          </label>
          <input
            type="search"
            className="p-1"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}
