import {useParams} from 'react-router-dom';
import {useShopQuery, RTEText} from '@shopify/hydrogen';
import Layout from '../../components/Layout';

export default function Page() {
  const {handle} = useParams();
  const {data, fetching} = useShopQuery({query: QUERY, variables: {handle}});

  if (fetching) return <Layout>Loading...</Layout>;

  const page = data.pageByHandle;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{page.title}</h1>
      <RTEText text={page.body} className="prose mt-8" />
    </Layout>
  );
}

const QUERY = `#graphql
  query PageDetails($handle: String!) {
    pageByHandle(handle: $handle) {
      title
      body
    }
  }
`;
