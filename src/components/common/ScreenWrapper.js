import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 25;
`

const ScreenWrapper = ({ children, isActive, onClick, bgColor }) => (
  <Wrapper
    style={{
      display: isActive ? 'block' : 'none',
      backgroundColor: bgColor,
    }}
    onClick={onClick}
  >
    {children}
  </Wrapper>
)

ScreenWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
}

ScreenWrapper.defaultProps = {
  isActive: false,
  onClick: () => {},
  bgColor: 'rgba(255, 255, 255, .9)',
}

export default ScreenWrapper
