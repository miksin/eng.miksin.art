import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import VisibilitySensor from "react-visibility-sensor"

import TypingDisplay from "../components/TypingDisplay"

import { colors, sizes, devices } from "../constants/home"

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  margin: 24px 0px;
`

const GrowPad = styled.div`
  flex-grow: 1;
  position: relative;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  flex-wrap: nowrap;
  width: 100%;
`

const Title = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  flex-wrap: nowrap;
  width: 60%;
  padding: 24px 12px;
  background-color: ${(props) => props.bgColor};

  @media screen and (max-width: ${devices.mobile}px) {
    width: 80%;
  }
`

const ChildrenWrapper = styled.div`
  padding: 24px 12px;
  margin: 0 auto;
  width: 100%;
  max-width: ${devices.tablet}px;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ScrollTitleWrapper = ({
  children,
  title,
  direction,
  bgColor,
  textColor
}) => {
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState(sizes.scrollTitle)

  useEffect(() => {
    /* eslint-disable no-undef */
    if (window && window.innerWidth <= devices.mobile) {
      setSize(sizes.scrollTitleMobile)
    }
    /* eslint-enable no-undef */
  }, [])

  const flexDirection = direction === 'right' ? 'row-reverse' : 'row'
  const titleAlign = direction === 'right' ? 'right: 0;' : 'left: 0;'

  return (
    <VisibilitySensor
      partialVisibility={['top', 'bottom', 'left', 'right']}
      offset={{ top: 10, bottom: 10 }}
      onChange={setVisible}
    >
      <Wrapper flexDirection={flexDirection}>
        <TitleWrapper flexDirection={flexDirection}>
          <Title
            flexDirection={flexDirection}
            bgColor={bgColor}
            align={titleAlign}
          >
            <GrowPad />
            <TypingDisplay
              words={visible ? [title] : []}
              color={textColor}
              size={size}
              typeInterval={200}
              cursor={''}
            />
          </Title>
          <GrowPad />
        </TitleWrapper>
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
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
