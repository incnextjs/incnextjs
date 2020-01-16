import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
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


function PortfolioCarousel({ data }) {

    return (
        <React.Fragment>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <div className="section-title pb-2">
                        <h4 className="title">{data.name}</h4>
                    </div>
                </Col>
            </Row>
            <Carousel
                responsive={responsive}
                infinite={true}
                ssr={true}
                removeArrowOnDeviceType={['superLargeDesktop', 'desktop', 'tablet', 'mobile']}
            >
                {data.items.map(item => (
                    <Col key={item.id} lg={12} className="spacing designing" style={{cursor:'e-resize'}}>
                        <div className="work-container position-relative d-block overflow-hidden rounded mt-3">
                            <div className="mfp-image d-inline-block" target="_blank">
                                <img src={item.image && item.image.responsiveImage.src || defaultImage}
                                    srcSet={item.image && item.image.responsiveImage.srcSet || null}
                                    className="img-fluid rounded" alt="" />
                                <div className="overlay-work"></div>
                            </div>
                            <div style={{
                                position:'absolute',
                                right: 0, left: 0, top: 0, bottom: 0,
                                background: 'linear-gradient(0deg, #0000009c, transparent)'
                            }}/>
                            <div className="content">
                                <a href={item.url} className="title text-white d-block font-weight-bold">{item.title}</a>
                                <small className="text-light">{item.description}</small>
                            </div>
                        </div>
                    </Col>
                ))}
            </Carousel>
        </React.Fragment>
    )
}
export default PortfolioCarousel;