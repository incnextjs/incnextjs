const withSass = require('@zeit/next-sass')
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");

const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require('apollo-cache-inmemory');
const { HttpLink } = require('apollo-link-http');
const fetch = require('isomorphic-unfetch');
const gql = require('graphql-tag');

module.exports = withFonts(withCSS(withSass({
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });

        return config;
    },
    exportPathMap: async (defaultPathMap) => {

        const client = new ApolloClient({
            ssrMode: true, // Disables forceFetch on the server (so queries are only run once)
            link: new HttpLink({
                uri: 'https://graphql.datocms.com', // Server URL (must be absolute)
                credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
                fetch,
                headers: {
                    'Authorization': '14d0fe61df420e9f34ce6714ed9c02'
                }
            }),
            cache: new InMemoryCache().restore({}),
        });

        const GET_PAGES = gql`
            query getPages {
                allPages {
                     slug
                     renderPage
                    }
                }`

        let dynamicPathMap = {};

        try {
            const { data: { allPages } } = await client.query({ query: GET_PAGES });

            allPages.map(page => {
                dynamicPathMap[page.slug] = { page: `/${page.renderPage}`, query: { slug: page.slug } }
            })

            console.log(dynamicPathMap)
        } catch (error) {
            console.log(err);
        }
      
        return {
            ...dynamicPathMap,
            // '/index': { page: '/index', query: { slug: '/index' } },
            // '/index': { page: '/index' },
        }
    }
})));