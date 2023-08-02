import {useProductProvider, useMoney} from '@shopify/hydrogen/client';

export default function SelectedVariantPrice() {
  const {selectedVariant} = useProductProvider();
  const [value, parts] = useMoney(selectedVariant.priceV2);

  return <VariantPrice variant={selectedVariant} />;
}

export function VariantPrice({variant}) {
  const [value, parts] = useMoney(variant.priceV2);

  return (
    <div className="flex gap-2 text-gray-600 items-center">
      <span>{parts.currencyNarrowSymbol + parts.amount}</span>
      <span className="rounded-full bg-gray-200 px-2 py-1 text-sm font-medium">
        {parts.currencyCode}
      </span>
    </div>
  );
}
