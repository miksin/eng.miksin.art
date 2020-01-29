import React, { useState, useEffect } from "react"

import Banner from "../components/Banner"
import TypingDisplay from "../components/TypingDisplay"
import EntryLink from "../components/EntryLink"
import * as homeConst from "../constants/home"

const IndexPage = () => {
  const [vh, setVh] = useState(undefined)
  useEffect(() => {
    /* eslint-disable no-undef */
    if (window) setVh(window.innerHeight)
    /* eslint-enable no-undef */
  }, [])

  const bannerStyles = {}
  if (vh) bannerStyles.minHeight = vh

  return (
    <Banner styles={bannerStyles}>
      <TypingDisplay size={32} words={['Title']} />
      <TypingDisplay size={24} words={['Sub Title', 'typing title']} />
      <EntryLink direction="down" size={homeConst.ENTRY_LINK_SIZE} />
    </Banner>
  )
}

export default IndexPage
