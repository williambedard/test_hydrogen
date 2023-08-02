import {useParams} from 'react-router-dom';
import {useShopQuery, RawHtml, Link} from '@shopify/hydrogen';
import Layout from '../../components/Layout.client';
import gql from 'graphql-tag';

export default function Blog() {
  const {handle} = useParams();
  const {data} = useShopQuery({query: QUERY, variables: {handle}});

  const blog = data.blogByHandle;

  return (
    <Layout>
      <h1 className="text-2xl font-bold">{blog.title}</h1>

      <ul className="space-y-12 mt-8">
        {blog.articles.edges.map((edge) => {
          const article = edge.node;
          return (
            <li key={article.id}>
              <h2 className="text-xl font-medium">
                <Link to={`/blogs/${handle}/${article.handle}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="font-medium mt-1">
                Published on{' '}
                {new Date(article.publishedAt).toLocaleDateString()} by{' '}
                {article.author.name}
              </p>

              <RawHtml string={article.contentHtml} className="mt-2 prose" />
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

const QUERY = gql`
  query BlogDetails($handle: String!) {
    blogByHandle(handle: $handle) {
      title
      articles(first: 10) {
        edges {
          node {
            id
            title
            handle
            publishedAt
            contentHtml
            author {
              name
            }
          }
        }
      }
    }
  }
`;
