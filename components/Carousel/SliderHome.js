import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';

// RBCarousel Declare
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import bg01 from '../../template/images/course/bg01.jpg';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};
function SliderHome({ data }) {
    return (
        <div className="main-slider">
            <ul className="slides">
                <Carousel
                    responsive={responsive}
                    infinite={true}
                    ssr={false}
                    showDots={false}
                    removeArrowOnDeviceType={['superLargeDesktop','desktop','tablet','mobile']}
                >
                    {data.items.map(item => (
                        <div key={item.id} className="item">
                            <div className="bg-slider"
                                style={{
                                    background: `url(${item.image && item.image.responsiveImage.src || null})`,
                                    backgroundPosition: "center center",
                                    backgroundSize: 'cover'
                                }}>
                                <div className="home-center">
                                    <div className="home-desc-center">
                                        <div className="container">
                                            <Row className="justify-content-center">
                                                <Col className="text-center">
                                                    <div className="title-heading text-white mt-4">
                                                        <h1 className="display-4 font-weight-bold mb-3">{item.title}</h1>
                                                        <h3 className="bold">{item.subtitle}</h3>
                                                        <p className="para-desc mx-auto text-light">{item.description}</p>
                                                        <div className="mt-4">
                                                            <a href={item.url} className="btn btn-primary mt-2 mr-2 mouse-down"> Read More</a>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </Carousel>
            </ul>
        </div>
    )
}

export default SliderHome;