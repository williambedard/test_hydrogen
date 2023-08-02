import Layout from './Layout.client';
import {Product, useProductProvider} from '@shopify/hydrogen/client';
import Gallery from '../components/Gallery.client';
import Seo from '../components/Seo.client';

export default function ProductDetails({data}) {
  return (
    <Layout>
      <Seo product={data.product} />
      <Product
        product={data.product}
        initialVariantId={data.product.variants.edges[0].node.id}
      >
        <div className="py-4 grid grid-cols-3 gap-12">
          <section className="col-span-2" aria-label="Gallery">
            <Gallery />
          </section>
          <section className="p-4 max-w-md" aria-label="Product details">
            <h1 className="font-bold text-3xl mb-2">
              <Product.Title />
            </h1>
            <div className="flex items-center text-xl space-x-1">
              <Product.SelectedVariant.Price />
              <Product.SelectedVariant.CompareAtPrice className="line-through text-gray-400" />
            </div>
            <div className="mb-8">
              <ProductOptions />
            </div>

            <Product.SelectedVariant.AddToCartButton className="block w-full text-white p-3 rounded mb-8 uppercase text-lg bg-black">
              Add to Cart
            </Product.SelectedVariant.AddToCartButton>

            <Product.Description className="space-y-2 prose" />
          </section>
        </div>
      </Product>
    </Layout>
  );
}

function ProductOptions() {
  const {options, setSelectedOption} = useProductProvider();

  return options.map(({name, values}) => {
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
          className="border border-gray-300 text-lg p-2 rounded w-full"
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
  });
}
