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

// Import images
import homeShape from '../template/images/saas/home-shape.png';

// import images
import insurance from "../template/images/icon/insurance.svg";
import graduationHat from "../template/images/icon/graduation-hat.svg";
import ai from "../template/images/icon/ai.svg";

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

  useEffect(() => {
    // console.log(router.query.slug)
    console.log(data)
  }, [data])

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
                  return (
                    <React.Fragment>
                    <SliderHome data={contentModule.carousel} />
                    <section className="section">
                      <div className="container">
                        <Row>
                          <Col md={4}>
                            <div className="course-feature text-center position-relative d-block overflow-hidden bg-white rounded p-4 pt-5 pb-5">
                              <div className="icon">
                                <img src={insurance} height="55" alt="" />
                              </div>
                              <h4 className="mt-3"><Link href="#" className="title text-dark"> Unlimited Access</Link></h4>
                              <p className="text-muted">It is a long established fact that a reader will be of a page reader will be of a page when looking at its layout. </p>
                              {/* <Link href="#" className="text-primary read-more">Read More <i className="mdi mdi-chevron-right"></i></Link> */}
                              <img src={insurance} className="full-img" height="300" alt="" />
                            </div>
                          </Col>

                          <Col md={4}>
                            <div className="course-feature text-center position-relative d-block overflow-hidden bg-white rounded p-4 pt-5 pb-5">
                              <div className="icon">
                                <img src={graduationHat} height="55" alt="" />
                              </div>
                              <h4 className="mt-3"><Link href="#" className="title text-dark"> Our Courses</Link></h4>
                              <p className="text-muted">It is a long established fact that a reader will be of a page when reader will be of a page looking at its layout. </p>
                              {/* <Link href="#" className="text-primary read-more">Read More <i className="mdi mdi-chevron-right"></i></Link> */}
                              <img src={graduationHat} className="full-img" height="300" alt="" />
                            </div>
                          </Col>

                          <Col md={4}>
                            <div className="course-feature text-center position-relative d-block overflow-hidden bg-white rounded mb-0 p-4 pt-5 pb-5">
                              <div className="icon">
                                <img src={ai} height="55" alt="" />
                              </div>
                              <h4 className="mt-3"><Link href="#" className="title text-dark"> Expert Teachers</Link></h4>
                              <p className="text-muted">It is a long established fact that a reader will be of a page when reader will be of a page looking at its layout. </p>
                              {/* <Link href="#" className="text-primary read-more">Read More <i className="mdi mdi-chevron-right"></i></Link> */}
                              <img src={ai} className="full-img" height="300" alt="" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </section>
                    </React.Fragment>
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