import { useEffect } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import Page from '../components/Page';

const ViewerQuery = gql`
  query ViewerQuery {
    page(filter:{slug: {eq:"foreign-policy"}}) {
      title
      slug
      featuredImage {
        responsiveImage {
          src
          srcSet
        }
      }
      content
    }
  }
`

const ForeignPolicy = () => {

  const {
    data
  } = useQuery(ViewerQuery);

  useEffect(() => {
    if (data) {
      console.log(data.page)
    }
  }, [data])

  if (data) {
    const { page } = data;
    return (
      <Page title={page.title} featured_image={page.featuredImage.responsiveImage} content={page.content} />
    )
  }
  return null;
}

export default withApollo(ForeignPolicy);