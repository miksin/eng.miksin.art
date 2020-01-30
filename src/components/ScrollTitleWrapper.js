import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import VisibilitySensor from "react-visibility-sensor"

import TypingDisplay from "../components/TypingDisplay"

import { colors } from "../constants/home"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const TitleWrapper = styled.div`
  background-color: ${colors.pink};
  padding: 16px 12px;
  flex-grow: 1;
`

const ScrollTitleWrapper = ({
  children,
  title
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <VisibilitySensor
      partialVisibility={['top', 'bottom', 'left', 'right']}
      offset={{ top: 10, bottom: 10 }}
      onChange={setVisible}
    >
      <Wrapper>
        <TitleWrapper>
          <TypingDisplay
            words={visible ? [title] : []}
            typeInterval={200}
          />
        </TitleWrapper>
        {children}
      </Wrapper>
    </VisibilitySensor>
  )
}

ScrollTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}

ScrollTitleWrapper.defaultProps = {
  title: ''
}

export default ScrollTitleWrapper
