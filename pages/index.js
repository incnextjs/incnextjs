import { useEffect } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks'
import { Row, Col } from 'reactstrap';
import BlogCarousel from '../components/Carousel/BlogCarousel';
import InfiniteCarousel from '../components/Carousel/InfiniteCarousel';
import SliderHome from '../components/Carousel/SliderHome';
import ShowcaseCard from '../components/Showcase/ShowcaseCard';
import HomePageExternalVideo from '../components/Gallery/HomePageExternalVideo';
import TabsHomePage from '../components/TabsHomePage';
import ShowcaseButton from '../components/Showcase/ShowcaseButton';
import FeaturedPosts from '../components/FeaturedPosts';
import SingleFeaturedPost from '../components/SingleFeaturedPost';
import PortfolioCarousel from '../components/Carousel/PortfolioCarousel';

const GET_PAGE = gql`
  query getPage($slug: String!) {
    page(filter:{slug:{eq:$slug}}) {
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
        ... on FeaturedPostRecord {
          id
          title
          posts {
            id
            title
            slug
            content {
              ...on TextRecord {
                id
                text
              }
            }
            featuredImage {
              responsiveImage {
                src
                srcSet
              }
            }
            createdAt
          }
        }
        ... on TabContentRecord {
          id
          tab {
            id
            location
            tabs {
              id
              tab {
                id
                title
                featuredImage {
                  responsiveImage {
                    src
                    srcSet
                  }
                }
                content {
                  ... on TextRecord {
                    id
                    text
                  }
                }
              }
            }
          }
        }
        ... on MediaReferenceRecord {
          id
          mediaLibrary {
            id
            name
            category {
              name
            }
            mediaItems {
              ... on ExternalVideoRecord {
                id
                title
                externalVideo {
                  url
                  providerUid
                  thumbnailUrl
                  width
                  height
                }
              }
            }
          }
        }
        ... on ShowcaseReferenceRecord {
          id
          showcase {
            id
            template {
              name
            }
            items {
              id
              title
              description
              icon {
                url
                responsiveImage {
                  src
                  srcSet
                }
              }
              url
            }
          }
        }
        ... on CarouselReferenceRecord {
          id
          carousel {
            id
            name
            template {
              name
            }
            items {
              id
              title
              subtitle
              description
              image {
                responsiveImage {
                  src
                  srcSet
                }
              }
              url
            }
          }
        }
      }
    }
  }
  `;


const Home = () => {

  const router = useRouter();
  const { data } = useQuery(GET_PAGE, {
    variables: {
      slug: router.query.slug || router.pathname
    }
  });

  // useEffect(() => {
  //   // console.log(router.query.slug)
  //   console.log(data)
  // }, [data])

  useEffect(() => {
    document.body.classList = "";
    document.getElementById('topnav').classList.add('bg-white');
    window.addEventListener("scroll", scrollNavigation, true);
  }, []);

  const scrollNavigation = () => {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 80) {
      document.getElementById('topnav').classList.add('nav-sticky');
    }
    else {
      document.getElementById('topnav').classList.remove('nav-sticky');
    }
  }

  if (data) {
    const { content, title } = data.page;
    return (
      <div className="default-page">

        <Head>
          <title>{title}</title>
        </Head>

        {content.map(contentModule => {
          switch (contentModule.__typename) {

            case "CarouselReferenceRecord":

              switch (contentModule.carousel.template.name) {
                case 'Blog':
                  return (
                    <section key={contentModule.id} className="section-three bg-light">
                      <BlogCarousel data={contentModule.carousel} />
                    </section>
                  );
                case 'Infinite':
                  return (
                    <section key={contentModule.id} className="section-three container">
                      <InfiniteCarousel data={contentModule.carousel} />
                    </section>
                  )
                case 'Home':
                  return <SliderHome key={contentModule.id} data={contentModule.carousel} />
                case 'Portfolio':
                  return (
                    <section key={contentModule.id} className="section-three bg-light">
                      <div className="container">
                        <PortfolioCarousel data={contentModule.carousel} />
                      </div>
                    </section>
                  )
                default:
                  return null;
              }

            case 'ShowcaseReferenceRecord':
              switch (contentModule.showcase.template.name) {
                case 'Card':
                  return (
                    <section key={contentModule.id} className="section-three">
                      <div className="container">
                        <ShowcaseCard data={contentModule.showcase} />
                      </div>
                    </section>
                  );
                case 'Button':
                  return (
                    <section key={contentModule.id} className="section-three np-top">
                      <div className="container">
                        <ShowcaseButton data={contentModule.showcase} />
                      </div>
                    </section>
                  )
                default: return null;
              }

            case 'MediaReferenceRecord':
              switch (contentModule.mediaLibrary.category.name) {
                case 'Speech':
                  return (
                    <section key={contentModule.id} className="section-three">
                      <div className="container">
                        <HomePageExternalVideo data={contentModule.mediaLibrary} />
                      </div>
                    </section>
                  )
                default: return null;
              }

            case 'TabContentRecord':
              return (
                <section key={contentModule.id} className="section-three bg-light">
                  <TabsHomePage data={contentModule.tab} />
                </section>
              )

            case 'FeaturedPostRecord':
              if (contentModule.posts.length > 1) {
                return (
                  <section key={contentModule.id} className="section-three">
                    <div className="container">
                      <FeaturedPosts data={contentModule} />
                    </div>
                  </section>
                )
              } else {
                return (
                  <section key={contentModule.id} className="section-three bg-light">
                    <div className="container">
                      <SingleFeaturedPost data={contentModule} />
                    </div>
                  </section>
                )
              }
            default:
              return null;

          }
        })}

      </div>
    )
  }
  return null;
}

export default withApollo(Home);