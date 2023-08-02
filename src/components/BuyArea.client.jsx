// @ts-check
import {
  Link,
  ProductProvider,
  ProductTitle,
  SelectedVariantAddToCartButton,
  SelectedVariantPrice,
  SelectedVariantCompareAtPrice,
  SelectedVariantImage,
} from '@shopify/hydrogen/client';
import ProductOptions from '../components/ProductOptions.client';

export default function BuyArea({product}) {
  return (
    <ProductProvider
      product={product}
      initialVariantId={product.variants.edges[0].node.id}
    >
      <div className="bg-white md:rounded-lg md:border md:border-gray-200 md:p-8 md:grid md:grid-cols-2 md:gap-8">
        <header className="md:hidden mb-auto flex justify-between items-top p-4 pt-8">
          <h3 className="text-gray-900 font-semibold text-xl">
            <ProductTitle />
          </h3>
          <div className="text-lg">
            <SelectedVariantPrice />
            <SelectedVariantCompareAtPrice className="text-gray-400 line-through" />
          </div>
        </header>
        <Link to={`/products/${product.handle}`}>
          <SelectedVariantImage className="h-full w-full md:h-96 md:w-96 object-cover md:rounded bg-gray-100" />
        </Link>
        <div className="md:flex md:flex-col md:justify-between p-4 md:p-0">
          <header className="hidden md:block mb-auto">
            <Link to={`/products/${product.handle}`}>
              <h3 className="text-gray-900 font-semibold text-3xl mb-8">
                <ProductTitle />
              </h3>
            </Link>
            <div className="flex items-center space-x-2 text-xl">
              <SelectedVariantPrice className="font-bold" />
              <SelectedVariantCompareAtPrice className="text-gray-400 line-through" />
            </div>
          </header>
          <div className="mt-0 mb-8 md:my-8">
            <ProductOptions />
          </div>
          <footer>
            <SelectedVariantAddToCartButton className="bg-black rounded-sm text-white w-full p-4 uppercase">
              Add to Cart
            </SelectedVariantAddToCartButton>
          </footer>
        </div>
      </div>
    </ProductProvider>
  );
}
