import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from "react-feather"

const Wrapper = styled.button`
  background: inherit;
  border-style: none;
  outline: none;
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
  onClick
}) => {
  const Icon = icons[direction] || ChevronDown

  return (
    <Wrapper onClick={onClick}>
      <Icon color={color} size={size} />
    </Wrapper>
  )
}

EntryLink.propTypes = {
  direction: PropTypes.oneOf(['up', 'left', 'right', 'down']),
  color: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func
}

EntryLink.defaultTypes = {
  direction: 'down',
  color: '#424242',
  size: 42,
  onClick: () => {}
}

export default EntryLink
