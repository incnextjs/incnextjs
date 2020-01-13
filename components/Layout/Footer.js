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
              name
              pathname
            }
          }
        }
      }

      widget(filter:{name:{eq:"Footer"}}) {
        id
        title
        widgetContent {
          ... on TextRecord {
            text
          }
        }
      }
  }
  `;

function Footer({copyright}) {

    const {
        data
    } = useQuery(GET_MENUS);

    // useEffect(() => {
    //     if (data) {
    //         console.log(data)
    //     }
    // }, [data])

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
                                                return <div className="mt-4" style={{fontSize:14}} dangerouslySetInnerHTML={{ __html: contentModule.text }} />
                                            default: return null;
                                        }
                                    })}
                                </React.Fragment>
                            )}
                        </Col>

                        <Col md={8}>
                            <Row>
                                {data && data.menuLocation.menuItems.map(({ menu }) => (
                                    <Col md={4} style={{ marginBottom: 20 }}>
                                        <h4 className="text-light footer-head">{menu.name}</h4>
                                        <ul className="list-unstyled footer-list" style={{ fontSize: 14 }}>
                                            {menu.children.map(childrenMenu => (
                                                <li><Link href={childrenMenu.pathname}><a className="text-foot"><i className="fas fa-angle-right mr-1"></i> {childrenMenu.name}</a></Link></li>
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
                    </div>
                </div>
            </footer>

        </React.Fragment>
    );


}

export default withApollo(Footer);
