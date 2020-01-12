import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../apollo/client';
import PageSidebarTemplate from '../components/PageSidebarTemplate';
import PageTabTemplate from '../components/PageTabTemplate';

const GET_PAGE = gql`
  query getPage($slug: String!) {
    page(filter:{slug:{eq:$slug}}) {
      id
      title
      pageTemplate {
        name
      }
      featuredImage {
        responsiveImage {
          src
          srcSet
        }
      }
      content {
        ... on HeadingRecord {
          text
        }
        ... on TextRecord {
          text
        }
        ... on QuoteRecord {
          text
        }
        ... on TabContentRecord {
          tab {
            id
            tabs {
              id
              tab {
                id
                title
                children {
                  id
                  title
                  content {
                      ... on HeadingRecord {
                        text
                      }
                      ... on TextRecord {
                        text
                      }
                      ... on QuoteRecord {
                        text
                      }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;

function Page() {

  const router = useRouter();
  const { data } = useQuery(GET_PAGE, {
    variables: {
      slug: router.query.slug
    }
  });

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  if (data) {
    const { page: { pageTemplate, title, featuredImage, content, updatedAt } } = data;
    switch (pageTemplate.name) {
      case 'Sidebar':
        return <PageSidebarTemplate
          title={title}
          featuredImage={featuredImage.responsiveImage}
          content={content}
          updatedAt={updatedAt} />
      case 'Tab Page':
        const tab = content.find(item => item.__typename == 'TabContentRecord');
        const tabs = tab && tab.tab.tabs.map(({ tab }) => { return tab }) || [];
        return <PageTabTemplate title={title} featuredImage={featuredImage && featuredImage.responsiveImage || null} tabs={tabs} 
        content={content}/>
      default:
        return <p>Page template is not supported!</p>
    }
  }

  return null;

}

export default withApollo(Page);