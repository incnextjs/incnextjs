import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { withApollo } from '../apollo/client';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { Row, Col, Alert } from 'reactstrap';

//Import Images
import modern01 from '../template/images/modern01.jpg';
import roundWhite from '../template/images/shapes/round-white.png';

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
        ... on TextRecord {
          text
        }
      }
    }
  }
  `;

function OnlineMembership() {

    const router = useRouter();

    const [state, setState] = useState({
        isOpen: false,
        Contactvisible: false
    })

    const { data } = useQuery(GET_PAGE, {
        variables: {
            slug: router.query.slug
        }
    });

    useEffect(() => {
        console.log(data)
    }, [data])

    useEffect(() => {
        document.body.classList = "";
        document.getElementById('topnav').classList.add('bg-white');
        window.addEventListener("scroll", scrollNavigation, true);
    }, []);

    function scrollNavigation() {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById('topnav').classList.add('nav-sticky');
        }
        else {
            document.getElementById('topnav').classList.remove('nav-sticky');
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        setState({ ...state, Contactvisible: true });
    }

    function openModal() {
        setState({ ...state, isOpen: true });
    }

    if (data) {
        const { page: { content, featuredImage } } = data;
        return (
            <React.Fragment>

                {/* <div id="preloader">
                    <div id="status">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div> */}

                {/* Hero Start */}
                <section className="bg-half-170" style={{ background: `url(${featuredImage && featuredImage.responsiveImage.src || modern01})`, backgroundPosition: "center center" }} id="home">
                    <div style={{ position: 'absolute', background: 'black', opacity: 0.5, top: 0, right: 0, left: 0, bottom: 0 }} />
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="align-items-center mt-md-5">
                                    <Col lg={6} md={6} className="mt-4 pt-2 mt-sm-0 pt-sm-0 order-2 order-md-1">
                                        <div className="login_page bg-white shadow rounded p-4">
                                            <h5 className="mb-4">DETAILS</h5>
                                            <Alert color="info" isOpen={state.Contactvisible} toggle={() => { setState({ ...state, Contactvisible: !state.Contactvisible }) }}>
                                                Registration Done Successfully.
                                         </Alert>
                                            <form onSubmit={handleSubmit} className="login-form">
                                                <Row>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>Title <span className="text-danger">*</span></label>
                                                            <i className="fas fa-headingt ml-3 icons"></i>
                                                            <select className="form-control pl-5" required>
                                                                <option>Mr.</option>
                                                                <option>Ms.</option>
                                                                <option>Mrs.</option>
                                                                <option>Others.</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>First name <span className="text-danger">*</span></label>
                                                            <i className="mdi mdi-account ml-3 icons"></i>
                                                            <input type="text" className="form-control pl-5" placeholder="First Name" name="s" required />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>Middle name</label>
                                                            <i className="mdi mdi-account ml-3 icons"></i>
                                                            <input type="text" className="form-control pl-5" placeholder="Middle Name" name="s" />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>Last name</label>
                                                            <i className="mdi mdi-account ml-3 icons"></i>
                                                            <input type="text" className="form-control pl-5" placeholder="Last Name" name="s" />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>Email ID <span className="text-danger">*</span></label>
                                                            <i className="mdi mdi-email ml-3 icons"></i>
                                                            <input type="email" className="form-control pl-5" placeholder="Email" name="email" required />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>Mobile Number <span className="text-danger">*</span></label>
                                                            <i className="mdi mdi-account ml-3 icons"></i>
                                                            <input type="text" className="form-control pl-5" placeholder="Mobile Number" name="s" required />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>OTP <span className="text-danger">*</span></label>
                                                            <i className="mdi mdi-account ml-3 icons"></i>
                                                            <input type="text" className="form-control pl-5" placeholder="OTP" name="s" required />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>State <span className="text-danger">*</span></label>
                                                            <i className="mdi mdi-account ml-3 icons"></i>
                                                            <select className="form-control pl-5" required>
                                                                <option>Goa</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>Voter ID <span className="text-danger">*</span></label>
                                                            <i className="mdi mdi-account ml-3 icons"></i>
                                                            <input type="text" className="form-control pl-5" placeholder="Voter ID" name="s" required />
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="form-group position-relative">
                                                            <label>Upload Photo <span className="text-danger">*</span></label>
                                                            <input type="file" className="form-control" placeholder="Upload Photo" name="s" required />
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <div className="form-group">
                                                            <div className="custom-control custom-checkbox">
                                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                                <label className="custom-control-label" htmlFor="customCheck1">I Accept <Link href="#" className="text-primary">Terms And Condition</Link></label>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={12}>
                                                        <button className="btn btn-success w-100">Submit</button>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </div>
                                    </Col>

                                    <Col lg={4} md={4} className="offset-lg-1 order-1 order-md-2">
                                        <div className="title-heading mt-4">
                                            {content.map(contentModule => {
                                                switch (contentModule.__typename) {
                                                    case "TextRecord":
                                                        return <div className="text-light" style={{textShadow:'0.5px 0.5px black'}}
                                                         dangerouslySetInnerHTML={{ __html: data.page.content[0].text }} />
                                                    default:
                                                        return null;
                                                }
                                            })}

                                            {/* <h1 className="heading text-white mb-3">BECOME A CONGRESSMAN </h1>
                                        <p className="para-desc text-light" style={{ fontSize: 16 }}>"The Indian National Congress has always represented a secular, democratic, just and inclusive India-</p>
                                        <ul>
                                            <li className="para-desc text-light" style={{ fontSize: 16 }}>An India that is empowering the disadvantaged and the discriminated;</li>
                                            <li className="para-desc text-light" style={{ fontSize: 16 }}>An India that is blending tradition with modernity;</li>
                                            <li className="para-desc text-light" style={{ fontSize: 16 }}>An India that is anchored in unity amidst its many diversities."</li>
                                        </ul>
                                        <p className="para-desc text-light" style={{ fontSize: 16 }}>If your vision for the nation is the same as ours, become a member of the Indian National Congress and together we will build a better India.</p>
                                        <p className="para-desc text-light" style={{ fontSize: 16 }}>Before you get started, keep your Voter ID handy.</p> */}
                                            <div className="watch-video mt-4 pt-2">
                                                {/* <Link href="#"><a className="btn btn-primary mb-2 mr-2">Get Started</a></Link> */}
                                                {/* <Link href="#" onClick={openModal} className="video-play-icon watch text-light ml-1 mb-2"><i className="mdi mdi-play play-icon-circle text-center d-inline-block mr-2 rounded-pill text-white position-relative play play-iconbar"></i> WATCH VIDEO</Link> */}
                                                {/* <ModalVideo channel='youtube' isOpen={state.isOpen} videoId='L61p2uyiMSo' onClose={() => setState({ ...state, isOpen: false })} /> */}
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className="container-fluid">
                                <Row>
                                    <div className="home-shape-bottom">
                                        <img src={roundWhite} alt="" className="img-fluid mx-auto d-block" />
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>

            </React.Fragment>
        )
    }
    return null;
}

export default withApollo(OnlineMembership);