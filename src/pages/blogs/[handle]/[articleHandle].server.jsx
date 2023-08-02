import {RawHtml, useShopQuery} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import Layout from '../../../components/Layout.client';
import gql from 'graphql-tag';

export default function Article() {
  const {handle, articleHandle} = useParams();
  const {data} = useShopQuery({
    query: QUERY,
    variables: {handle, articleHandle},
  });

  const article = data.blogByHandle.articleByHandle;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p className="font-medium mt-1">
        Published {new Date(article.publishedAt).toLocaleDateString()} by{' '}
        {article.author.name}
      </p>

      <RawHtml string={article.contentHtml} className="prose mt-8" />
    </Layout>
  );
}

const QUERY = gql`
  query ArticleDetails($handle: String!, $articleHandle: String!) {
    blogByHandle(handle: $handle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
      }
    }
  }
`;
