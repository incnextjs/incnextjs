import App from 'next/app'
import Head from 'next/head'
import Layout from '../template/components/Layout';

import '../template/Apps.scss';
import '../template/css/materialdesignicons.min.css';
// import 'react-tabs/style/react-tabs.css';

export default class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props

        return <React.Fragment>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </React.Fragment>
    }
}