import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import Layout from '../components/Layout.client';
import ProductCard from '../components/ProductCard.client';
import gql from 'graphql-tag';

export default function Index() {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      handle: 'frontpage',
    },
  });

  const products = data ? flattenConnection(data.products) : [];

  return (
    <Layout>
      <div className="relative text-white">
        <HydrogenGettingStarted />
        <section className="my-8 grid grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </Layout>
  );
}

function HydrogenGettingStarted() {
  const links = [
    {
      text: 'Browse Hydrogen documentation',
      url: '/',
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
    <section className="my-8 px-4 pt-10 pb-4">
      <h2 className="text-7xl mb-4 font-semibold tracking-tight">
        Hello, Hydrogen
      </h2>

      <p className="text-xl max-w-prose z-10 mix-blend-overlay">
        Welcome to your custom storefront.
      </p>
      <p className="text-xl max-w-prose mb-8 z-10 mix-blend-overlay">
        Let‘s get building.
      </p>

      <ul className="flex gap-5">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              className="rounded-full bg-black px-4 py-2 bg-opacity-25 backdrop-saturate-200 backdrop-filter font-medium flex items-center gap-2"
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
                  opacity="0.5"
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
    </section>
  );
}

const QUERY = gql`
  query indexContent {
    products(first: 5) {
      edges {
        node {
          id
          title
          handle
          variants(first: 3) {
            edges {
              node {
                id
                title
                image {
                  originalSrc
                }
                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
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
`;
