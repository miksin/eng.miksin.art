/* eslint-disable no-undef */
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const templates = [
    {
      regex: /\/(blog|gallery)\/.*/,
      template: path.resolve(`src/templates/blogTemplate.js`),
    },
  ]

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___date] }
      ) {
        edges {
          previous {
            frontmatter {
              path
              title
            }
          }
          node {
            frontmatter {
              path
            }
          }
          next {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    const target = templates.find(t => node.frontmatter.path.match(t.regex) !== null)
    if (target) {
      createPage({
        path: node.frontmatter.path,
        component: target.template,
        context: {
          next,
          prev: previous,
        }, // additional data can be passed via context
      })
    }
  })
}
