import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors } from "@constants/common"

const Wrapper = styled.div`
  &:after {
    content: " ";
    display: block;
    width: ${props => props.width}px;
    height: 1px;
    margin-top: ${props => props.distance}px;
    margin-left: auto;
    margin-right: auto;
    background: ${props => props.color};
  }
`

const Underline = (props) => {
  const {
    children,
    width,
    color,
    distance,
  } = props

  return (
    <Wrapper
      {...props}
      width={width}
      color={color}
      distance={distance}
    >
      {children}
    </Wrapper>
  )
}

Underline.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number,
  color: PropTypes.string,
  distance: PropTypes.number,
}

Underline.defaultProps = {
  children: null,
  width: 55,
  color: colors.grey,
  distance: 16,
}

export default Underline
