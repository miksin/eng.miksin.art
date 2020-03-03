import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import BaseButton from "@components/basic/BaseButton"
import { colors } from "@constants/common"

const Btn = styled(BaseButton)`
  padding: ${props => props.padding}px;
  background: ${props => props.bgColor};
  border-radius: 50%;
  ${props => props.isShadow ?
    'box-shadow: 1px 1px 15px 0px rgba(0, 0, 0, .2);' : ''}
`

const IconButton = ({
  children,
  className,
  color,
  size,
  isShadow,
  onClick,
}) => {
  return (
    <Btn
      className={className}
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
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  isShadow: PropTypes.bool,
  onClick: PropTypes.func,
}

IconButton.defaultProps = {
  children: null,
  className: '',
  color: colors.lightBlue,
  size: 56,
  isShadow: false,
  onClick: () => {},
}

export default IconButton

