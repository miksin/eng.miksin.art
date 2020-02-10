import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import EntryLink from "../components/EntryLink"
import TypingDisplay from "../components/TypingDisplay"

import { sizes, devices, colors } from "../constants/home"

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const Container = styled.div`
  width: 350px;
  display:flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: ${devices.mobile}px) {
    width: 95%;
  }
`

const LinkWrapper = styled.div`
  position: absolute;
  bottom: ${sizes.nav}px;
`

const PaddingWrapper = styled.div`
  margin-top: ${sizes.subtitle * 0.75}px;
`

const Banner = ({
  words: { title, subtitle },
  styles,
  onEntry
}) => {
  const [vw, setVw] = useState(undefined)
  useEffect(() => {
    /* eslint-disable no-undef */

    // set window height (prevent url bar problems in mobile)
    if (window) setVw(window.innerWidth)

    /* eslint-enable no-undef */
  }, [])

  return (
    <Wrapper style={styles}>
      <Container>
        <TypingDisplay
          size={sizes.title}
          words={title}
          typeInterval={100}
          color={[colors.lime, colors.lightBlue]}
        />
        <PaddingWrapper paddingLeft={vw <= devices.mobile ? 0 : sizes.title}>
          <TypingDisplay
            size={sizes.subtitle}
            words={subtitle}
            cursor={'/'}
            animation={'roll'}
            typeInterval={100}
            delInterval={60}
            color={[colors.lightBlue, colors.lime]}
          />
        </PaddingWrapper>
      </Container>
      <LinkWrapper>
        <EntryLink
          direction="down"
          size={sizes.entryLink}
          onClick={onEntry}
          shadow
          color={[colors.lightBlue, colors.lightGreen]}
        />
      </LinkWrapper>
    </Wrapper>
  )
}

Banner.propTypes = {
  words: PropTypes.shape({
    title: PropTypes.arrayOf(PropTypes.string).isRequired,
    subtitle: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  styles: PropTypes.object,
  onEntry: PropTypes.func
}

Banner.defaultProps = {
  styles: {},
  onEntry: () => {}
}

export default Banner
