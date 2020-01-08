import { useEffect } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'

const ViewerQuery = gql`
  query ViewerQuery {
    page(filter:{slug: {eq:"join-the-party"}}) {
        title
        slug
        content
      }
  }
`

const OnlineMembership = () => {

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
            <div>
                <h2>{page.title}</h2>
                <p>{page.content}</p>
            </div>
        )
    }
    return null;
}

export default withApollo(OnlineMembership);