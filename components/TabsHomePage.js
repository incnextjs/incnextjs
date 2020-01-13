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
                            <h4 className="main-title mb-4">{data.location}</h4>
                            {/* <p className="text-muted para-desc mb-0 mx-auto">Start working with <span className="text-primary font-weight-bold">Landrick</span> that can provide everything you need to generate awareness, drive traffic, connect.</p> */}

                            <Row className="mt-4 justify-content-center">
                                <Col lg={12} md={12} className="text-center" style={{ marginTop: "32px" }}>
                                    <Nav pills id="navnav" className="nav-justified flex-column flex-sm-row">
                                        {data.tabs.map(({ tab }) => (
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: activeTab === tab.id })}
                                                    onClick={() => { toggle(tab.id); }}>
                                                    <div style={{ minWidth: "200px" }} className="text-center pt-1 pb-1 rounded">
                                                        <h4 className="title font-weight-normal mb-0">{tab.title}</h4>
                                                    </div>
                                                </NavLink>
                                            </NavItem>
                                        ))}
                                    </Nav>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>

                        <TabContent activeTab={activeTab}>
                            {data.tabs.map(({ tab }) => (
                                <TabPane tabId={tab.id}>
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
                                                                <div className="text-muted" dangerouslySetInnerHTML={{ __html: contentModule.text }} />
                                                            )
                                                        default: return null;
                                                    }
                                                })}
                                            </div>
                                        </Col>
                                    </Row>
                                </TabPane>
                            ))}
                            <TabPane tabId="1">
                                <Row className="align-items-center">



                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
};

export default TabsHomePage;