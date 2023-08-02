import Layout from './Layout.client';
import {
  Money,
  RTEText,
  useProductOptions,
  useCartUI,
  AddToCartButton,
} from '@shopify/hydrogen/client';
import ProductMediaGallery from './ProductMediaGallery.client';

export default function ProductDetails({data}) {
  const {options, selectedVariant, setSelectedOption} = useProductOptions({
    variants: data.product.variants,
    initialVariantId: data.product.variants.edges[0].node.id,
  });
  const product = data.product;

  return (
    <Layout>
      <div className="py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <div className="p-4 md:hidden flex justify-between items-top">
          <h1 className="font-bold text-xl mb-2">{product.title}</h1>
          <div className="flex items-center text-xl space-x-1">
            {selectedVariant.priceV2 && (
              <Money money={selectedVariant?.priceV2} />
            )}
            {selectedVariant?.compareAtPriceV2 && (
              <Money
                className="line-through text-gray-400"
                money={selectedVariant?.compareAtPriceV2}
              />
            )}
          </div>
        </div>
        <section className="lg:col-span-2" aria-label="Gallery">
          {product.media && <ProductMediaGallery media={product.media} />}
        </section>
        <section className="p-4 max-w-md" aria-label="Product details">
          <div className="hidden md:block">
            <h1 className="font-bold text-3xl mb-2">{product.title}</h1>
            <div className="flex items-center text-xl space-x-1 mb-8">
              {selectedVariant.priceV2 && (
                <Money
                  className="font-semibold"
                  money={selectedVariant?.priceV2}
                />
              )}
              {selectedVariant?.compareAtPriceV2 && (
                <Money
                  className="line-through text-gray-400"
                  money={selectedVariant?.compareAtPriceV2}
                />
              )}
            </div>
          </div>
          {product.variants.edges.length > 1 && (
            <div className="mb-8">
              {options.map(({name, values}) => {
                return (
                  <div key={name} className="my-6">
                    <label
                      className="text-gray-900 text-xl font-semibold mb-4 block"
                      htmlFor={name}
                    >
                      {name}
                    </label>
                    <select
                      id={name}
                      className="border border-gray-300 text-lg p-2 rounded w-56"
                      onChange={(event) => {
                        setSelectedOption(name, event.target.value);
                      }}
                    >
                      {values.map((value) => {
                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </div>
          )}

          <AddToCartButton
            selectedVariant={selectedVariant}
            variantID={selectedVariant.id}
            quantity={1}
            className={`block w-full text-white p-3 rounded mb-8 uppercase text-lg ${
              selectedVariant ? 'bg-black hover:bg-gray-800' : 'bg-gray-300'
            }`}
            disabled={!selectedVariant}
          >
            Add to Cart
          </AddToCartButton>

          <RTEText className="space-y-2 prose" text={product.body}></RTEText>
        </section>
      </div>
    </Layout>
  );
}
