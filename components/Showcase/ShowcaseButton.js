import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'reactstrap';

function ShowcaseButton({ data }) {
    return (
        <Row>
            {data.items.map(item => (
                <Col key={item.id} lg={6} md={6} xs={12} className="mt-4 pt-2">
                    <a href={item.url}>
                        <div className="key-feature d-flex p-3 rounded bg-white shadow">
                            <div className="icon text-center rounded-pill mr-3">
                                {/* <i className="fas fa-user-friends text-primary"></i> */}
                                <img src={item.icon && item.icon.url} style={{ height: '55%' }} />
                            </div>
                            <div className="content mt-2">
                                <h5 className="title mb-0">{item.title}</h5>
                            </div>
                        </div>
                    </a>
                </Col>
            ))}
        </Row>
    )
}

export default ShowcaseButton;