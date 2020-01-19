import React, { useState } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { useBottomScrollListener } from "react-bottom-scroll-listener"
import GridView from "../components/GridView"
import GalleryItem from "../components/GalleryItem"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Gallery = ({
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
    const { frontmatter } = edge.node
    const inverseRatio = 1 / frontmatter.featuredImage.childImageSharp.fluid.aspectRatio

    return {
      id: frontmatter.path,
      inverseRatio,
      viewProps: {
        frontmatter: edge.node.frontmatter,
      },
      viewType: GalleryItem,
    }
  })

  return (
    <Layout location={location}>
      <SEO title="Gallery" />
      <div className="gallery">
        <GridView
          viewList={posts}
        />
        <div className="display-num-nav">
          <h4>{display} / {data.posts.edges.length} Posts</h4>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query GalleryPageQuery {
    posts: allMarkdownRemark(
      filter: {frontmatter: {path: {regex: "/\/gallery\/.*/"}}}
      sort: { order: DESC, fields: [frontmatter___date] }
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
`

Gallery.propTypes = {
  displayPerTime: PropTypes.number,
  data: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string,
            excerpt: PropTypes.string,
            fromNow: PropTypes.string,
            date: PropTypes.string,
            featuredImage: PropTypes.shape({
              childImageSharp: PropTypes.shape({
                fluid: PropTypes.shape({
                  src: PropTypes.string.isRequired,
                  aspectRatio: PropTypes.number.isRequired
                })
              })
            })
          }).isRequired
        }).isRequired
      })).isRequired
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired,
}

Gallery.defaultProps = {
  displayPerTime: 10,
}

export default Gallery
