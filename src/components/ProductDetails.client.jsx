import Layout from './Layout.client';
import {
  ProductProvider,
  ProductTitle,
  ProductDescription,
  SelectedVariantPrice,
  SelectedVariantCompareAtPrice,
  SelectedVariantAddToCartButton,
} from '@shopify/hydrogen/client';
import ProductOptions from '../components/ProductOptions.client';
import Gallery from '../components/Gallery.client';
import Seo from '../components/Seo.client';

export default function ProductDetails({data}) {
  return (
    <Layout>
      <Seo product={data.product} />
      <ProductProvider
        product={data.product}
        initialVariantId={data.product.variants.edges[0].node.id}
      >
        <div className="py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="p-4 md:hidden flex justify-between items-top">
            <h1 className="font-bold text-xl mb-2">
              <ProductTitle />
            </h1>
            <div className="flex items-center text-xl space-x-1">
              <SelectedVariantPrice />
              <SelectedVariantCompareAtPrice className="line-through text-gray-400" />
            </div>
          </div>
          <section className="lg:col-span-2" aria-label="Gallery">
            <Gallery />
          </section>
          <section className="p-4 max-w-md" aria-label="Product details">
            <div className="hidden md:block">
              <h1 className="font-bold text-3xl mb-2">
                <ProductTitle />
              </h1>
            </div>
            <div className="mb-8">
              <ProductOptions />
            </div>

            <SelectedVariantAddToCartButton className="block w-full text-white p-3 rounded mb-8 uppercase text-lg bg-black">
              Add to Cart
            </SelectedVariantAddToCartButton>

            <ProductDescription className="space-y-2 prose" />
          </section>
        </div>
      </ProductProvider>
    </Layout>
  );
}
