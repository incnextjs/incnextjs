import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'reactstrap';

function Showcase({ data }) {
    return (
        <Row>
            {data.items.map(item => (
                <Col md={3}>
                    <div className="course-feature text-center bg-white rounded p-4 pt-5 pb-5"
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                        <div style={{display:'flex',justifyContent:'center'}} >
                            <div style={{
                                background: '#2f55d4',
                                width: 65,
                                height: 65,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%'
                            }}>
                                <img src={item.icon && item.icon.responsiveImage.src}
                                    srcSet={item.icon && item.icon.responsiveImage.srcSet} height="35" alt="" />
                            </div>
                        </div>
                        <h4 className="mt-3"><Link href={item.url}><a className="title text-dark">{item.title}</a></Link></h4>
                        <Link href={item.url} ><a className="text-primary read-more">Read More <i className="fas fa-angle-right"></i></a></Link>
                        {/* <img src={item.icon && item.icon.responsiveImage.src}
                            srcSet={item.icon && item.icon.responsiveImage.srcSet} className="full-img" height="300" alt="" /> */}
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default Showcase;