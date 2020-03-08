import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

// https://css-tricks.com/aspect-ratio-boxes/
const Wrapper = styled.div`
  width: 100%;
  min-height: ${props => props.minHeight}px;
  ${props => props.extCss}
`

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const FixedAspectRatioBox = ({ ratio, children }) => {
  const extCss = css`
    position: relative;
    &:before {
      content: "";
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      padding-top: ${ratio * 100}%;
    }
    &:after { /* to clear float */
      content: "";
      display: table;
      clear: both;
    }
  `

  const wrapperRef = useRef(null)
  const [cw, setCw] = useState(0)
  const [isStatic, setIsStatic] = useState(true)
  useEffect(() => {
    if (wrapperRef.current) {
      setCw(wrapperRef.current.clientWidth)
      setIsStatic(false)
    }
  }, [])

  return (
    <Wrapper
      ref={wrapperRef}
      minHeight={cw * ratio}
      extCss={isStatic ? extCss : css``}
    >
      {isStatic ? <Container>{children}</Container> : children}
    </Wrapper>
  )
}

FixedAspectRatioBox.propTypes = {
  ratio: PropTypes.number,
  children: PropTypes.node,
}

FixedAspectRatioBox.defaultProps = {
  ratio: 1,
  children: null,
}

export default FixedAspectRatioBox
