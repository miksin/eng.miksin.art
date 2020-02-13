import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { colors } from "../../constants/common"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 25;
  background: ${props => props.background};
  transform: translateY(-100%);
  transition: transform 0.25s ease;

  &.active {
    transform: translateY(0);
  }
`

const ScreenWrapper = ({ children, isActive, onClick, bgColors }) => {
  const background = `linear-gradient(to left, ${bgColors[0]}, ${bgColors[1]})`

  return (
    <Wrapper
      className={isActive ? ['active'] : []}
      background={background}
      onClick={onClick}
    >
      {children}
    </Wrapper>
  )
}

ScreenWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  bgColors: PropTypes.arrayOf(PropTypes.string),
}

ScreenWrapper.defaultProps = {
  isActive: false,
  onClick: () => {},
  bgColors: [colors.lightBlue, colors.lightBlue],
}

export default ScreenWrapper
