import React, { useEffect } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../apollo/client';
import { Row, Col } from 'reactstrap';


const GET_MENUS = gql`
  query getFooterData {
    menuLocation(filter:{name:{eq:"Footer"}}) {
        menuItems {
          menu {
              id
            name
            children {
                id
              name
              pathname
            }
          }
        }
      }

      navFooter:menuLocation(filter:{name:{eq:"Navbar Footer"}}) {
        id
        menuItems {
          menu {
            id
            name
            pathname
          }
        }
      }

      widget(filter:{name:{eq:"Footer"}}) {
        id
        title
        widgetContent {
          ... on TextRecord {
              id
            text
          }
        }
      }
  }
  `;

function Footer({ copyright, socialLinks }) {

    const {
        data
    } = useQuery(GET_MENUS);

    useEffect(() => {
        // console.log(socialLinks)
    }, [])

    return (
        <React.Fragment>
            <footer className="footer">
                <div className="container">
                    <Row>
                        <Col md={4}>
                            {data && data.widget && (
                                <React.Fragment>
                                    <h4 className="text-light footer-head">{data.widget.title}</h4>
                                    {data.widget.widgetContent.map(contentModule => {
                                        switch (contentModule.__typename) {
                                            case 'TextRecord':
                                                return <div key={contentModule.id} className="mt-4" style={{ fontSize: 14 }} dangerouslySetInnerHTML={{ __html: contentModule.text }} />
                                            default: return null;
                                        }
                                    })}
                                </React.Fragment>
                            )}

                            {/* SOCIAL LINKS */}
                            <ul className="list-unstyled mt-4" style={{
                                padding: 0,
                                margin: 0
                            }}>
                                {socialLinks && socialLinks.map(socialLink => (
                                    <li key={socialLink.id} className="list-inline-item" style={{
                                        padding: 5,
                                        fontSize: 22,
                                    }}><a href={socialLink.url}><i style={{ color: '#5a6d90' }} className={`${socialLink.iconCode} `}></i></a></li>
                                ))}
                            </ul>
                        </Col>

                        <Col md={8}>
                            <Row>
                                {data && data.menuLocation.menuItems.map(({ menu }) => (
                                    <Col key={menu.id} md={4} style={{ marginBottom: 20 }}>
                                        <h4 className="text-light footer-head">{menu.name}</h4>
                                        <ul className="list-unstyled footer-list" style={{ fontSize: 14 }}>
                                            {menu.children.map(childrenMenu => (
                                                <li key={childrenMenu.id}><a href={childrenMenu.pathname} className="text-foot"><i className="fas fa-angle-right mr-1"></i> {childrenMenu.name}</a></li>
                                            ))}
                                        </ul>
                                    </Col>
                                ))}
                            </Row>
                        </Col>

                    </Row>
                </div>
            </footer>
            <hr />
            <footer className="footer footer-bar">
                <div className="container text-center">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="text-sm-left">
                                <p className="mb-0">{copyright}</p>
                            </div>
                        </div>
                        <div className="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                            <ul className="list-unstyled payment-cards text-sm-right mb-0">
                                {data && data.navFooter.menuItems.map(({ menu }) => (
                                    <li key={menu.id} className="list-inline-item p-2" style={{
                                        fontSize: 14,
                                    }}><a href={menu.pathname} style={{ color: '#5a6d90' }}>{menu.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

        </React.Fragment >
    );


}

export default withApollo(Footer);
