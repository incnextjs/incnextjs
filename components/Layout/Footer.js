import React, { useEffect } from 'react';
import Link from 'next/link';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../apollo/client';
import { Row, Col } from 'reactstrap';


const GET_MENUS = gql`
  query getTopbarMenu {
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
  }
  `;

function Footer() {

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
                            <Link href="#"><a className="logo-footer" >Landrick<span className="text-primary">.</span></a></Link>
                            <p className="mt-4">Start working with Landrick that can provide everything you need to generate awareness, drive traffic, connect.</p>
                            <ul className="list-unstyled social-icon social mb-0 mt-4">
                                <li className="list-inline-item"><Link href="#"><a className="rounded mr-1"><i className="mdi mdi-facebook" title="Facebook"></i></a></Link></li>
                                <li className="list-inline-item"><Link href="#"><a className="rounded mr-1"><i className="mdi mdi-instagram" title="Instagram"></i></a></Link></li>
                                <li className="list-inline-item"><Link href="#"><a className="rounded mr-1"><i className="mdi mdi-twitter" title="Twitter"></i></a></Link></li>
                            </ul>
                        </Col>

                        <Col md={8}>
                            <Row>
                                {data && data.menuLocation.menuItems.map(({ menu }) => (
                                    <Col md={4} style={{marginBottom:20}}>
                                        <h4 className="text-light footer-head">{menu.name}</h4>
                                        <ul className="list-unstyled footer-list mt-4">
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
                                <p className="mb-0">©  {new Date().getFullYear()}  Landrick. Develop by Themesbrand.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </React.Fragment>
    );


}

export default withApollo(Footer);
