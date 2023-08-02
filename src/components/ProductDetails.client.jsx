import {Product} from '@shopify/hydrogen/client';

import Layout from './Layout.client';
import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import Seo from './Seo.client';

export default function ProductDetails({data}) {
  return (
    <Layout>
      <Seo product={data.product} />
      <Product
        product={data.product}
        initialVariantId={data.product.variants.edges[0].node.id}
      >
        <div className="py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="md:hidden pb-4 flex justify-between items-top">
            <Product.Title as="h1" className="font-bold text-2xl" />
            <div className="flex items-center gap-1">
              <Product.SelectedVariant.Price className="text-xl" />
              <Product.SelectedVariant.Price
                priceType="compareAt"
                className="line-through text-gray-400"
              />
            </div>
          </div>

          <section className="lg:col-span-2 grid gap-10" aria-label="Gallery">
            <Gallery />
          </section>

          <section
            className="my-4 md:my-0 max-w-md flex flex-col gap-6"
            aria-label="Product details"
          >
            {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
            <div>
              <Product.Title className="text-gray-900 text-3xl font-medium" />

              <Product.Metafield
                namespace="reviews"
                keyName="rating"
                className="text-yellow-500 text-lg"
              />

              <div className="my-4 gap-1 hidden md:block">
                <Product.SelectedVariant.Price className="font-semibold text-gray-900 text-2xl">
                  {({currencyCode, amount, currencyNarrowSymbol}) => {
                    return (
                      <span>{`${currencyCode} ${currencyNarrowSymbol}${amount}`}</span>
                    );
                  }}
                </Product.SelectedVariant.Price>
                <Product.SelectedVariant.Price
                  priceType="compareAt"
                  className="text-gray-400 line-through text-xl"
                >
                  {({amount, currencyNarrowSymbol}) => {
                    return <span>{`${currencyNarrowSymbol}${amount}`}</span>;
                  }}
                </Product.SelectedVariant.Price>

                <Product.SelectedVariant.UnitPrice className="text-gray-900 text-base">
                  {({
                    currencyCode,
                    amount,
                    currencyNarrowSymbol,
                    referenceUnit,
                  }) => {
                    return (
                      <span>{`${currencyCode} ${currencyNarrowSymbol}${amount}/${referenceUnit}`}</span>
                    );
                  }}
                </Product.SelectedVariant.UnitPrice>

                <Product.SelectedVariant.Metafield
                  namespace="my_fields"
                  keyName="no_tax"
                >
                  {({value}) => {
                    return value ? <span>We pay the tax!</span> : null;
                  }}
                </Product.SelectedVariant.Metafield>
              </div>

              <ProductOptions />

              <div className="my-8 space-y-2">
                <Product.SelectedVariant.AddToCartButton className="rounded-md bg-gray-900 text-white text-center p-4 text-sm uppercase w-full">
                  Add to bag
                </Product.SelectedVariant.AddToCartButton>
                <Product.SelectedVariant.BuyNowButton className="rounded-md bg-white border border-black text-center p-4 text-sm uppercase w-full">
                  Buy it now
                </Product.SelectedVariant.BuyNowButton>
                <Product.SelectedVariant.ShopPayButton className="flex justify-center w-full" />
              </div>

              <ul className="flex gap-2">
                <Product.Metafield
                  namespace="my_fields"
                  keyName="made_in_canada"
                >
                  {({value}) => {
                    return value ? (
                      <li className="uppercase text-xs bg-red-500 text-white text-center font-semibold rounded-full h-20 w-20 flex items-center justify-center p-3">
                        Made in Canada
                      </li>
                    ) : null;
                  }}
                </Product.Metafield>
                <Product.Metafield namespace="my_fields" keyName="flex">
                  {({value}) => {
                    return (
                      <li className="uppercase bg-gray-600 text-white text-center font-semibold rounded-full h-20 w-20 flex flex-col items-center justify-center p-3">
                        <span className="text-xs">Flex</span>
                        <span className="text-4xl">{value}</span>
                      </li>
                    );
                  }}
                </Product.Metafield>
              </ul>

              <Product.Description className="prose" />

              <section className="mt-4">
                <h3 className="text-lg font-semibold">Care Guide</h3>
                <Product.Metafield
                  namespace="descriptors"
                  keyName="care_guide"
                />
              </section>

              <section className="mt-4">
                <h3 className="text-lg font-semibold">Specs</h3>
                <ul>
                  <li>
                    Weight:{' '}
                    <Product.Metafield
                      namespace="my_fields"
                      keyName="product_weight"
                    />
                  </li>
                  <li>
                    Length:{' '}
                    <Product.Metafield namespace="my_fields" keyName="length" />
                  </li>
                  <li>
                    Width:{' '}
                    <Product.Metafield namespace="my_fields" keyName="width" />
                  </li>
                  <li>
                    Manufactured on:{' '}
                    <Product.Metafield
                      namespace="my_fields"
                      keyName="manufacture_date"
                    />
                  </li>
                  <li>
                    Manufactured by:{' '}
                    <Product.Metafield
                      namespace="my_fields"
                      keyName="manufacturer_url"
                    >
                      {({value}) => {
                        return (
                          <a href={value} className="inline-block">
                            <Product.Metafield
                              namespace="my_fields"
                              keyName="manufacturer_name"
                            />
                          </a>
                        );
                      }}
                    </Product.Metafield>
                  </li>
                </ul>
              </section>
            </div>
          </section>
        </div>
      </Product>
    </Layout>
  );
}
