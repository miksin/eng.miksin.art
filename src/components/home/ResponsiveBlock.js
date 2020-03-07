import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexBox from "@components/basic/FlexBox"
import { toDualColors } from "@src/helpers"
import { devices, sizes, colors } from "@constants/home"

const Wrapper = styled(FlexBox)`
  margin: 0;
  width: 100%;
  min-height: ${props => props.minHeight};
  padding 12px;
  padding-top: ${sizes.nav}px !important;
  background: linear-gradient(to right, ${props => props.bgColors[0]}, ${props => props.bgColors[1]});

  @media screen and (max-width: ${devices.mobile}px) {
    padding-top: ${sizes.navMobile}px !important;
  }
`

const Inner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: ${devices.tablet}px;
  height: 100%;
`

const ResponsiveBlock = ({ children, id, bgColors }) => {
  const [vh, setVh] = useState(undefined)
  useEffect(() => {
    /* eslint-disable no-undef */
    // set window height (prevent url bar problems in mobile)
    if (window) {
      setVh(window.innerHeight)
    }
    /* eslint-enable no-undef */
  }, [])

  const minHeight = vh ? `${vh - sizes.nav}px` : `calc(100vh - ${sizes.nav}px)`

  return (
    <Wrapper
      center
      id={id}
      bgColors={toDualColors(bgColors)}
      minHeight={minHeight}
    >
      <Inner>{children}</Inner>
    </Wrapper>
  )
}

ResponsiveBlock.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  bgColors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
}

ResponsiveBlock.defaultProps = {
  children: null,
  id: null,
  bgColors: colors.white,
}

export default ResponsiveBlock
