import React, { Component } from 'react';
import Link from 'next/link';


class Topbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            keyIssues: false,
            organisation: false,
        };
        this.toggleLine = this.toggleLine.bind(this);
    }

    toggleLine() {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }

    componentDidMount() {
        var matchingMenuItem = null;
        var ul = document.getElementById("top-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (window.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem);
        }
    }

    activateParentDropdown = (item) => {
        const parent = item.parentElement;
        if (parent) {
            parent.classList.add('active'); // li
            const parent1 = parent.parentElement;
            parent1.classList.add('active'); // li
            if (parent1) {
                const parent2 = parent1.parentElement;
                parent2.classList.add('active'); // li
                if (parent2) {
                    const parent3 = parent2.parentElement;
                    parent3.classList.add('active'); // li
                    if (parent3) {
                        const parent4 = parent3.parentElement;
                        parent4.classList.add('active'); // li
                    }
                }
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <header id="topnav" className="defaultscroll sticky">
                    <div className="container">
                        <div>
                            <Link href="/index"><a className="logo">Landrick<span className="text-primary">.</span></a></Link>
                        </div>
                        <div className="buy-button">
                            <Link href="#"><a className="btn btn-primary">Online Membership</a></Link>
                        </div>
                        <div className="menu-extras">
                            <div className="menu-item">
                                <Link href="#" onClick={this.toggleLine} className={this.state.isOpen ? "navbar-toggle open" : "navbar-toggle"} >
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div id="navigation" style={{ display: this.state.isOpen ? "block" : "none" }}>
                            <ul className="navigation-menu" id="top-menu">
                                <li><Link href="/"><a>Home</a></Link></li>
                                <li className="has-submenu">
                                    <Link href="/#"><a onClick={(event) => { event.preventDefault(); this.setState({ keyIssues: !this.state.keyIssues }) }} >Key Issues</a></Link><span className="menu-arrow"></span>
                                    <ul className={this.state.keyIssues ? "submenu open" : "submenu"}>
                                        <li><Link href="/foreign-policy"><a>Foreign Policy</a></Link></li>
                                    </ul>
                                </li>
                                <li className="has-submenu">
                                    <Link href="/#"><a onClick={(event) => { event.preventDefault(); this.setState({ organisation: !this.state.organisation }) }} >Organisation</a></Link><span className="menu-arrow"></span>
                                    <ul className={this.state.organisation ? "submenu open" : "submenu"}>
                                        <li><Link href="/our-achievements"><a>Our Achievements</a></Link></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

export default Topbar;