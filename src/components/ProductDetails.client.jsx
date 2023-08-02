import Layout from './Layout.client';
import {Product, useProductProvider} from '@shopify/hydrogen/client';
import SelectedVariantPrice from '../components/SelectedVariantPrice.client';
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
        <div className="py-4 grid grid-cols-3 gap-10">
          <section className="col-span-2 grid gap-10" aria-label="Gallery">
            <HeroMedia>
              <Product.SelectedVariant.Image
                className="rounded-3xl shadow-2xl h-full w-full object-cover z-20 relative bg-white bg-opacity-70"
                options={{
                  width: '1000',
                }}
              />
            </HeroMedia>
            <Gallery />
          </section>
          <section
            className="max-w-md flex flex-col gap-6"
            aria-label="Product details"
          >
            <div className="bg-white rounded-3xl p-10 sticky top-10 shadow-2xl">
              <h1 className="font-bold text-3xl mb-2">
                <Product.Title />
              </h1>
              <div className="flex items-center text-xl space-x-1">
                <SelectedVariantPrice className="text-gray-600" />
                <Product.SelectedVariant.CompareAtPrice className="line-through text-gray-400" />
              </div>
              <div className="my-8 space-y-8">
                <ProductOptions />
              </div>

              <Product.SelectedVariant.AddToCartButton className="block w-full text-white text-lg font-semibold rounded-2xl mb-8 bg-black px-3 py-5">
                Add to Bag
              </Product.SelectedVariant.AddToCartButton>

              <Product.Description className="prose" />
            </div>
          </section>
        </div>
      </Product>
    </Layout>
  );
}

function ProductOptions() {
  const {options, setSelectedOption, selectedOptions} = useProductProvider();

  return options.map(({name, values}) => {
    return (
      <fieldset key={name}>
        <legend className="mb-3 text-xl font-semibold">{name}</legend>
        <div className="flex items-center flex-wrap gap-3">
          {values.map((value) => {
            const checked = selectedOptions[name] === value;
            const id = `option-${name}-${value}`;

            return (
              <label key={id} htmlFor={id}>
                <input
                  className="sr-only"
                  type="radio"
                  id={id}
                  name={`option-${name}`}
                  value={value}
                  checked={checked}
                  onChange={() => setSelectedOption(name, value)}
                />

                <div
                  className={`p-2 text-lg rounded-full block cursor-pointer ${
                    checked
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-900 bg-gray-200'
                  }`}
                >
                  <span className="px-2">{value}</span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  });
}

function HeroMedia({children}) {
  return (
    <div className="relative min-h-[700px]">
      <div className="bg-black inset-0 rounded-3xl z-10 absolute mix-blend-overlay opacity-50" />
      {children}
    </div>
  );
}
