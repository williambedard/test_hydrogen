import {
  useShopQuery,
  MediaFile,
  RTEText,
  AddToCart,
  useProductOptions,
  Money,
  useCountry,
} from '@shopify/hydrogen';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../../components/Layout';
import MediaPlaceholder from '../../components/MediaPlaceholder';
import {useCartContext} from '../../components/CartContext';

export default function Product() {
  const {handle} = useParams();
  const [country] = useCountry();

  const {data, fetching} = useShopQuery({
    query: QUERY,
    variables: {handle, country},
  });

  if (fetching) return <h1>Loading...</h1>;

  return <ProductDetails data={data} />;
}

function ProductDetails({data}) {
  const {
    options,
    selectedVariant,
    selectedOptions,
    setSelectedOption,
    isOptionInStock,
  } = useProductOptions({
    variants: data.product.variants,
    initialVariantId: data.product.variants.edges[0].node.id,
  });
  const {setCartOpen} = useCartContext();
  const product = data.product;
  const media = data.product.media.edges;
  const displayMedia = [...media, ...new Array(6 - media.length)];

  return (
    <Layout>
      <div className="py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="p-4 md:hidden flex justify-between items-top">
          <h1 className="font-bold text-xl mb-2">{product.title}</h1>
          <div className="flex items-center text-xl space-x-1">
            {selectedVariant.priceV2 && (
              <Money money={selectedVariant?.priceV2} />
            )}
            {selectedVariant?.compareAtPrice && (
              <Money
                className="line-through text-gray-400"
                money={selectedVariant?.compareAtPrice}
              />
            )}
          </div>
        </div>
        <div className="lg:col-span-2">
          <ul className="grid lg:grid-cols-2 gap-x-12 gap-y-12 grid-rows-3 ">
            {displayMedia.map((image, idx) => {
              if (!image) {
                return (
                  <div key={idx} className="h-96 w-96 max-w-full">
                    <MediaPlaceholder text="Upload product media in the admin" />
                  </div>
                );
              }
              return (
                <li key={idx}>
                  <MediaFile
                    className="w-full h-96 bg-white rounded-md object-contain object-center"
                    media={image.node}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="p-4 max-w-md">
          <div className="hidden md:block">
            <h1 className="font-bold text-3xl mb-2">{product.title}</h1>
            <div className="flex items-center text-xl space-x-1 mb-8">
              {selectedVariant.priceV2 && (
                <Money
                  className="font-semibold"
                  money={selectedVariant?.priceV2}
                />
              )}
              {selectedVariant?.compareAtPrice && (
                <Money
                  className="line-through text-gray-400"
                  money={selectedVariant?.compareAtPrice}
                />
              )}
            </div>
          </div>
          {product.variants.edges.length > 1 && (
            <div className="mb-8">
              {options.map(({name, values}) => {
                return (
                  <fieldset key={name} className="mb-8">
                    <legend className="mb-2 text-xl font-semibold">
                      Select {name.toLowerCase()}
                    </legend>
                    <div className="flex items-center flex-wrap">
                      {values.map((value) => {
                        const checked = selectedOptions[name] === value;
                        const id = `option[${name}][${value}]`;

                        return (
                          <label key={id} htmlFor={id}>
                            <input
                              className="sr-only"
                              type="radio"
                              id={id}
                              name={`option[${name}]`}
                              value={value}
                              checked={checked}
                              onChange={() => setSelectedOption(name, value)}
                            />
                            <span
                              className={`p-2 border text-lg rounded cursor-pointer whitespace-nowrap block mr-4 mb-4 ${
                                checked
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-900'
                              } ${
                                isOptionInStock(name, value)
                                  ? 'border-gray-300'
                                  : 'border-gray-200 text-gray-300'
                              }`}
                            >
                              {value}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                );
              })}
            </div>
          )}

          <AddToCart
            selectedVariant={selectedVariant}
            variantID={selectedVariant.id}
            quantity={1}
            className={`block w-full text-white p-3 rounded mb-8 uppercase text-lg ${
              selectedVariant ? 'bg-black hover:bg-gray-800' : 'bg-gray-300'
            }`}
            disabled={!selectedVariant}
            onAdd={() => {
              setCartOpen(true);
            }}
          >
            Add to Cart
          </AddToCart>

          <ul className="md:border-solid md:border-t md:border-gray-300 mt-4">
            <li className="md:border-b md:border-solid border-gray-300 py-8">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <RTEText
                className="space-y-2 prose"
                text={product.body}
              ></RTEText>
            </li>
            <li className="md:border-b md:border-solid md:border-gray-300 py-8">
              <h2 className="text-xl font-semibold mb-4">Fabric and Sizing</h2>
              <RTEText className="space-y-2 prose" text="Hello world"></RTEText>
            </li>
            <li className="md:border-b md:border-solid md:border-gray-300 py-8">
              <h2 className="text-xl font-semibold mb-4">
                Shipping and Returns
              </h2>
              <RTEText className="space-y-2 prose" text="Hello world"></RTEText>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

const QUERY = `#graphql
  ${MediaFile.Fragment}

  query product($handle: String!, $country: CountryCode!) @inContext(country: $country) {
    product: productByHandle(handle: $handle) {
      id
      title
      vendor
      body: descriptionHtml
      options {
        id
        name
        values
      }
      variants(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            availableForSale
            image {
              ...ImageFragment
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
      media(first: 6) {
        edges {
          node {
            ...MediaFileFragment
          }
        }
      }
      collections(first: 5) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  }
`;
