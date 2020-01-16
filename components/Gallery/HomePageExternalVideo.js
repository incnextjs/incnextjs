import { useEffect, useState } from 'react';
import Link from 'next/link'
import { Row, Col } from 'reactstrap';
import Gallery from "react-photo-gallery";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Modal Video 
import ModalVideo from 'react-modal-video'
import '../../node_modules/react-modal-video/scss/modal-video.scss';

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

function HomePageExternalVideo({ data }) {

    const [currentMedia, setCurrentMedia] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // console.log(data)
        setCurrentMedia(data.mediaItems[0])
    }, [])

    function toggle(media) {
        setCurrentMedia(media);
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <React.Fragment>
            <div className="section-title text-center">
                <h4 className="title mb-4">{data.name}</h4>
            </div>
            {/* <div className="bg-overlay bg-overlay-gradient"></div> */}
            {currentMedia && (
                <Row className="justify-content-center" style={{
                    marginBottom: 10
                }}>
                    <Col lg={8} className="text-center overflow-hidden rounded mt-3"
                        style={{
                            background: `url(${currentMedia.externalVideo ? currentMedia.externalVideo.thumbnailUrl : null})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            padding: 100,
                            position: 'relative'
                        }}>
                        <div style={{
                            position: 'absolute',
                            right: 0, left: 0, top: 0, bottom: 0,
                            background: 'linear-gradient(0deg, #0000009c, transparent)'
                        }} />
                        <div className="section-title">
                            <h4 className="title text-white">{currentMedia.title}</h4>
                            <a onClick={openModal} className="play-btn border mt-2 video-play-icon">
                                <i className="fas fa-play text-white"></i>
                            </a>
                        </div>
                    </Col>
                </Row>
            )}
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        ssr={true}
                        removeArrowOnDeviceType={['superLargeDesktop', 'desktop', 'tablet', 'mobile']}
                    >
                        {data.mediaItems.map((media, index) => {
                            return (
                                <Col key={media.id} className="spacing designing" style={{cursor:'e-resize'}}>
                                    <div className="work-container position-relative d-block overflow-hidden rounded mt-3">
                                        <a className="mfp-image d-inline-block" target="_blank"
                                            onClick={e => { toggle(media) }}>
                                            <img className="img-fluid rounded"
                                                src={media.externalVideo ? media.externalVideo.thumbnailUrl : null}
                                                className="img-fluid rounded" />
                                            <div className="overlay-work"></div>
                                        </a>

                                    </div>
                                </Col>
                            )
                        })}
                    </Carousel>
                </Col>
            </Row>
            <ModalVideo channel='youtube' isOpen={isOpen} videoId={currentMedia && currentMedia.externalVideo.providerUid} onClose={() => setIsOpen(false)} />
        </React.Fragment>
    )
};

export default HomePageExternalVideo;