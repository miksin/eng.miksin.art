import React from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "react-feather"

import { toDualColors } from "../helpers"

const moves = {
  down: keyframes`
    from { transform: translate(0, 0); opacity: .5; }
    to { transform: translate(0, 100%); opacity: .1; }
  `,
  up: keyframes`
    from { transform: translate(0, 0); opacity: .5; }
    to { transform: translate(0, -100%); opacity: .1; }
  `,
  left: keyframes`
    from { transform: translate(0, 0); opacity: .5; }
    to { transform: translate(-100%, 0); opacity: .1; }
  `,
  right: keyframes`
    from { transform: translate(0, 0); opacity: .5; }
    to { transform: translate(100%, 0); opacity: .1; }
  `,
}

const Wrapper = styled.button`
  position: relative;
  background: inherit;
  border-style: none;
  outline: none;
  cursor: pointer;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`

const IconWrapper = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: 0;
  top: 0;
  animation-name: ${props => props.animation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`

const icons = {
  up: ChevronUp,
  left: ChevronLeft,
  right: ChevronRight,
  down: ChevronDown
}

const EntryLink = ({
  direction,
  color,
  size,
  shadow,
  onClick
}) => {
  const Icon = icons[direction] || ChevronDown
  const animation = shadow ? moves[direction] : null
  const iconColors = toDualColors(color)

  return (
    <Wrapper onClick={onClick} size={size}>
      {
        shadow ? (
          <IconWrapper size={size} animation={animation}>
            <Icon color={iconColors[1]} size={size} />
          </IconWrapper>
        ) : null
      }
      <IconWrapper size={size}>
        <Icon color={iconColors[0]} size={size} />
      </IconWrapper>
    </Wrapper>
  )
}

EntryLink.propTypes = {
  direction: PropTypes.oneOf(['up', 'left', 'right', 'down']),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.number,
  shadow: PropTypes.bool,
  onClick: PropTypes.func
}

EntryLink.defaultTypes = {
  direction: 'down',
  color: '#424242',
  size: 42,
  shadow: false,
  onClick: () => {}
}

export default EntryLink
