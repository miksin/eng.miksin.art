import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import Nav from "../components/Nav"
import Banner from "../components/Banner"
import Footer from "../components/footer"
import TypingDisplay from "../components/TypingDisplay"
import ScrollTitleWrapper from "../components/ScrollTitleWrapper"

import { scrollToAnchor } from "../helpers"
import { sizes, colors } from "../constants/home"

const Block = styled.div`
  min-height: 600px;
  min-width: 600px;
`

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
          subtitles
          description
          author
          links {
            name
            path
          }
          socialLinks {
            name
            link
          }
        }
      }
    }
  `)

  const [vh, setVh] = useState(undefined)
  useEffect(() => {
    /* eslint-disable no-undef */

    // set window height (prevent url bar problems in mobile)
    if (window) setVh(window.innerHeight)

    /* eslint-enable no-undef */
  }, [])

  const bannerStyles = {}
  if (vh) bannerStyles.minHeight = vh

  const {
    title,
    subtitles,
    description,
    author,
    links
  } = data.site.siteMetadata

  return (
    <>
      <Nav
        height={sizes.nav}
        links={links}
      />
      <Banner
        styles={bannerStyles}
        onEntry={() => scrollToAnchor('test-1', sizes.nav)}
        words={{
          title: [title],
          subtitle: subtitles
        }}
      />
      <ScrollTitleWrapper
        title="Title"
        direction={'left'}
        bgColor={colors.pink}
      >
        <Block id="test-1" />
      </ScrollTitleWrapper>
      <ScrollTitleWrapper
        title="Title"
        direction={'right'}
        bgColor={colors.indigo}
      >
        <Block id="test-2" />
      </ScrollTitleWrapper>
      <Footer
        siteAuthor={author}
      />
    </>
  )
}

export default IndexPage
