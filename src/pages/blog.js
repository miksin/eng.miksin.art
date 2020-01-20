import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { useBottomScrollListener } from "react-bottom-scroll-listener"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Blog = ({
  data,
  displayPerTime,
  location,
}) => {
  // extend display length when detect scroll to bottom
  const newDisplayNum = now => Math.min(data.posts.edges.length, now + displayPerTime)
  const [display, setDisplay] = useState(newDisplayNum(0))
  useBottomScrollListener(() => {
    setDisplay(newDisplayNum(display))
  })

  const posts = data.posts.edges.slice(0, display).map(edge => {
    const { frontmatter, html } = edge.node

    return {
      id: frontmatter.path,
      html,
      frontmatter: edge.node.frontmatter,
    }
  })

  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <div className="blog-preview">
        {
          posts.map(post => (
            <div className="blog-preview-item" key={post.id}>
              <h2>{post.frontmatter.title}</h2>
              <h4>{post.frontmatter.date}</h4>
              <div className="split-line" />
              <div
                className="blog-preview-content"
                dangerouslySetInnerHTML={{ __html: post.html}}
              />
              <Link to={post.frontmatter.path}>
                Read More
              </Link>
            </div>
          ))
        }
        <div className="display-num-nav">
          <h4>{display} / {data.posts.edges.length} Posts</h4>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogPageQuery {
    posts: allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/\/blog\/.*/"}}}
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          html
          frontmatter {
            path
            title
            excerpt
            fromNow: date(fromNow: true)
            date: date(formatString: "YYYY-MM-DD")
          }
        }
      }
      tags: group(field: frontmatter___tags){
        fieldValue
        totalCount
      }
    }
  }
`

Blog.propTypes = {
  displayPerTime: PropTypes.number,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          html: PropTypes.string,
          frontmatter: PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string,
            excerpt: PropTypes.string,
            fromNow: PropTypes.string,
            date: PropTypes.string,
          }).isRequired
        }).isRequired
      })).isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired,
}

Blog.defaultProps = {
  displayPerTime: 10,
}

export default Blog

