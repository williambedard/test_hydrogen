import {RTEText, useShopQuery} from '@shopify/hydrogen';
import {useParams} from 'react-router-dom';
import Layout from '../../../components/Layout.client';

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

      <RTEText text={article.contentHtml} className="prose mt-8" />
    </Layout>
  );
}

const QUERY = `#graphql
  query ArticleDetails($handle: String!, $articleHandle: String!) {
    blogByHandle(handle: $handle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author {
          name
        }
      }
    }
  }
`;
