import React from 'react';
import { Row, Col } from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';


function FeaturedPosts({ data }) {

    function getPostDescription(post) {
        const content = post.content.find(contentModule => contentModule.__typename == 'TextRecord');
        return content && content.text.substring(0, 300) + '...' || '';
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
            <Row>
                <Col lg={7}>
                    {data.posts.map((post, index) => {
                        if (index == 0) {
                            return (
                                <div key={post.id} className="blog position-relative overflow-hidden shadow rounded">
                                    <div className="position-relative">
                                        <img src={post.featuredImage && post.featuredImage.responsiveImage.src || null}
                                            srcSet={post.featuredImage && post.featuredImage.responsiveImage.srcSet || null}
                                            className="img-fluid rounded-top" />
                                        <div className="overlay rounded-top bg-dark"></div>
                                    </div>
                                    <div className="content p-4">
                                        <h4><a href={post.slug} className="title text-dark">{post.title}</a></h4>
                                        <div className="post-meta mt-3" style={{ textAlign: 'right' }}>
                                            <a href={post.slug} className="text-muted readmore">Read More <i className="fas fa-angle-right"></i></a>

                                        </div>
                                    </div>
                                    <div className="author">
                                        <small className="text-light date">
                                            <i className="far fa-calendar-alt"></i>
                                            {moment(post.createdAt).format(' dddd, DD MMMM YYYY')}
                                        </small>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </Col>

                <Col lg={5}>
                    <Row>
                        {data.posts.map((post, index) => {
                            if (index > 0) {
                                return (
                                    <Col key={post.id} lg={12} className="mt-4">
                                        <div className="featured-post-small-container blog position-relative">
                                            <div className="featured-post-thumb float-left">
                                                <img alt="img"
                                                    src={post.featuredImage && post.featuredImage.responsiveImage.src || null}
                                                    srcSet={post.featuredImage && post.featuredImage.responsiveImage.srcSet || null}
                                                    className="img-fluid rounded" />
                                            </div>
                                            <div className="featured-post-content float-left">
                                                <a href={post.slug}>{post.title}</a>
                                                <span className="text-muted mt-2">{moment(post.createdAt).format('dddd, DD MMMM YYYY')}</span>
                                            </div>
                                        </div>
                                    </Col>
                                )
                            }
                        })}
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default FeaturedPosts;