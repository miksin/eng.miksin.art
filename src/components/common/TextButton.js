import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors, sizes } from "../../constants/common"

const Btn = styled.button`
  font-size: 1rem;
  background: ${props => props.bgColor};
  outline: none;
  display: flex;
  flex-direction: ${props => props.flexDirection};
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
  icon,
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
      flexDirection={icon.isLeft ? 'row-reverse' : 'row'}
    >
      {text}
      {icon.Element ? <icon.Element color={color} size={16} /> : null}
    </Btn> 
  )
}

TextButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  isOutlined: PropTypes.bool,
  icon: PropTypes.shape({
    Element: PropTypes.elementType,
    isLeft: PropTypes.bool,
  }),
  onClick: PropTypes.func,
}

TextButton.defaultProps = {
  color: colors.lightBlue,
  size: 'normal',
  isOutlined: false,
  icon: {
    Element: null,
    isLeft: false,
  },
  onClick: () => {},
}

export default TextButton
