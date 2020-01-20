import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"
import Seo from '../components/seo'
import Layout from "../components/layout"

function Template({
  data,
  pageContext: {
    next,
    prev
  },
}) {
  const { page } = data // data.markdownRemark
  const { frontmatter, html } = page
  let disqusConfig = {
    identifier: frontmatter.path,
    title: frontmatter.title,
  }

  return (
    <Layout location={{ pathname: frontmatter.path }}>
      <Seo title={frontmatter.title} />
      <div className="blog-post">
        <h1>{ frontmatter.title }</h1>
        <h4>{ frontmatter.date }</h4>
        <div className="split-line" />
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="split-line" />
        <div className="blog-post-foot-nav">
          <h4>Previous:{` `}
            {
              prev ?
                <Link to={prev.frontmatter.path}>
                  {prev.frontmatter.title}
                </Link> : '(none)'
            }
          </h4>
          <div style={{flexGrow: 1, textAlign: 'center'}}>
            <h4><Link to="/">Home</Link></h4>
          </div>
          <h4>Next:{` `}
            {
              next ?
                <Link to={next.frontmatter.path}>
                  {next.frontmatter.title}
                </Link> : '(none)'
            }
          </h4>
        </div>
        <div className="comment">
          <CommentCount config={disqusConfig} placeholder={`...`} />
          <Disqus config={disqusConfig} />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

Template.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
  }),
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    prev: PropTypes.object,
  }).isRequired,
  location: PropTypes.object,
}

export default Template
