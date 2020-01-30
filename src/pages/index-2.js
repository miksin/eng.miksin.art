import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Banner from "../components/Banner"
import TypingDisplay from "../components/TypingDisplay"
import EntryLink from "../components/EntryLink"
import ScrollTitleWrapper from "../components/ScrollTitleWrapper"

import { scrollToAnchor } from "../helpers"
import { sizes } from "../constants/home"

const Block = styled.div`
  min-height: 600px;
  min-width: 600px;
  border-style: solid;
  border-width: 2px;
`

const IndexPage = () => {
  const [vh, setVh] = useState(undefined)
  useEffect(() => {
    /* eslint-disable no-undef */

    // set window height (prevent url bar problems in mobile)
    if (window) setVh(window.innerHeight)

    /* eslint-enable no-undef */
  }, [])

  const bannerStyles = {}
  if (vh) bannerStyles.minHeight = vh

  return (
    <>
      <Banner styles={bannerStyles}>
        <TypingDisplay
          size={sizes.title}
          words={['Title']}
        />
        <TypingDisplay
          size={sizes.subtitle}
          words={['Sub Title', 'typing title']}
        />
        <EntryLink
          direction="down"
          size={sizes.entryLink}
          onClick={() => scrollToAnchor('test-1')}
        />
      </Banner>
      <ScrollTitleWrapper title="Title" >
        <Block id="test-1" />
      </ScrollTitleWrapper>
    </>
  )
}

export default IndexPage
