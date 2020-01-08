import { useEffect } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import PageWithTabs from '../components/PageWithTabs';

const ViewerQuery = gql`
  query ViewerQuery {
    page(filter:{slug: {eq:"our-achievements"}}) {
        title
        tabs{
          tab {
            id
            title
            featuredImage {
              responsiveImage {
                src
                srcSet
              }
            }
            content
            tabs {
              id
                title
                featuredImage {
                  responsiveImage {
                    src
                    srcSet
                  }
                }
                content
            }
          }
        }
      }
  }
`

const OurAchievements = () => {

    const {
        data
    } = useQuery(ViewerQuery);

    // useEffect(() => {
    //     if (data) {
    //         console.log(data.page)
    //     }
    // }, [data])

    if (data) {
        const { page } = data;
        return (
            <PageWithTabs title={page.title} tabs={page.tabs}/>
        )
    }
    return null;
}

export default withApollo(OurAchievements);