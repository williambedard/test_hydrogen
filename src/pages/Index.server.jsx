import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import HighlightedProduct from '../components/HightlightedProduct.client';
import Layout from '../components/Layout.client';
import ProductCard from '../components/ProductCard.client';

export default function Index() {
  const {data} = useShopQuery({
    query: QUERY,
  });

  const products = data ? flattenConnection(data.products) : [];

  return (
    <Layout>
      <div className="z-0 gradient w-screen h-screen top-0 left-0 right-0 fixed" />
      <div className="z-5 relative space-y-16">
        <section className="md:px-4 pt-10 pb-4">
          <HydrogenGettingStarted />
        </section>

        <section className="space-y-6 md:space-y-0 md:grid grid-cols-3 gap-10">
          <div>
            <CommerceReadyComponents />
          </div>
          <div className="col-span-2 md:flex shadow-xl p-4 md:p-6 rounded-md bg-white">
            <HighlightedProduct product={products[0]} />
          </div>
        </section>

        <section className="space-y-6 md:space-y-0 md:grid grid-cols-3 gap-10 flex flex-col-reverse flex-col">
          <div className="col-span-2 md:flex shadow-xl p-4 md:p-6 rounded-md space-y-6 md:space-y-0 md:space-x-6 bg-white">
            {[products[1], products[2]].map((product) => {
              return (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
          <div>
            <StyleWithTailwind />
          </div>
        </section>
      </div>
    </Layout>
  );
}

function HydrogenGettingStarted() {
  const links = [
    {
      text: 'Browse Hydrogen documentation',
      url: 'https://shopify.dev/beta/hydrogen/',
    },
    {
      text: 'Open the GraphiQL editor',
      url: '/graphiql',
    },
    {
      text: 'Explore starter templates',
      url: '/',
    },
  ];

  return (
    <>
      <h2 className="text-4xl md:text-7xl font-extrabold text-center">
        Hello, Hydrogen
      </h2>

      <p className="text-xl text-center mt-4 mb-8">
        Welcome to your custom storefront. Let‘s get building.
      </p>

      <ul className="md:flex justify-center gap-5 space-y-4 md:space-y-0">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              className="rounded-full bg-white px-4 py-2 bg-opacity-80 flex items-center gap-2"
            >
              {link.text}
              <svg
                width="7"
                height="13"
                viewBox="0 0 7 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L6 6.5L1 11.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

function CommerceReadyComponents() {
  return (
    <>
      <h2 className="font-bold text-3xl">Commerce-ready components</h2>
      <p className="text-xl leading-8 mt-2 mb-4">
        Hydrogen includes the most common components for commerce, powered by
        your Shopify custom storefront. They&apos;re accessible, performant, and
        ready for implementation.
      </p>
      <a
        className="text-blue-500 text-xl flex items-center gap-1"
        href="https://shopify.dev/beta/hydrogen/"
      >
        Browse components
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </>
  );
}

function StyleWithTailwind() {
  return (
    <>
      <h2 className="font-bold text-3xl">
        Style with Tailwind or roll your own
      </h2>
      <p className="text-xl leading-8 mt-2 mb-4">
        Hydrogen starter templates are styled using the flexible{' '}
        <a className="text-blue-500" href="https://www.tailwindcss.com">
          Tailwind CSS
        </a>{' '}
        framework. Start building with Tailwind&apos;s library or choose your
        own styling - it&apos;s up to you.
      </p>
    </>
  );
}

const QUERY = gql`
  query indexContent {
    products(first: 3) {
      edges {
        node {
          ...ProductProviderFragment
        }
      }
    }
    collections(first: 3) {
      edges {
        node {
          id
          title
          handle
          image {
            originalSrc
            altText
          }
        }
      }
    }
  }

  ${ProductProviderFragment}
`;
