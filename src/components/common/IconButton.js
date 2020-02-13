import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors } from "../../constants/common"

const Btn = styled.button`
  cursor: pointer;
  padding: ${props => props.padding}px;
  background: ${props => props.bgColor};
  outline: none;
  border-radius: 50%;
  border-width: 0;
  ${props => props.isShadow ?
    'box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, .2);' : ''}
`

const IconButton = ({
  children,
  color,
  size,
  isShadow,
  onClick,
}) => {
  return (
    <Btn
      bdColor={color}
      padding={size * 0.1}
      bgColor={color}
      isShadow={isShadow}
      onClick={onClick}
    >
      {children}
    </Btn> 
  )
}

IconButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.number,
  isShadow: PropTypes.bool,
  onClick: PropTypes.func,
}

IconButton.defaultProps = {
  children: null,
  color: colors.lightBlue,
  size: 56,
  isShadow: false,
  onClick: () => {},
}

export default IconButton

