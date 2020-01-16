import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import app1 from '../template/images/app/1.png';
import app2 from '../template/images/app/2.png';
import app3 from '../template/images/app/3.png';
import app4 from '../template/images/app/4.png';

function TabsHomePage({ data }) {

    const [activeTab, setActiveTab] = useState("1");

    function toggle(tab) {
        setActiveTab(tab);
    }

    useEffect(() => {
        toggle(data.tabs[0].tab.id)
    }, [])

    return (
        <React.Fragment>

            <div className="container">
                <Row className="justify-content-center">
                    <Col className="text-center">
                        <div className="section-title mb-60">
                            <h4 className="title mb-4">{data.location}</h4>
                            {/* <p className="text-muted para-desc mb-0 mx-auto">Start working with <span className="text-primary font-weight-bold">Landrick</span> that can provide everything you need to generate awareness, drive traffic, connect.</p> */}

                            <Row>
                                <ul className="col container-filter list-unstyled categories-filter text-center" id="filter">
                                    {data.tabs.map(({ tab }) => (
                                        <li key={tab.id} className="list-inline-item" onClick={e => toggle(tab.id)}>
                                            <a className={`categories border d-block text-dark rounded ${activeTab == tab.id && 'active'}`}>
                                                {tab.title}
                                            </a></li>
                                    ))}
                                </ul>
                            </Row>

                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>

                        <TabContent activeTab={activeTab}>
                            {data.tabs.map(({ tab }) => (
                                <TabPane key={tab.id} tabId={tab.id}>
                                    <Row className="align-items-center">
                                        <Col md={6}>
                                            <img src={tab.featuredImage && tab.featuredImage.responsiveImage.src || null}
                                                srcSet={tab.featuredImage && tab.featuredImage.responsiveImage.srcSet || null}
                                                className="img-fluid mx-auto d-block" alt="" />
                                        </Col>
                                        <Col md={6} className="mt-4 mt-sm-0 pt-2 pt-sm-0">
                                            <div className="section-title">
                                                <h4 className="title mb-4"><i className="fas fa-angle-double-right text-primary"></i> {tab.title}</h4>
                                                {tab.content.map(contentModule => {
                                                    switch (contentModule.__typename) {
                                                        case 'TextRecord':
                                                            return (
                                                                <div key={contentModule.id} className="text-muted" dangerouslySetInnerHTML={{ __html: contentModule.text }} />
                                                            )
                                                        default: return null;
                                                    }
                                                })}
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                            ))}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
};

export default TabsHomePage;