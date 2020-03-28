import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import { Disqus, CommentCount } from "gatsby-plugin-disqus"

import { colors, devices } from "@constants/blog"
import FlexBox from "@components/basic/FlexBox"
import TopPad from "@components/common/TopPad"
import Nav from "@components/common/Nav"
import Tag from "@components/common/Tag"
import Seo from '@components/seo'
import { hexToRgba } from "@src/helpers"

const Base = styled(FlexBox)`
`

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: ${devices.tabletPortrait}px;
  margin: 0 auto;
  padding: 12px;
`

const Frontmatter = styled(FlexBox)`
  width: 100%;
  padding: 12px;
`

const Title = styled.h1`
`

const Timestamp = styled.h4`
`

const Content = styled.div`
  padding: 12px;

  a {
    font-weight: 700 !important;
    color: inherit !important;
  }
`

const Comment = styled.div`
  width: 100%;
  margin: 12px auto;
  border-top: 1px solid ${colors.grey};
`

const TagList = styled(FlexBox)`
`

function Template({
  data: {
    page: {
      frontmatter,
      html,
    },
    site,
  },
  pageContext: {
    next,
    prev,
  },
}) {
  const { links } = site.siteMetadata

  let disqusConfig = {
    identifier: frontmatter.path,
    title: frontmatter.title,
  }

  return (
    <>
      <Seo title={frontmatter.title} />
      <Nav
        links={links}
        bgColor={hexToRgba(colors.white, 0.7)}
        iconColor={colors.lightBlue}
      />
      <Base column center>
        <TopPad />
        <Wrapper center column>
          <Frontmatter column>
            <Title>{frontmatter.title}</Title>
            <Timestamp>{frontmatter.date}</Timestamp>
            <TagList>
              {frontmatter.tags.map(tag => (
                <Tag key={tag} text={tag} className="mg-lr-2" small />
              ))}
            </TagList>
          </Frontmatter>
          <Content dangerouslySetInnerHTML={{ __html: html }} />
          <Comment>
            <CommentCount config={disqusConfig} placeholder={`...`} />
            <Disqus config={disqusConfig} />
          </Comment>
        </Wrapper>
      </Base>
    </>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    site {
      ...SiteMetaFragment
    }

    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`

Template.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    site: PropTypes.object,
  }),
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    prev: PropTypes.object,
  }).isRequired,
  location: PropTypes.object,
}

export default Template
