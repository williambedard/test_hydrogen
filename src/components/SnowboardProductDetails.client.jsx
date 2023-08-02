import Layout from './Layout.client';
import Gallery from '../components/Gallery.client';
import {Product, useProductProvider, Model3D} from '@shopify/hydrogen/client';
import Seo from './Seo.client';
import SelectedVariantPrice from '../components/SelectedVariantPrice.client';
import {useEffect, useState} from 'react';

export default function SnowboardProductDetails({data}) {
  const testimonials = [
    {
      quote: 'I am getting snow board of all this talk about Headless!',
      name: 'Vanessa Lee',
      image:
        'https://www.gravatar.com/avatar/cfd6150d8f5508ec6faadfc39892dec4?s=400',
    },
    {
      quote:
        'No such thing as a headless website, but this headless board is awesome!',
      name: 'Jean-Michel Lemieux',
      image:
        'https://www.gravatar.com/avatar/bd4fb56460287b22c3052ba02c6053af?s=400',
    },
    {
      quote:
        'I’m giving it a 3/5 because I would like to decouple the bindings from the board.',
      name: 'Tobi Lütke',
      image:
        'https://pbs.twimg.com/profile_images/1334615192051789828/kLUeSvAn_400x400.jpg',
    },
  ];

  return (
    <Layout>
      <Seo product={data.product} />
      <Product
        product={data.product}
        initialVariantId={data.product.variants.edges[0].node.id}
      >
        <div className="py-4 grid grid-cols-3 gap-10">
          <section className="col-span-2 grid gap-10" aria-label="Gallery">
            <div className="relative">
              <div className="bg-black inset-0 rounded-3xl z-10 absolute mix-blend-overlay opacity-30" />
              <div className="-mt-24">
                <SnowboardModel3D />
              </div>
            </div>
            <Gallery />

            <div className="z-10 relative mt-20 mb-40">
              <p className="mb-3 text-3xl font-semibold">Testimonials</p>
              <ul className="grid grid-cols-2 gap-12">
                {testimonials.map((testimonial) => (
                  <li key={testimonial.quote}>
                    <p
                      className="text-xl"
                      style={{hangingPunctuation: 'first'}}
                    >
                      “{testimonial.quote}”
                    </p>
                    <div className="flex gap-3 items-center mt-2">
                      <img
                        src={testimonial.image}
                        className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0"
                      />
                      <p className="font-semibold">{testimonial.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
                <SelectedVariantPrice />
                <Product.SelectedVariant.CompareAtPrice className="line-through text-gray-400" />
              </div>
              <div className="my-8 space-y-8">
                <ProductOptions />
              </div>

              <Product.SelectedVariant.AddToCartButton className="block w-full text-white p-3 rounded-2xl mb-8 text-lg bg-black py-5 font-semibold">
                Add to Cart
              </Product.SelectedVariant.AddToCartButton>

              <Product.Description className="prose" />
            </div>
          </section>
        </div>
      </Product>
    </Layout>
  );
}

function SnowboardModel3D() {
  const [flipped, setFlipped] = useState(false);
  const {media, selectedVariant, selectedOptions} = useProductProvider();

  /**
   * Find the first `media` that is a 3D Model
   */
  const model = media.find((item) => item.mediaContentType === 'MODEL_3D');

  /**
   * Keep track of the selected front and rear design option
   */
  const frontDesign = selectedOptions['Front Design'];
  const rearDesign = selectedOptions['Rear Design'];

  /**
   * Whenever selected design options change, set the camera orbit
   * to the front or the rear. NOTE: Rear needs to come first,
   * because these effects execute on initial load, and we want
   * to start on the front (so it needs to come last).
   */
  useEffect(() => setFlipped(true), [rearDesign]);
  useEffect(() => setFlipped(false), [frontDesign]);

  return (
    <Model3D
      model={model}
      options={{
        variantName: selectedVariant.id,
        cameraOrbit: flipped ? '180deg 90deg 4m' : '0deg 90deg 4m',
      }}
    />
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
                <span
                  className={`p-2 text-lg rounded-full block cursor-pointer ${
                    checked
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-900 bg-gray-200'
                  }`}
                >
                  {name.includes('Color') ? (
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{backgroundColor: value}}
                    />
                  ) : (
                    <span className="px-2">{value}</span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    );
  });
}
