import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors } from "../../constants/common"

const Btn = styled.button`
  cursor: pointer;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  padding: ${props => props.padding}px;
  background: ${props => props.bgColor};
  outline: none;
  border-radius: 50%;
  border-width: 0;
  box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, .2);
`

const FloatButton = ({
  children,
  color,
  size,
  onClick,
}) => {
  return (
    <Btn
      bdColor={color}
      padding={size * 0.1}
      bgColor={color}
      onClick={onClick}
    >
      {children}
    </Btn> 
  )
}

FloatButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func,
}

FloatButton.defaultProps = {
  children: null,
  color: colors.lightBlue,
  size: 56,
  onClick: () => {},
}

export default FloatButton

