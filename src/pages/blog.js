import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import _ from "lodash"
import { useBottomScrollListener } from "react-bottom-scroll-listener"

import FlexBox from "@components/basic/FlexBox"
import Underline from "@components/basic/Underline"
import Seo from "@components/seo"
import Nav from "@components/common/Nav"
import TopPad from "@components/common/TopPad"
import ListPreview from "@components/common/ListPreview"
import TypingDisplay from "@components/common/TypingDisplay"
import { colors, palatte, sizes, devices, displayPerTime } from "@constants/blog"
import { hexToRgba, mergeHash } from "@src/helpers"

const Base = styled(FlexBox)`
  min-height: 100vh;
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

const TagList = styled(FlexBox)`
  width: 100%;
`

const Tag = styled(FlexBox)`
  background-color: ${props => props.bgColor};
  color: ${colors.white};
  margin: 4px 2px;
  padding: 12px 24px;
  border-radius: 3px;
  text-align: center;

  & > .count {
    background-color: ${hexToRgba(colors.grey, 0.5)};
    border-radius: 50%;
    font-size: 14px;
    padding: 2px;
    width: 18px;
    height: 18px;
    text-align: center;
  }
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

  // extend display length when detect scroll to bottom
  const newDisplayNum = now => Math.min(allPosts.length, now + displayPerTime)
  const [displayNum, setDisplayNum] = useState(newDisplayNum(0))
  const [nonSenseImages] = useState(_.shuffle(data.nonSenseImages
    .edges.map(edge => edge.node.childImageSharp.fluid.src)))

  useBottomScrollListener(() => {
    setDisplayNum(newDisplayNum)
  })

  const posts = allPosts.slice(0, displayNum)
  const tagCounts = allPosts
    .flatMap(frontmatter => frontmatter.tags)
    .map(tag => ({ [tag.toLowerCase()]: 1 }))
    .reduce((a, b) => mergeHash(a, b), {})
  const tags = Object.keys(tagCounts)
    .map(tag => ({ name: tag, count: tagCounts[tag] }))
    .sort((a, b) => b.count - a.count)

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
        <Wrapper center column>
          <Title color={colors.lightBlue}>
            <TypingDisplay
              words={['RECENT POSTS']}
              color={colors.lightBlue}
              size={sizes.title}
              typeInterval={50}
              cursor={'_'}
            />
          </Title>
          <TagList wrap center>
            {tags.map(((tag, i) => (
              <Tag
                key={tag.name}
                bgColor={palatte[i % palatte.length]}
              >
                <span className="name">{tag.name}</span>
                <span className="count mg-l-4">{tag.count}</span>
              </Tag>
            )))}
          </TagList>
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
