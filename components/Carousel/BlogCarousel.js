import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

// Blog Images
import defaultImage from '../../template/images/blog/01.jpg';

function BlogCarousel({ data }) {

    return (
        <div className="container">
            <Row className="justify-content-center">
                <Col className="text-center">
                    <div className="section-title pb-2">
                        <h4 className="title">{data.name}</h4>
                        {/* <p className="text-muted para-desc mx-auto mb-0">Start working with <span className="text-primary font-weight-bold">Landrick</span> that can provide everything you need to generate awareness, drive traffic, connect.</p> */}
                    </div>
                </Col>
            </Row>
            <Carousel
                responsive={responsive}
                infinite={true}
                ssr={false}
                removeArrowOnDeviceType={['superLargeDesktop', 'desktop', 'tablet', 'mobile']}
            >
                {data.items.map(item => (
                    <Col key={item.id} className="mt-4 pt-2">
                        <div className="blog position-relative overflow-hidden shadow rounded">
                            <div className="position-relative">
                                <img src={item.image && item.image.responsiveImage.src || defaultImage}
                                    srcSet={item.image && item.image.responsiveImage.srcSet || null}
                                    className="img-fluid rounded-top" alt="" />
                                <div className="overlay rounded-top bg-dark"></div>
                            </div>
                            <div className="content p-4">
                                <h4>{item.title}</h4>
                                <p>{item.subtitle}</p>
                                <div className="post-meta mt-3" style={{ textAlign: 'right' }}>
                                    <a href={item.url} className="text-muted readmore">Read More <i className="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Carousel>
        </div>
    )
}
export default BlogCarousel;