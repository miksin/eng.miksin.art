import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Banner from "../components/Banner"
import TypingDisplay from "../components/TypingDisplay"
import EntryLink from "../components/EntryLink"
import { scrollToAnchor } from "../helpers"
import * as homeConst from "../constants/home"

const Block = styled.div`
  min-height: 600px;
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
          size={homeConst.TITLE_SIZE}
          words={['Title']}
        />
        <TypingDisplay
          size={homeConst.SUBTITLE_SIZE}
          words={['Sub Title', 'typing title']}
        />
        <EntryLink
          direction="down"
          size={homeConst.ENTRY_LINK_SIZE}
          onClick={() => scrollToAnchor('test-1')}
        />
      </Banner>
      <Block id="test-1" />
      <Block id="test-2" />
      <Block id="test-3" />
      <Block id="test-4" />
    </>
  )
}

export default IndexPage
