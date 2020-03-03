import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors } from "@constants/common"

const Wrapper = styled.div`
  display: flex;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  min-width: ${props => props.size}px;
  min-height: ${props => props.size}px;
  overflow: hidden;
  border-style: solid;
  border-width: ${props => props.border.size}px;
  border-color: ${props => props.border.color};
  border-radius: ${props => props.borderRadius};
  margin: 12px;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
`

const borderRadius = {
  normal: '0',
  rounded: '5%',
  circle: '50%',
}

const Avatar = ({
  src,
  size,
  alt,
  mode,
  border,
}) => {
  return (
    <Wrapper
      size={size}
      border={border}
      borderRadius={borderRadius[mode] || 'normal'}
    >
      <Img src={src} alt={alt} />
    </Wrapper>
  )
}

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  alt: PropTypes.string,
  mode: PropTypes.oneOf(['normal', 'circle', 'rounded']),
  border: PropTypes.shape({
    size: PropTypes.number,
    color: PropTypes.string,
  })
}

Avatar.defaultProps = {
  src: '',
  size: 100,
  alt: 'avatar',
  mode: 'normal',
  border: {
    size: 2,
    color: colors.pink,
  },
}

export default Avatar
