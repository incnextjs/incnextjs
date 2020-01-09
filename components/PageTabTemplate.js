import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Row, Col } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class PageTabTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: {
                key: null,
                currentChild: null,
            }
        }
    }

    componentDidMount() {
        document.body.classList = "";
        window.addEventListener("scroll", this.scrollNavigation, true);

        // select first tab
        const { tabs } = this.props;
        if (tabs.length > 0) {
            this.selectTab(tabs[0].id);
        }
    }

    // Make sure to remove the DOM listener when the component is unmounted.
    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollNavigation);


    }
    scrollNavigation = () => {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        if (top > 80) {
            document.getElementById('topnav').classList.add('nav-sticky');
        }
        else {
            document.getElementById('topnav').classList.remove('nav-sticky');
        }
    }

    getTab = (id) => {
        const { tabs } = this.props;
        const selectedTab = tabs.find(tab => tab.id == id);
        return selectedTab;
    }

    selectTab = (id) => {
        const selectedTab = this.getTab(id);
        this.setState({
            currentTab: {
                key: selectedTab.id,
                currentChild: selectedTab.children.length > 0 ? selectedTab.children[0].id : null
            }
        });
    }

    selectChildTab = (id) => {
        this.setState({
            currentTab: {
                ...this.state.currentTab,
                currentChild: id
            }
        });
    }

    render() {
        const { title, featuredImage, content, tabs } = this.props;
        const { currentTab } = this.state;
        return (
            <React.Fragment>
                <Head>
                    <title>{title}</title>
                </Head>

                <section className="bg-half bg-light">
                    <div className="home-center">
                        <div className="home-desc-center">
                            <div className="container">
                                <Row className="justify-content-center">
                                    <Col lg={12} className="text-center">
                                        <div className="page-next-level">
                                            <h2> {title} </h2>
                                            <div className="page-main-tabs">

                                                {/* {tabs.map(tab => (
                                                    <a className="rounded" id={tab.id} onClick={e => { this.selectTab(e.target.id) }}>{tab.title}</a>
                                                ))} */}
                                            </div>
                                            <ul className="page-next d-inline-block bg-white shadow p-2 pl-4 pr-4 rounded mb-0">
                                                <li><Link href="/"><a className="text-uppercase font-weight-bold text-dark">Home</a></Link></li>
                                                <li>
                                                    <span className="text-uppercase text-primary font-weight-bold">{title}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">

                        <div className="page-main-tabs">
                            {tabs.map(tab => (
                                <a className={`rounded ${tab.id == currentTab.key ? 'active' : ''}`} onClick={e => { this.selectTab(tab.id) }}>{tab.title}</a>
                            ))}
                        </div>

                        <Row>
                            <Col lg={8} md={7}>
                                <div className="mr-lg-3">
                                    <div className="blog position-relative overflow-hidden shadow rounded">
                                        <div className="position-relative">
                                            {featuredImage && (
                                                <img src={featuredImage.src || null} srcSet={featuredImage.srcSet || null}
                                                    className="img-fluid rounded-top" alt="" />
                                            )}
                                        </div>
                                        <div className="content p-4">
                                            {tabs.map(tab => (
                                                <div style={!currentTab || currentTab.key != tab.id ? { display: 'none' } : {}} >
                                                    {tab.children.map(childTab => (
                                                        <div style={!currentTab || currentTab.currentChild != childTab.id ? { display: 'none' } : {}}
                                                            dangerouslySetInnerHTML={{ __html: childTab.content }} />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            <Col lg={4} md={5} className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                                <div className="sidebar mt-sm-30 p-4 rounded shadow"
                                    style={{ top: '15%', position: 'sticky' }}>
                                    {tabs.map(tab => (
                                        <div className="widget mb-4 pb-2" style={!currentTab || currentTab.key != tab.id ? { display: 'none' } : {}}>
                                            <h4 className="widget-title">{tab.title}</h4>
                                            <ul className="list-unstyled mt-4 mb-0 catagories">
                                                {tab.children.map(childTab => (
                                                    <li className={`${currentTab.currentChild == childTab.id ? 'active' : ''}`}
                                                        onClick={e => { this.selectChildTab(childTab.id) }}>
                                                        <a>{childTab.title}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    <div className="widget mb-4 pb-2">
                                        <h4 className="widget-title">Search</h4>
                                        <div id="search2" className="widget-search mt-4 mb-0">
                                            <form role="search" method="get" id="searchform" className="searchform">
                                                <div>
                                                    <input type="text" className="border rounded" name="s" id="s" placeholder="Search Keywords..." />
                                                    <input type="submit" id="searchsubmit" value="Search" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Col>

                        </Row>
                    </div>
                </section>
            </React.Fragment >
        );
    }
}
export default PageTabTemplate;