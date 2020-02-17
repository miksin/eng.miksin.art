import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { devices, sizes } from "../../constants/home"

const Wrapper = styled.section`
  margin: 0 auto;
  max-width: ${devices.tablet}px;
  width: 100%;
  min-height: 100vh;
  padding 12px;
  padding-top: ${sizes.nav}px !important;

  @media screen and (max-width: ${devices.mobile}px) {
    padding-top: ${sizes.navMobile}px !important;
  }
`

const ResponsiveBlock = ({ children, id }) => {
  return (
    <Wrapper id={id}>
      {children}
    </Wrapper>
  )
}

ResponsiveBlock.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
}

ResponsiveBlock.defaultProps = {
  children: null,
  id: null,
}

export default ResponsiveBlock

