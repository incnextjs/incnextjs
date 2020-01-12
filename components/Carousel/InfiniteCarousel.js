import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Blog Images
// import client1 from '../../template/images/client/1.png';
// import client2 from '../../template/images/client/2.png';
// import client3 from '../../template/images/client/3.png';
// import client4 from '../../template/images/client/4.png';
// import client5 from '../../template/images/client/5.png';
// import client6 from '../../template/images/client/6.png';

// const items = [
//     {
//       id: 1,
//       image: client1,
//       title: "Thomas Israel",
//       description: "It seems that only fragments of the original text remain in the Lorem Ipsum texts used today.",
//     },
//     {
//       id: 2,
//       image: client2,
//       title: "Carl Oliver",
//       description: "The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century."
//     }, {
//       id: 3,
//       image: client3,
//       title: "Barbara McIntosh",
//       description: "One disadvantage of Lorum Ipsum is that in Latin certain letters appear more frequently than others."
//     },
//     {
//       id: 4,
//       image: client4,
//       title: "Jill Webb",
//       description: "Thus, Lorem Ipsum has only limited suitability as a visual filler for German texts."
//     }, {
//       id: 5,
//       image: client5,
//       description: "There is now an abundance of readable dummy texts. These are usually used when a text is required..",
//       title: "Dean Tolle"
//     }, {
//       id: 6,
//       image: client6,
//       title: "Christa Smith",
//       description: "According to most sources, Lorum Ipsum can be traced back to a text composed by Cicero..",
//     }
//   ];


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
          <div className="section-title mb-60">
            <h4 className="title mb-4">{data.name}</h4>
            {/* <p className="text-muted para-desc mx-auto mb-0">Start working with <span className="text-primary font-weight-bold">Landrick</span> that can provide everything you need to generate awareness, drive traffic, connect.</p> */}
          </div>
        </Col>
      </Row>
      <Carousel
        responsive={responsive}
        infinite={true}
        ssr={false}
        removeArrowOnDeviceType={['superLargeDesktop','desktop','tablet','mobile']}
      >
        {data.items.map(item => (
          <div className="customer-testi mr-2 ml-2 text-center p-4 rounded border"
            style={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* <img src={item.image} className="mx-auto" alt="" /> */}
            <span className="badge badge-primary">{item.title}</span>
            <p className="text-muted mt-4">{item.subtitle}</p>
            <Link href={item.url}><a className="btn btn-light">Read Now</a></Link>
            {/* <h6 className="text-primary">{item.title}</h6> */}
          </div>
        ))}
      </Carousel>;
       </React.Fragment>
  )
}
export default InfiniteCarousel;