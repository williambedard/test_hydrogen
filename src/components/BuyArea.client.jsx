// @ts-check
import {
  Money,
  Link,
  Image,
  AddToCartButton,
  useProductOptions,
} from '@shopify/hydrogen/client';

export default function BuyArea({product}) {
  const {
    variants,
    options,
    selectedVariant,
    setSelectedOption,
  } = useProductOptions({
    variants: product.variants,
    initialVariantId: product.variants.edges[0].node.id,
  });

  const mainImage = selectedVariant
    ? selectedVariant.image
    : variants[0]?.image;

  const price = selectedVariant
    ? selectedVariant.priceV2
    : variants[0]?.priceV2;

  const compareAtPrice = selectedVariant
    ? selectedVariant.compareAtPriceV2
    : variants[0].compareAtPriceV2;

  return (
    <div className="bg-white md:rounded-lg md:border md:border-gray-200 md:p-8 md:grid md:grid-cols-2 md:gap-8">
      <header className="md:hidden mb-auto flex justify-between items-top p-4 pt-8">
        <h3 className="text-gray-900 font-semibold text-xl">{product.title}</h3>
        <div className="text-lg">
          {price && <Money money={price} />}
          {compareAtPrice && (
            <Money
              money={compareAtPrice}
              className="text-gray-400 line-through"
            />
          )}
        </div>
      </header>
      <Link to={`/products/${product.handle}`}>
        <Image
          image={mainImage}
          className="h-full w-full md:h-96 md:w-96 object-cover md:rounded-sm bg-gray-100"
        />
      </Link>
      <div className="md:flex md:flex-col md:justify-between p-4 md:p-0">
        <header className="hidden md:block mb-auto">
          <Link to={`/products/${product.handle}`}>
            <h3 className="text-gray-900 font-semibold text-3xl mb-8">
              {product.title}
            </h3>
          </Link>
          <div className="flex items-center space-x-2 text-xl">
            {price && <Money money={price} className="font-bold" />}
            {compareAtPrice && (
              <Money
                money={compareAtPrice}
                className="text-gray-400 line-through"
              />
            )}
          </div>
        </header>
        <div className="mt-0 mb-8 md:my-8">
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
        <footer>
          <AddToCartButton
            selectedVariant={selectedVariant}
            variantID={selectedVariant?.id ?? ''}
            quantity={1}
            className="bg-black rounded text-white w-full p-4 uppercase"
            disabled={!selectedVariant}
          >
            Add to cart
          </AddToCartButton>
        </footer>
      </div>
    </div>
  );
}
