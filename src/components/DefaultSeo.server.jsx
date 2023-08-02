import Seo from './Seo.client';
import {useShopQuery} from '@shopify/hydrogen';

export default function SeoServer() {
  const {
    data: {
      shop: {name: shopName},
    },
  } = useShopQuery({query: QUERY});

  return <Seo shopName={shopName} />;
}

const QUERY = `#graphql
  query shopName {
    shop {
      name
    }
  }
`;
