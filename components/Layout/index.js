import React, { useEffect } from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../apollo/client';


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
    }
  }
  `;

function Layout({ children }) {

  const {
    data
  } = useQuery(GET_PAGE_SETTINGS);

  useEffect(() => {
    document.getElementById("pageLoader").style.display = "block";
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

  if (data) {
    const { pageSetting: settings } = data;
    return (
      <React.Fragment>
        <Topbar logo={settings.logo && settings.logo.responsiveImage || null} />
        {children}
        <Footer />
        <div id="bottomIcon">
          <ScrollUpButton ContainerClassName="back-to-top rounded text-center" />
        </div>
      </React.Fragment>
    )
  }
  return null;
}

export default withApollo(Layout);
