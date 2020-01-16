import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
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

function InfiniteCarousel({ data }) {

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col className="text-center">
          <div className="section-title">
            <h4 className="title mb-4">{data.name}</h4>
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
          <div key={item.id} className="customer-testi mr-2 ml-2 text-center p-4 rounded border"
            style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* <img src={item.image} className="mx-auto" alt="" /> */}
            <span className="badge badge-primary">{item.title}</span>
            <p className="text-muted mt-4">{item.subtitle}</p>
            <a href={item.url} className="btn btn-light">Read Now</a>
            {/* <h6 className="text-primary">{item.title}</h6> */}
          </div>
        ))}
      </Carousel>
    </React.Fragment>
  )
}
export default InfiniteCarousel;