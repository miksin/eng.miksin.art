import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Banner from "../components/Banner"
import TypingDisplay from "../components/TypingDisplay"

const EntryLink = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  :hover {
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, .3);
  }
`

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
      <EntryLink />
    </Banner>
  )
}

export default IndexPage
