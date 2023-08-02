import {useShopQuery, MediaGalleryFragment} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import ProductDetails from '../../components/ProductDetails.client';

export default function Product() {
  const {handle} = useParams();

  const {data} = useShopQuery({
    query: QUERY,
    variables: {handle},
  });

  return <ProductDetails data={data} />;
}

const QUERY = `#graphql
  ${MediaGalleryFragment}

  query product($handle: String!) {
    product: productByHandle(handle: $handle) {
      id
      title
      vendor
      body: descriptionHtml
      options {
        id
        name
        values
      }
      variants(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            availableForSale
            image {
              ...ImageFragment
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      media(first: 6) {
        ...MediaGalleryFragment
      }
      collections(first: 5) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  }
`;
