// React Basic and Bootstrap
import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';


class PageSidebarTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        document.body.classList = "";
        window.addEventListener("scroll", this.scrollNavigation, true);
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation);
    }
    scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById('topnav').classList.add('nav-sticky');
        }
        else {
            document.getElementById('topnav').classList.remove('nav-sticky');
        }
    }

    render() {
        const { title, featuredImage, content, updatedAt } = this.props;
        return (
            <div className="default-page">
                <Head>
                    <title>{title}</title>
                </Head>
                <section className="bg-half bg-light">
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="justify-content-center">
                                    <Col lg={12} className="text-center">
                                        <div className="page-next-level">
                                            <h2> {title} </h2>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="container">
                        <Row>
                            <Col lg={8} md={7}>
                                <div className="mr-lg-3">
                                    <div className="blog position-relative overflow-hidden shadow rounded">
                                        <div className="position-relative">
                                            <img src={featuredImage.src || ''} srcSet={featuredImage.srcSet || ''}
                                                className="img-fluid rounded-top" alt="" />
                                        </div>
                                        <div className="p-4 page-content">

                                            {content.map(contentModule => {
                                                switch (contentModule.__typename) {
                                                    case 'HeadingRecord':
                                                        return <h5 className="heading-record">{contentModule.text}</h5>
                                                    case 'TextRecord':
                                                        return <div className="text-record" dangerouslySetInnerHTML={{ __html: contentModule.text }} />
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </Col>


                            <Col lg={4} md={5} className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="sidebar mt-sm-30 p-4 rounded shadow">
                                    {/* <div className="widget mb-4 pb-2">
                                        <h4 className="widget-title">Search</h4>
                                        <div id="search2" className="widget-search mt-4 mb-0">
                                            <form role="search" method="get" id="searchform" className="searchform">
                                                <div>
                                                    <input type="text" className="border rounded" name="s" id="s" placeholder="Search Keywords..." />
                                                    <input type="submit" id="searchsubmit" value="Search" />
                                                </div>
                                            </form>
                                        </div>
                                    </div> */}
                                    <div className="widget">
                                        <h4 className="widget-title">SUBSCRIBE FOR NEWSLETTERS</h4>
                                        <div className="foot-subscribe form-group position-relative">
                                            <i className="fas fa-at ml-3 icons" style={{lineHeight:2.5}}></i>
                                            <input type="email" name="email" id="emailsubscribe" className="form-control pl-5 rounded" placeholder="Your email : " required />
                                        </div>
                                        <div className="col-lg-12">
                                            <input type="submit" id="submitsubscribe" name="send" className="btn btn-primary w-100" value="Subscribe" />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div>
        );
    }
}
export default PageSidebarTemplate;