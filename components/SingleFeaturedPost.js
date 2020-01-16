import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';


function SingleFeaturedPost({ data }) {

    function getPostDescription(post) {
        const content = post.content.find(contentModule => contentModule.__typename == 'TextRecord');
        return content && content.text.substring(0, 150) + '...' || '';
    }

    return (
        <div>
            <Row className="justify-content-center">
                <Col className="text-center">
                    <div className="section-title mb-60">
                        <h4 className="title mb-4">{data.title}</h4>
                    </div>
                </Col>
            </Row>
            {data.posts.map(post => (
                <Row key={post.id} className="align-items-center">
                    <Col lg={7} md={7} className="mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div className="position-relative">
                            <img src={post.featuredImage && post.featuredImage.responsiveImage.src || null}
                                srcSet={post.featuredImage && post.featuredImage.responsiveImage.srcSet || null}
                                className="rounded img-fluid mx-auto d-block" />
                        </div>
                    </Col>
                    <Col lg={5} md={5} className="mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <div className="section-title ml-lg-4">
                            <h4 className="title mb-4">{post.title}</h4>
                            <div className="text-muted" dangerouslySetInnerHTML={{__html: getPostDescription(post)}}/>
                            <a href={post.slug} className="btn btn-primary mt-3"> View All</a>
                        </div>
                    </Col>
                </Row>
            ))}

        </div>
    )
}

export default SingleFeaturedPost;