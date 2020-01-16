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
        // console.log(this.props.content)

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
            <div className="default-page">
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
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">

                        {/* <div className="page-main-tabs">
                            {tabs.map(tab => (
                                <a className={`rounded ${tab.id == currentTab.key ? 'active' : ''}`} onClick={e => { this.selectTab(tab.id) }}>{tab.title}</a>
                            ))}
                        </div> */}

                        <Row>
                            <Col lg={4} md={5} className="col-12 mt-4 mt-sm-0 pt-2 pt-sm-0 page-nested-tabs">
                                <div className="sidebar mt-sm-30 p-4 rounded shadow"
                                    style={{ /*top: '15%', position: 'sticky'*/ }}>

                                    <ul className="list-unstyled page-tab-items">
                                        {tabs.map(tab => (
                                            <li key={tab.id} className={`widget mb-4 page-tab-item ${tab.id == currentTab.key ? 'active' : ''}`}>
                                                <i className="fas fa-angle-right page-tab-item-icon"></i>
                                                <a onClick={e => { this.selectTab(tab.id) }}>{tab.title}</a>
                                                <ul className={`list-unstyled page-tab-nested-items ${tab.id == currentTab.key ? "active" : ""}`}>
                                                    {tab.children.map(childTab => (
                                                        <li key={childTab.id} className={`nested-tab-item ${currentTab.currentChild == childTab.id ? 'active' : ''}`}
                                                            onClick={e => { this.selectChildTab(childTab.id) }}>
                                                            <i className="fas fa-angle-double-right page-tab-item-icon"></i>
                                                            <a>{childTab.title}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                        {/* {tabs.map(tab => (
                                            <div className="widget mb-4 pb-2" style={!currentTab || currentTab.key != tab.id ? { display: 'none' } : {}}>
                                                <h4 className="widget-title nested-tab-title">{tab.title}</h4>
                                                <ul className="list-unstyled mt-4 mb-0 catagories nested-tab-items">
                                                {tab.children.map(childTab => (
                                                    <li className={`${currentTab.currentChild == childTab.id ? 'active' : ''}`}
                                                        onClick={e => { this.selectChildTab(childTab.id) }}>
                                                        <a>{childTab.title}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                            </div>
                                        ))} */}
                                    </ul>
                                </div>
                            </Col>

                            <Col lg={8} md={6}>
                                <div className="mr-lg-3">
                                    <div className="blog position-relative overflow-hidden shadow rounded">
                                        <div className="position-relative">
                                            {featuredImage && (
                                                <img src={featuredImage.src || null} srcSet={featuredImage.srcSet || null}
                                                    className="img-fluid rounded-top" alt="" />
                                            )}
                                        </div>
                                        <div className="content p-4 page-content">
                                            {tabs.map(tab => (
                                                <div key={tab.id} style={tab.id != currentTab.key ? { display: 'none' } : {}} >
                                                    {tab.children.map(childTab => (
                                                        <div key={childTab.id} style={childTab.id != currentTab.currentChild ? { display: 'none' } : {}}>
                                                            {childTab.content.map(contentModule => {
                                                                switch (contentModule.__typename) {
                                                                    case 'HeadingRecord':
                                                                        return <h5 key={contentModule.id} className="heading-record">{contentModule.text}</h5>
                                                                    case 'TextRecord':
                                                                        return <div key={contentModule.id} className="text-record" dangerouslySetInnerHTML={{ __html: contentModule.text }} />
                                                                    case 'QuoteRecord':
                                                                        return <blockquote key={contentModule.id} className="blockquote mt-3 p-3">
                                                                            <p className="text-muted mb-0 font-italic">{contentModule.text}</p>
                                                                        </blockquote>
                                                                    default: return null;
                                                                }
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>
            </div >
        );
    }
}
export default PageTabTemplate;