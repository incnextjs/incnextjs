import { useEffect } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'

const ViewerQuery = gql`
  query ViewerQuery {
    allPages{
      title
      slug
      content
    }
  }
  `;

const Home = () => {

  // const {
  //   data
  // } = useQuery(ViewerQuery);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data.allPages)
  //   }
  // }, [data])

  // if (data) {
  //   return (
  //     <div>
  //       {data.allPages.map(page => (
  //         <div>
  //           <h2>{page.title}</h2>
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }
  // return null;
  return <p>pp</p>;
}

export default withApollo(Home);