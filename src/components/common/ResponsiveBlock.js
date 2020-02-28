import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexBox from "../basic/FlexBox"
import { toDualColors } from "../../helpers"
import { devices, sizes, colors } from "../../constants/home"

const Wrapper = styled(FlexBox)`
  margin: 0;
  width: 100%;
  min-height: 100vh;
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
  return (
    <Wrapper
      center
      id={id}
      bgColors={toDualColors(bgColors)}
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
