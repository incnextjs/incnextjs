import { useEffect } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks'
import { Row, Col } from 'reactstrap';
import BlogCarousel from '../components/Carousel/BlogCarousel';
import InfiniteCarousel from '../components/Carousel/InfiniteCarousel';
import SliderHome from '../components/Carousel/SliderHome';
import Showcase from '../components/Showcase';

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
        ... on ShowcaseReferenceRecord {
          showcase {
            id
            items {
              id
              title
              icon {
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
          carousel {
            id
            name
            template {
              name
            }
            items {
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
    const { content } = data.page;
    return (
      <div className="default-page">

        {content.map(contentModule => {
          switch (contentModule.__typename) {

            case "CarouselReferenceRecord":

              switch (contentModule.carousel.template.name) {
                case 'Blog':
                  return (
                    <section className="section bg-light">
                      <BlogCarousel data={contentModule.carousel} />
                    </section>
                  );
                case 'Infinite':
                  return (
                    <section className="section container">
                      <InfiniteCarousel data={contentModule.carousel} />
                    </section>
                  )
                case 'Home':
                  return <SliderHome data={contentModule.carousel} />
                default:
                  return null;
              }

            case 'ShowcaseReferenceRecord':
              return (
                <section className="section">
                  <div className="container">
                    <Showcase data={contentModule.showcase} />
                  </div>
                </section>
              )

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