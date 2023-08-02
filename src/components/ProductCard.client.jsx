import {Image, Link, Money} from '@shopify/hydrogen/client';
import MediaPlaceholder from './MediaPlaceholder';
import {VariantPrice} from '../components/SelectedVariantPrice.client';

export default function ProductCard({product}) {
  const firstVariant = product?.variants?.edges[0]?.node;

  if (!product) return null;

  return (
    <div className="first:col-span-2 flex flex-col justify-center bg-white rounded-3xl overflow-hidden shadow-2xl">
      <Link to={`/products/${product.handle}`}>
        {firstVariant?.image ? (
          <Image
            className="w-full h-96 object-cover bg-gray-100"
            image={firstVariant?.image}
            options={{height: '800', crop: 'center'}}
          />
        ) : (
          <div className="w-full h-96 md:h-60 lg:h-96">
            <MediaPlaceholder text="Upload a product image in the admin" />
          </div>
        )}
      </Link>
      <div className="p-5">
        <h3 className="font-semibold text-black">
          <Link to={`/products/${product.handle}`}>{product.title}</Link>
        </h3>
        <div className="mt-2">
          <VariantPrice variant={firstVariant} />
        </div>
      </div>
    </div>
  );
}
