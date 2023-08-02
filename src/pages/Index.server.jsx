import {useShopQuery, flattenConnection} from '@shopify/hydrogen';
import Layout from '../components/Layout.client';
import ProductCard from '../components/ProductCard.client';
import BuyArea from '../components/BuyArea.client';

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
      <section className="my-8 px-4 pt-0 pb-14 border-b border-gray-300">
        <h2 className="text-4xl text-center text-gray-700 mb-4 font-extrabold tracking-light">
          Hello, H<sub>2</sub>
        </h2>

        <p className="text-xl text-gray-500 max-w-prose text-center mx-auto">
          Congratulations! Your headless storefront is now up and running.
        </p>
        <p className="text-xl text-gray-500 max-w-prose text-center mx-auto mb-8">
          Next, dive into the docs and get building.
        </p>

        <H2Links />
      </section>

      <section className="my-8 md:my-14">
        <div className="md:grid md:grid-cols-3 md:grid-rows-1 md:gap-8">
          <div className="p-8 md:p-0">
            <h2 className="text-gray-700 text-3xl font-bold mb-4">
              Commerce ready components{' '}
            </h2>
            <p className="text-xl text-gray-500 mb-1">
              Project H2 includes some of the most common components for
              commerce, powered by your Shopify store. These components are
              fully compliant, performant, and ready for implementation.
            </p>
            <a className="text-xl text-blue-600" href="/">
              Get the code {'>'}
            </a>
          </div>
          <div className="md:col-span-2">
            {products ? <BuyArea product={products[0]} /> : null}
          </div>
        </div>
      </section>

      <section className="my-8 md:my-14">
        <div className="md:grid md:grid-cols-3 md:grid-rows-1 md:gap-8">
          <div className="p-8 pt-0 md:p-0 md:col-start-3">
            <h2 className="text-gray-700 text-3xl font-bold mb-4">
              Style with Tailwind, or roll your own…
            </h2>
            <p className="text-xl text-gray-500 mb-1">
              Our Project H2 starter templates are styled on the popular and
              flexible,{' '}
              <a
                className="text-xl text-blue-600"
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noreferrer"
              >
                Tailwind CSS
              </a>
              . Keep building with Tailwind’s library, or roll your own
              framework. The choice is yours.
            </p>
          </div>
          <div className="md:bg-white md:rounded-lg md:border md:border-solid md:border-gray-200 md:p-8 md:grid md:grid-cols-2 md:gap-8 md:col-span-2 md:row-start-1 md:col-start-0 md-col-end-2">
            {products
              ? products
                  .slice(1, 3)
                  .map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
              : null}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function H2Links() {
  const links = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      text: 'Browse LINK',
      link: {
        text: 'H2 documentation',
        href: '/',
      },
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z"
            clipRule="evenodd"
          />
        </svg>
      ),
      text: 'Get hacking with LINK',
      link: {
        text: 'GraphiQL editor',
        href: '/graphiql',
      },
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      text: 'Expore the LINK',
      link: {
        text: 'starter template',
        href: '/',
      },
    },
  ];

  return (
    <ul className="text-gray-500 text-md md:text-xl grid md:grid-cols-3 gap-4 md:gap-16">
      {links.map(({icon, text, link}) => {
        const linkMarkup = `<a class="text-blue-600" href=${link.href}>${link.text}</a>`;

        return (
          <li
            key={link.text}
            className="space-x-2 flex items-center justify-center"
          >
            {icon}
            <span
              dangerouslySetInnerHTML={{
                __html: text.replace('LINK', linkMarkup),
              }}
            ></span>
          </li>
        );
      })}
    </ul>
  );
}

const QUERY = `#graphql
  query indexContent {
    products(first: 3) {
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
