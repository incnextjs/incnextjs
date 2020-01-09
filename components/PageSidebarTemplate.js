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
        const { title, featuredImage, content } = this.props;
        return (
            <React.Fragment>
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
                                            {/* <ul className="list-unstyled mt-4">
                                                <li className="list-inline-item h6 user text-muted mr-2"><i className="mdi mdi-account"></i> Calvin Carlo</li>
                                                <li className="list-inline-item h6 date text-muted"><i className="mdi mdi-calendar-check"></i> 13th August, 2019</li>
                                            </ul> */}
                                            <ul className="page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0">
                                                <li><Link href="/"><a className="text-uppercase font-weight-bold text-dark">Home</a></Link></li>
                                                {/* <li><Link href="#" className="text-uppercase font-weight-bold text-dark">Pages</Link></li>
                                                <li><Link href="#" className="text-uppercase font-weight-bold text-dark">Blog</Link></li> */}
                                                <li>
                                                    <span className="text-uppercase text-primary font-weight-bold">{title}</span>
                                                </li>
                                            </ul>
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
                                        <div className="content p-4">
                                            <div dangerouslySetInnerHTML={{ __html: content }} />
                                        </div>
                                    </div>
                                </div>
                            </Col>


                            <Col lg={4} md={5} className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="sidebar mt-sm-30 p-4 rounded shadow">
                                    <div className="widget mb-4 pb-2">
                                        <h4 className="widget-title">Search</h4>
                                        <div id="search2" className="widget-search mt-4 mb-0">
                                            <form role="search" method="get" id="searchform" className="searchform">
                                                <div>
                                                    <input type="text" className="border rounded" name="s" id="s" placeholder="Search Keywords..." />
                                                    <input type="submit" id="searchsubmit" value="Search" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    {/* <div className="widget mb-4 pb-2">
                                        <h4 className="widget-title">Catagories</h4>
                                        <ul className="list-unstyled mt-4 mb-0 catagories">
                                            <li><Link href="#">Finance</Link> <span className="float-right">13</span></li>
                                            <li><Link href="#">Business</Link> <span className="float-right">09</span></li>
                                            <li><Link href="#">Blog</Link> <span className="float-right">18</span></li>
                                            <li><Link href="#">Corporate</Link> <span className="float-right">20</span></li>
                                            <li><Link href="#">Investment</Link> <span className="float-right">22</span></li>
                                        </ul>
                                    </div>

                                    <div className="widget mb-4 pb-2">
                                        <h4 className="widget-title">Recent Post</h4>
                                        <div className="mt-4">
                                            <div className="clearfix post-recent">
                                                <div className="post-recent-thumb float-left"> <Link href="#"> <img alt="img" src={blog07} className="img-fluid rounded" /></Link></div>
                                                <div className="post-recent-content float-left"><Link href="#">Consultant Business</Link><span className="text-muted mt-2">15th June, 2019</span></div>
                                            </div>
                                            <div className="clearfix post-recent">
                                                <div className="post-recent-thumb float-left"> <Link href="#"> <img alt="img" src={blog08} className="img-fluid rounded" /></Link></div>
                                                <div className="post-recent-content float-left"><Link href="#">Look On The Glorious Balance</Link> <span className="text-muted mt-2">15th June, 2019</span></div>
                                            </div>
                                            <div className="clearfix post-recent">
                                                <div className="post-recent-thumb float-left"> <Link href="#"> <img alt="img" src={blog01} className="img-fluid rounded" /></Link></div>
                                                <div className="post-recent-content float-left"><Link href="#">Research Financial.</Link> <span className="text-muted mt-2">15th June, 2019</span></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="widget mb-4 pb-2">
                                        <h4 className="widget-title">Tags Cloud</h4>
                                        <div className="tagcloud mt-4">
                                            <Link href="#" className="rounded">Business</Link>
                                            <Link href="#" className="rounded">Finance</Link>
                                            <Link href="#" className="rounded">Marketing</Link>
                                            <Link href="#" className="rounded">Fashion</Link>
                                            <Link href="#" className="rounded">Bride</Link>
                                            <Link href="#" className="rounded">Lifestyle</Link>
                                            <Link href="#" className="rounded">Travel</Link>
                                            <Link href="#" className="rounded">Beauty</Link>
                                            <Link href="#" className="rounded">Video</Link>
                                            <Link href="#" className="rounded">Audio</Link>
                                        </div>
                                    </div>

                                    <div className="widget">
                                        <h4 className="widget-title">Follow us</h4>
                                        <ul className="list-unstyled social-icon mt-4 mb-0">
                                            <li className="list-inline-item"><Link href="#" className="rounded  mr-1"><i className="mdi mdi-facebook"></i></Link></li>
                                            <li className="list-inline-item"><Link href="#" className="rounded mr-1"><i className="mdi mdi-instagram"></i></Link></li>
                                            <li className="list-inline-item"><Link href="#" className="rounded mr-1"><i className="mdi mdi-twitter"></i></Link></li>
                                            <li className="list-inline-item"><Link href="#" className="rounded mr-1"><i className="mdi mdi-vimeo"></i></Link></li>
                                            <li className="list-inline-item"><Link href="#" className="rounded"><i className="mdi mdi-dribbble"></i></Link></li>
                                        </ul>
                                    </div> */}

                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
export default PageSidebarTemplate;