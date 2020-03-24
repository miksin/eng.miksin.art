import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexBox from "@components/basic/FlexBox"
import { colors } from "@constants/common"
import { hexToRgba } from "@src/helpers"

const Base = styled(FlexBox)`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  padding: ${props => props.small ? '4px 10px' : '12px 24px'};
  border-radius: ${props => props.small ? '13px' : '3px'};
  text-align: center;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, .3);

  & > .name {
    font-size: 18px;
    white-space: nowrap;
  }

  & > .number {
    background-color: ${hexToRgba(colors.grey, 0.5)};
    border-radius: 10px;
    font-size: 14px;
    padding: 3px;
    min-width: 20px;
    height: 20px;
    text-align: center;
  }
`

const Tag = (props) => {
  const { text, number, bgColor, color } = props
  const showNumber = number !== null
  return (
    <Base center {...props}
      bgColor={bgColor}
      color={color}
    >
      <span className="name">{text}</span>
      {showNumber ? <span className="number mg-l-6">{number}</span> : null}
    </Base>
  )
}

Tag.propTypes = {
  text: PropTypes.string,
  number: PropTypes.number,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  small: PropTypes.bool,
}

Tag.defaultProps = {
  text: '',
  number: null,
  bgColor: colors.lightBlue,
  color: colors.white,
  small: false,
}

export default Tag
