import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors, sizes } from "../../constants/common"

const Btn = styled.button`
  cursor: pointer;
  font-size: 1rem;
  color: ${props => props.textColor};
  background: ${props => props.bgColor};
  outline: none;
  display: flex;
  flex-direction: ${props => props.flexDirection};
  justify-content: center;
  align-items: center;
  border-radius: ${props => props.bdRadius}px;
  border-width: ${props => props.bdWidth}px;
  border-style: solid;
  border-color: ${props => props.bdColor};
  padding: ${props => props.padding};
`

const TextButton = ({
  text,
  color,
  contrastColor,
  size,
  isOutlined,
  isRounded,
  icon,
  onClick,
}) => {
  const padding = sizes.buttonPadding[size] || 'normal'
  const borderWidth = isOutlined ? 2 : 0
  const borderRadius = isRounded ? 4 : 0
  const bgColor = isOutlined ? 'inherit' : color
  const textColor = isOutlined ? color : contrastColor

  return (
    <Btn
      bdColor={color}
      padding={padding}
      bdWidth={borderWidth}
      bdRadius={borderRadius}
      bgColor={bgColor}
      textColor={textColor}
      onClick={onClick}
      flexDirection={icon.isLeft ? 'row-reverse' : 'row'}
    >
      {text}
      {icon.Element ? <icon.Element color={textColor} size={22} /> : null}
    </Btn> 
  )
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  contrastColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  isOutlined: PropTypes.bool,
  isRounded: PropTypes.bool,
  icon: PropTypes.shape({
    Element: PropTypes.elementType,
    isLeft: PropTypes.bool,
  }),
  onClick: PropTypes.func,
}

TextButton.defaultProps = {
  color: colors.lightBlue,
  contrastColor: colors.white,
  size: 'normal',
  isOutlined: false,
  isRounded: false,
  icon: {
    Element: null,
    isLeft: false,
  },
  onClick: () => {},
}

export default TextButton
