import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import VisibilitySensor from "react-visibility-sensor"

import Banner from "../components/Banner"
import TypingDisplay from "../components/TypingDisplay"
import EntryLink from "../components/EntryLink"
import { scrollToAnchor } from "../helpers"
import * as homeConst from "../constants/home"

const Block = styled.div`
  min-height: 600px;
  border-style: solid;
  border-width: 2px;
`

const DetectionArea = styled.div`
  position: fixed;
  width: 100%;
  height: 1px;
  left: 0;
  top: 0;
  opacity: 0;
`

const IndexPage = () => {
  const detectRef = useRef(null)

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
      <DetectionArea ref={detectRef} />
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
      <VisibilitySensor
        containment={detectRef.current}
        partialVisibility={['top', 'bottom', 'left', 'right']}
        onChange={(e) => console.log('test-1', e)}
      >
        <Block id="test-1" />
      </VisibilitySensor>
      <VisibilitySensor
        containment={detectRef.current}
        partialVisibility={['top', 'bottom', 'left', 'right']}
        onChange={(e) => console.log('test-2', e)}
      >
        <Block id="test-2" />
      </VisibilitySensor>
      <VisibilitySensor
        containment={detectRef.current}
        partialVisibility={['top', 'bottom', 'left', 'right']}
        onChange={(e) => console.log('test-3', e)}
      >
        <Block id="test-3" />
      </VisibilitySensor>
      <VisibilitySensor
        containment={detectRef.current}
        partialVisibility={['top', 'bottom', 'left', 'right']}
        onChange={(e) => console.log('test-4', e)}
      >
        <Block id="test-4" />
      </VisibilitySensor>
    </>
  )
}

export default IndexPage
