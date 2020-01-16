import App from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout';

import '../template/Apps.scss';
import '../template/css/materialdesignicons.min.css';
// import 'react-tabs/style/react-tabs.css';

export default class MyApp extends App {

    // static async getInitialProps({ Component, ctx }) {
    //     let pageProps = {}

    //     if (Component.getInitialProps) {
    //         pageProps = await Component.getInitialProps(ctx)
    //     }

    //     return { pageProps }
    // }

    render() {
        const { Component, pageProps } = this.props

        return <React.Fragment>
            <div id="pageLoader">
                <div id="preloader">
                    <div id="status">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Layout>
                <Head>
                    <script src="https://kit.fontawesome.com/785da47453.js" crossorigin="anonymous"></script>
                </Head>
                <Component {...pageProps} />
            </Layout>
        </React.Fragment>
    }
}