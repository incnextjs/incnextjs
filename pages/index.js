import { useEffect } from 'react';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks'
import { Row, Col } from 'reactstrap';
import BlogCarousel from '../components/Carousel/BlogCarousel';

// Import images
import homeShape from '../template/images/saas/home-shape.png';
import InfiniteCarousel from '../components/Carousel/InfiniteCarousel';

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
        ... on CarouselReferenceRecord {
          carousel {
            name
            template {
              name
            }
            items {
              title
              subtitle
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
  //   console.log(router.query.slug)
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
        <section className="section bg-home" style={{ background: `url(${homeShape})`, backgroundPosition: "center center", height: "auto" }} id="home">
          <div className="home-center">
            <div className="home-desc-center">
              <div className="container">
                <Row className="justify-content-center">
                  <Col md={9} className="text-center mt-0 mt-md-5 pt-0 pt-md-5">
                    <div className="title-heading margin-top-100">
                      <h1 className="heading mb-3">Conduct More Customer In A Better Way</h1>
                      <p className="para-desc mx-auto text-muted">Launch your campaign and benefit from our expertise on designing and managing conversion centered bootstrap4 html page.</p>
                      <div className="mt-4 pt-2">
                        <Link href="#about"><a className="btn btn-primary">Start Free Trial <i className="mdi mdi-chevron-right"></i></a></Link>
                      </div>
                    </div>
                    {/* <div className="home-dashboard">
                    <img src={homeImg} alt="" className="img-fluid" />
                  </div> */}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
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
                default:
                  return null;
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