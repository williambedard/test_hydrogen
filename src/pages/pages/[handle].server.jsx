import {useParams} from 'react-router-dom';
import {useShopQuery, RawHtml} from '@shopify/hydrogen';
import Layout from '../../components/Layout.client';
import gql from 'graphql-tag';

export default function Page() {
  const {handle} = useParams();
  const {data} = useShopQuery({query: QUERY, variables: {handle}});

  const page = data.pageByHandle;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{page.title}</h1>
      <RawHtml string={page.body} className="prose mt-8" />
    </Layout>
  );
}

const QUERY = gql`
  query PageDetails($handle: String!) {
    pageByHandle(handle: $handle) {
      title
      body
    }
  }
`;
