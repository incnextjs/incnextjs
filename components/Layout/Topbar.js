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
            name
            path
            navigation {
              slug
            }
            destinationType
            children {
              name
              path
              navigation {
                slug
              }
              destinationType
              children {
                name
                path
                navigation {
                  slug
                }
                destinationType
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
        keyIssues: false,
        organisation: false,
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
            if (window.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
    });

    const toggleLine = () => {
        setState({ state, isOpen: !prevState.isOpen });
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

    const getPath = (menu) => {
        return `${(menu.path && `/${menu.path}`) || (menu.navigation && `/${menu.navigation.slug}`) || ``}`
    }

    const getSlug = (menu) => {
        return `${(menu.path && `${menu.path}`) || (menu.navigation && `${menu.navigation.slug}`) || ``}`
    }

    return (
        <React.Fragment>
            <header id="topnav" className="defaultscroll sticky">
                <div className="container">
                    <Row>
                        <Col md={3} style={{
                            display:'flex',
                            alignItems:'center'
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
                        {/* <div className="buy-button">
                        <Link href="#"><a className="btn btn-primary">Online Membership</a></Link>
                    </div> */}
                        {/* <div className="menu-extras">
                        <div className="menu-item">
                            <Link href="#" onClick={toggleLine} className={state.isOpen ? "navbar-toggle open" : "navbar-toggle"} >
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </div>
                    </div> */}
                        <Col md={9}>
                            <div id="navigation" style={{ display: state.isOpen ? "block" : "none" }}>
                                <ul className="navigation-menu" id="top-menu">
                                    {data && data.menuLocation.menuItems.map(({ menu }) => {

                                        if (menu.children.length > 0) {
                                            return <li className="has-submenu">
                                                <Link href={getPath(menu)}>
                                                    <a onClick={(event) => { event.preventDefault(); }}>{menu.name}</a>
                                                </Link><span className="menu-arrow"></span>

                                                <ul className={state.keyIssues ? "submenu open" : "submenu"}>
                                                    {menu.children.map(childrenMenu => {

                                                        if (childrenMenu.children.length > 0) {
                                                            return (
                                                                <li className="has-submenu">
                                                                    <Link href={`${getPath(menu)}${getPath(childrenMenu)}`}><a onClick={(event) => { event.preventDefault(); }}>{childrenMenu.name}</a></Link><span className="submenu-arrow"></span>
                                                                    <ul className={state.organisation ? "submenu open" : "submenu"}>
                                                                        {childrenMenu.children.map(subChildrenMenu => {
                                                                            // return < li > <Link href={`${getPath(menu)}${getPath(childrenMenu)}${getPath(subChildrenMenu)}`}><a>{subChildrenMenu.name}</a></Link></li>
                                                                            return <li><Link href={`/${subChildrenMenu.destinationType}?slug=${getSlug(subChildrenMenu)}`} as={`${getPath(menu)}${getPath(childrenMenu)}${getPath(subChildrenMenu)}`}><a>{subChildrenMenu.name}</a></Link></li>
                                                                        })}
                                                                    </ul>
                                                                </li>
                                                            )
                                                        } else {
                                                            // return <li><Link href={`${getPath(menu)}${getPath(childrenMenu)}`}><a>{childrenMenu.name}</a></Link></li>
                                                            return <li><Link href={`/${childrenMenu.destinationType}?slug=${getSlug(childrenMenu)}`} as={`${getPath(menu)}${getPath(childrenMenu)}`}><a>{childrenMenu.name}</a></Link></li>
                                                        }

                                                    })}
                                                </ul>

                                            </li>
                                        }
                                        return <li><Link href={`/${menu.destinationType}${getSlug(menu)}`} as={`${getPath(menu)}`}><a>{menu.name}</a></Link></li>
                                    })}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </header>
        </React.Fragment>
    );
}

export default withApollo(Topbar);