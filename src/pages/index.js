import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GridView from '../components/GridView'
import ExcerptCard from '../components/ExcerptCard'
import GalleryItem from '../components/GalleryItem'

const IndexPage = ({ location, displayPerTime }) => {
  const data = useStaticQuery(graphql`
    {
      posts: allMarkdownRemark(
        filter: {frontmatter: {path: {regex: "/\/(blog|gallery)\/.*/"}}}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 10
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              excerpt
              fromNow: date(fromNow: true)
              date: date(formatString: "YYYY-MM-DD")
              featuredImage {
                childImageSharp {
                  fluid {
                    src
                    aspectRatio
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  // extend display length when detect scroll to bottom
  const newDisplayNum = now => Math.min(data.posts.edges.length, now + displayPerTime)
  const [display, setDisplay] = useState(newDisplayNum(0))
  useBottomScrollListener(() => {
    setDisplay(newDisplayNum(display))
  })

  const posts = data.posts.edges.slice(0, display).map(edge => {
    const { frontmatter } = edge.node
    const category = frontmatter.path.match(/^\/(.*?)\//)[1]
    const viewType = category === 'gallery' ? GalleryItem : ExcerptCard
    let inverseRatio = category === 'blog' ? 0.5 : 0
    if (frontmatter.featuredImage) {
      inverseRatio += 1 / frontmatter.featuredImage.childImageSharp.fluid.aspectRatio
    }

    return {
      id: frontmatter.path,
      inverseRatio,
      viewProps: {
        frontmatter: edge.node.frontmatter,
      },
      viewType,
    }
  })

  return (
    <Layout location={location}>
      <SEO title="Home" />
      <div className="center-view">
        <h2>Recents</h2>
        <div className="latest-post-list">
          <GridView
            viewList={posts}
          />
        </div>
      </div>
    </Layout>
  )
}

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  displayPerTime: PropTypes.number
}

IndexPage.defaultProps = {
  displayPerTime: 20
}

export default IndexPage
