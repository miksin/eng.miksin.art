import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "styled-components"
import _ from "lodash"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import FlexBox from "@components/basic/FlexBox"
import Seo from "@components/seo"
import Nav from "@components/common/Nav"
import TopPad from "@components/common/TopPad"
import ListPreview from "@components/home/ListPreview"
import { colors, sizes, devices } from "@constants/blog"
import { hexToRgba } from "@src/helpers"

const Base = styled(FlexBox)`
  min-height: 100vh;
`

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: ${devices.tablet}px;
  margin: 0 auto;
  padding: 12px;
`

const Blog = () => {
  const data = useStaticQuery(graphql`
    query BlogPageQuery {
      site {
        ...SiteMetaFragment
      }

      posts: allMarkdownRemark (
        filter: {frontmatter: {path: {regex: "/\/blog\/.*/"}}}
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        ...ArticlePreviewFragment
      }

      nonSenseImages: allFile (
        filter: {extension: {regex: "/(jpg)|(png)|(jpeg)/"}, relativeDirectory: {eq: "nonsense"}}
      ) {
        edges {
          node {
            ...FeaturedImageFragment
          }
        }
      }
    }
  `)

  const {
    links,
  } = data.site.siteMetadata

  const [displayNum, setDisplayNum] = useState(15)
  const posts = data.posts.edges.map(edge => edge.node.frontmatter).slice(0, displayNum)
  const nonSenseImages = _.shuffle(data.nonSenseImages.edges.map(edge => edge.node.childImageSharp.fluid.src))

  return (
    <>
      <Seo title="Blog" />
      <Nav
        links={links}
        bgColor={hexToRgba(colors.white, 0.7)}
        iconColor={colors.lightBlue}
      />
      <Base column center>
        <TopPad />
        <Wrapper>
          <ListPreview articles={posts.map((frontmatter, index) => ({
            ...frontmatter,
            thumbnailSrc: nonSenseImages[index % nonSenseImages.length],
            thumbnailAlt: 'post',
          }))} />
        </Wrapper>
      </Base>
    </>
  )
}

export default Blog
