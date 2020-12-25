import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import FlexBox from "@components/basic/FlexBox"
import Underline from "@components/basic/Underline"
import Seo from "@components/seo"
import Nav from "@components/common/Nav"
import TopPad from "@components/common/TopPad"
import GridView from "@components/GridView"
import GalleryItem from "@components/GalleryItem"
import TypingDisplay from "@components/common/TypingDisplay"
import { colors, sizes, devices, settings } from "@constants/gallery"
import { hexToRgba } from "@src/helpers"
import ModelFrontmatter from "@models/Frontmatter"

const Base = styled(FlexBox)`
`

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: ${devices.tablet}px;
  margin: 0 auto;
  padding: 12px;
`

const Title = styled(Underline)`
  padding: 24px 0;
`

const Gallery = () => {
  const data = useStaticQuery(graphql`
    query GalleryPageQuery {
      site {
        ...SiteMetaFragment
      }

      posts: allMarkdownRemark (
        filter: {frontmatter: {path: {regex: "/\/gallery\/.*/"}}}
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        ...ArticlePreviewFragment
      }
    }
  `)

  const {
    links,
  } = data.site.siteMetadata
  const allPosts = data.posts.edges.map(edge => new ModelFrontmatter(edge.node.frontmatter))

  // extend display length when detect scroll to bottom
  const newDisplayNum = now => Math.min(allPosts.length, now + settings.displayPerTime)
  const [displayNum, setDisplayNum] = useState(newDisplayNum(0))

  useBottomScrollListener(() => {
    setDisplayNum(newDisplayNum)
  })

  const posts = allPosts.slice(0, displayNum).map(frontmatter => {
    return {
      id: frontmatter.path,
      inverseRatio: frontmatter.featuredImage.inverseRatio,
      viewProps: {
        frontmatter: frontmatter,
      },
      viewType: GalleryItem,
    }
  })

  return (
    <>
      <Seo title="Gallery" />
      <Nav
        links={links}
        bgColor={hexToRgba(colors.white, 0.7)}
        iconColor={colors.lightBlue}
      />
      <Base column center>
        <TopPad />
        <Wrapper center column>
          <Title color={colors.lightBlue}>
            <TypingDisplay
              words={['GALLERY']}
              color={colors.lightBlue}
              size={sizes.title}
              typeInterval={50}
              cursor={'_'}
            />
          </Title>
          <GridView viewList={posts} />
        </Wrapper>
      </Base>
    </>
  )
}

export default Gallery
