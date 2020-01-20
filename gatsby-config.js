/* eslint-disable no-undef */
module.exports = {
  pathPrefix: process.env.NODE_ENV === 'production' ? process.env.PUBLIC_PATH || '' : '',
  siteMetadata: {
    title: `Miksin`,
    description: `Software Engineer`,
    author: `Miksin`,
    links: [
      {
        name: `github`,
        link: `https://github.com/miksin`,
      },
      {
        name: `twitter`,
        link: `https://twitter.com/miksin_`,
      },
      {
        name: `pixiv`,
        link: `https://www.pixiv.net/member.php?id=3774481`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#A5CD6C`,
        theme_color: `#A5CD6C`,
        display: `minimal-ui`,
        icon: `src/images/yotsuba.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `${__dirname}/src/pages/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `gallery`,
        path: `${__dirname}/src/pages/gallery`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`, // for markdown
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {},
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_ID || `UA-XXXXXXXXX-X`,
      },
    },
  ],
}
