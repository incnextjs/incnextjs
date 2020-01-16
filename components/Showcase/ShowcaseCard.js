import React from 'react';
import Link from 'next/link';
import { Row, Col } from 'reactstrap';

function ShowcaseCard({ data }) {
    return (
        <Row>
            {data.items.map(item => (
                <Col key={item.id} lg={3} md={6} xs={12} className="mt-4 pt-2">
                    <div className="course-feature bg-light p-3 py-5 rounded shadow">
                        <img src={item.icon && item.icon.url} height="50" alt="" />
                        <div className="mt-4">
                            <h5><a href={item.url} className="text-primary">{item.title}</a></h5>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    )
}

export default ShowcaseCard;