import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';

// Blog Images
import blog1 from '../template/images/blog/01.jpg';
import blog2 from '../template/images/blog/02.jpg';
import blog3 from '../template/images/blog/03.jpg';


function PageCarousel({ data }) {

    return (
        <div className="container">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <div className="section-title mb-4 pb-2">
                        <h4 className="title mb-4">{data.name}</h4>
                        {/* <p className="text-muted para-desc mx-auto mb-0">Start working with <span className="text-primary font-weight-bold">Landrick</span> that can provide everything you need to generate awareness, drive traffic, connect.</p> */}
                    </div>
                </Col>
            </Row>
            <Row>
                {data.items.map(item => (
                    <Col lg={4} md={6} className="mt-4 pt-2">
                        <div className="blog position-relative overflow-hidden shadow rounded">
                            <div className="position-relative">
                                <img src={item.image && item.image.responsiveImage.src || blog1}
                                    srcSet={item.image && item.image.responsiveImage.srcSet || null}
                                    className="img-fluid rounded-top" alt="" />
                                <div className="overlay rounded-top bg-dark"></div>
                            </div>
                            <div className="content p-4">
                                <h4>{item.title}</h4>
                                <p>{item.subtitle}</p>
                                <div className="post-meta mt-3">
                                    <Link href={item.url}><a className="text-muted float-right readmore">Read More <i className="fas fa-angle-right"></i></a></Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default PageCarousel;