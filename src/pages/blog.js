import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled from "styled-components"
import _ from "lodash"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import FlexBox from "@components/basic/FlexBox"
import Seo from "@components/seo"
import Nav from "@components/common/Nav"
import TopPad from "@components/common/TopPad"
import ListPreview from "@components/common/ListPreview"
import { colors, sizes, devices, displayPerTime } from "@constants/blog"
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
  const allPosts = data.posts.edges.map(edge => edge.node.frontmatter)
  const nonSenseImages = _.shuffle(data.nonSenseImages.edges.map(edge => edge.node.childImageSharp.fluid.src))

  // extend display length when detect scroll to bottom
  const newDisplayNum = now => Math.min(allPosts.length, now + displayPerTime)
  const [displayNum, setDisplayNum] = useState(newDisplayNum(0))
  useBottomScrollListener(() => {
    setDisplayNum(newDisplayNum)
  })

  const posts = allPosts.slice(0, displayNum)

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
