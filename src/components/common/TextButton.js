import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors, sizes } from "../../constants/common"

const Btn = styled.button`
  background: ${props => props.bgColor};
  outline: none;
  display: flex;
  justify-content: center;
  align-item: center;
  border-width: ${props => props.bdWidth}px;
  border-style: solid;
  border-color: ${props => props.bdColor};
  padding: ${props => props.padding};
`

const TextButton = ({
  text,
  color,
  size,
  isOutlined,
  onClick,
}) => {
  const padding = sizes.buttonPadding[size] || 'normal'
  const borderWidth = isOutlined ? 0 : 2
  const bgColor = isOutlined ? 'inherit' : color

  return (
    <Btn
      bdColor={color}
      padding={padding}
      bdWidth={borderWidth}
      bgColor={bgColor}
      onClick={onClick}
    >{text}</Btn> 
  )
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  isOutlined: PropTypes.bool,
  onClick: PropTypes.func,
}

TextButton.defaultProps = {
  color: colors.lightBlue,
  size: 'normal',
  isOutlined: false,
  onClick: () => {},
}

export default TextButton
