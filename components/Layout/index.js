import React, { useEffect } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../apollo/client';
import { useRouter } from 'next/router';


// Layout Components
import Topbar from './Topbar';
import Footer from './Footer';

// Scroll up button
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

const GET_PAGE_SETTINGS = gql`
  query getPageSettings {
    pageSetting {
      title
      description
      logo {
        responsiveImage {
          src
          srcSet
        }
      }
      socialLinks {
        id
        name
        url
        iconCode
      }
      copyright
    }
  }
  `;


function Layout({ children }) {

  const {
    data
  } = useQuery(GET_PAGE_SETTINGS);

  useEffect(() => {
    document.getElementById("pageLoader").style.display = "block";
    // window.addEventListener('load', () => {
    //   setTimeout(function () { document.getElementById("pageLoader").style.display = "none"; }, 200);
    // })
    setTimeout(function () { document.getElementById("pageLoader").style.display = "none"; }, 1000);
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data)
  //   }
  // }, [data])


  // componentDidMount() {
  // document.getElementById("pageLoader").style.display = "block";
  // setTimeout(function () { document.getElementById("pageLoader").style.display = "none"; }, 1000);
  // }

  // if (data) {
  //   const { pageSetting: settings } = data;
  return (
    <React.Fragment>
      <Topbar logo={data && data.pageSetting.logo.responsiveImage || null}/>
      {children}
      <Footer copyright={data && data.pageSetting.copyright || ''}
        socialLinks={data && data.pageSetting.socialLinks} />
      <div id="bottomIcon">
        <ScrollUpButton ContainerClassName="back-to-top rounded text-center" />
      </div>
    </React.Fragment>
  )
  // }
  // return null;
}

export default withApollo(Layout);
