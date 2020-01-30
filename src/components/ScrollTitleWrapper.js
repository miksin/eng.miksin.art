import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import VisibilitySensor from "react-visibility-sensor"

import TypingDisplay from "../components/TypingDisplay"
import EntryLink from "../components/EntryLink"

import { colors, sizes } from "../constants/home"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  flex-wrap: nowrap;
`

const GrowPad = styled.div`
  flex-grow: 1;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  flex-wrap: nowrap;
  width: 100%;
  margin-top: 24px;
  padding: 24px 12px;
  background-color: ${(props) => props.bgColor};
`

const ChildrenWrapper = styled.div`
  padding
`

const ScrollTitleWrapper = ({
  children,
  title,
  direction,
  bgColor,
  textColor
}) => {
  const [visible, setVisible] = useState(false)
  const flexDirection = direction === 'right' ? 'row-reverse' : 'row'
  const linkDirection = direction === 'right' ? 'left' : 'right'

  return (
    <VisibilitySensor
      partialVisibility={['top', 'bottom', 'left', 'right']}
      offset={{ top: 10, bottom: 10 }}
      onChange={setVisible}
    >
      <Wrapper flexDirection={flexDirection}>
        <GrowPad>
          <TitleWrapper
            flexDirection={flexDirection}
            bgColor={bgColor}
          >
            <GrowPad />
            <TypingDisplay
              words={visible ? [title] : []}
              color={textColor}
              size={sizes.scrollTitle}
              typeInterval={200}
              cursor={''}
            />
          </TitleWrapper>
        </GrowPad>
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
        <EntryLink
          direction={linkDirection}
          color={colors.pink}
          size={sizes.entryLink}
          onClick={() => {}}
        />
      </Wrapper>
    </VisibilitySensor>
  )
}

ScrollTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  direction: PropTypes.oneOf(['left', 'right']),
  bgColor: PropTypes.string,
  textColor: PropTypes.string
}

ScrollTitleWrapper.defaultProps = {
  title: '',
  direction: 'left',
  bgColor: colors.pink,
  textColor: '#FFFFFF'
}

export default ScrollTitleWrapper
