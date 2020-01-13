import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../apollo/client';
import { Row, Col } from 'reactstrap';

const GET_MENUS = gql`
  query getTopbarMenu {
    menuLocation(filter:{name:{eq:"Topbar"}}) {
        menuItems {
          menu {
              id
            name
            pathname
            children {
                id
              name
              pathname
              children {
                name
                pathname
              }
            }
          }
        }
      }
  }
  `;

function Topbar({ logo }) {

    const [state, setState] = useState({
        isOpen: false,
        // keyIssues: false,
        // organisation: false,
    });

    const {
        data
    } = useQuery(GET_MENUS);

    // useEffect(() => {
    //     if (data) {
    //         console.log(data)
    //     }
    // }, [data])

    useEffect(() => {
        var matchingMenuItem = null;
        var ul = document.getElementById("top-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (window.location.pathname === items[i].getAttribute('href')) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
    });

    const toggleLine = () => {
        setState({ ...state, isOpen: !state.isOpen });
    }

    const activateParentDropdown = (item) => {
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

    return (
        <React.Fragment>
            <header id="topnav" className="defaultscroll sticky">
                <div className="container">
                    <Row>
                        <Col lg={4} md={4} sm={6} xs={8} style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                            {logo && (
                                <div>
                                    <img src={logo.src} srcSet={logo.srcSet}
                                        style={{ height: '100%', width: '100%' }} />
                                </div>
                            ) || (
                                    <Link href="/index"><a className="logo">Landrick<span className="text-primary">.</span></a></Link>
                                )}
                        </Col>
                        <Col lg={8} md={8} sm={6} xs={4}>
                            <div className="menu-extras">
                                <div className="menu-item">
                                    <a href="#" onClick={toggleLine} className={state.isOpen ? "navbar-toggle open" : "navbar-toggle"} >
                                        <div className="lines">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <div id="navigation" style={{ display: state.isOpen ? "block" : "none" }}>
                            <ul className="navigation-menu" id="top-menu">
                                {data && data.menuLocation.menuItems.map(({ menu }) => {

                                    if (menu.children.length > 0) {
                                        return <li className="has-submenu">
                                            <Link href={menu.pathname || ''}>
                                                <a onClick={(event) => { event.preventDefault(); }}>{menu.name}</a>
                                            </Link><span className="menu-arrow"></span>

                                            <ul className={"submenu"}>
                                                {menu.children.map(childrenMenu => {

                                                    if (childrenMenu.children.length > 0) {
                                                        return (
                                                            <li className="has-submenu">
                                                                <Link href={childrenMenu.pathname || ''}><a onClick={(event) => { event.preventDefault(); }}>{childrenMenu.name}</a></Link><span className="submenu-arrow"></span>
                                                                <ul className={"submenu"}>
                                                                    {childrenMenu.children.map(subChildrenMenu => {
                                                                        return <li><Link href={subChildrenMenu.pathname || ''}><a>{subChildrenMenu.name}</a></Link></li>
                                                                    })}
                                                                </ul>
                                                            </li>
                                                        )
                                                    } else {
                                                        return <li><Link href={childrenMenu.pathname || ''}><a>{childrenMenu.name}</a></Link></li>
                                                    }

                                                })}
                                            </ul>

                                        </li>
                                    }
                                    return <li><a href={menu.pathname || ''}>{menu.name}</a></li>
                                })}
                            </ul>
                        </div>
                    </Row>
                </div>
            </header>
        </React.Fragment>
    );
}

export default withApollo(Topbar);