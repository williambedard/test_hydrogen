import {Image, Link, Money} from '@shopify/hydrogen/client';
import MediaPlaceholder from './MediaPlaceholder';

export default function ProductCard({product}) {
  const firstVariant = product?.variants?.edges[0]?.node;

  if (!product) return null;

  return (
    <div className="flex flex-col justify-center md:space-y-4">
      <Link to={`/products/${product.handle}`}>
        {firstVariant?.image ? (
          <Image
            className="w-full md:rounded md:h-96 md:w-96 object-cover bg-gray-100"
            image={firstVariant?.image}
            options={{height: '390', crop: 'center'}}
          />
        ) : (
          <div className="h-96 w-96">
            <MediaPlaceholder text="Upload a product image in the admin" />
          </div>
        )}
      </Link>
      <div className="space-y-2 px-4 pt-2 pb-8 md:p-0">
        <h3 className="font-bold">
          <Link to={`/products/${product.handle}`}>{product.title}</Link>
        </h3>
        <div className="flex items-center space-x-2">
          {firstVariant?.priceV2 && <Money money={firstVariant.priceV2} />}
          {firstVariant?.compareAtPriceV2 && (
            <Money
              className="line-through text-gray-500"
              money={firstVariant.compareAtPriceV2}
            />
          )}
        </div>
      </div>
    </div>
  );
}
