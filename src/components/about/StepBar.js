import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexBox from "@components/basic/FlexBox"
import { colors } from "@constants/about"

const Container = styled.div`
  width: 100%;
`

const Bar = styled(FlexBox)`
  width: 100%;
`

const Cell = styled.div`
  background-color: ${props => props.color};
  height: 32px;
  flex-grow: 1;
`

const Title = styled.h3`
`

const StepBar = ({ title, step, filled, fillColor, baseColor }) => {
  const cells = new Array(Math.max(step, 1)).fill({}).map((_, index) => ({
    index,
    color: filled > index ? fillColor : baseColor,
  }))

  return (
    <Container>
      <Title>{title}</Title>
      <Bar>
        {cells.map(c => <Cell key={c.index} color={c.color} className="mg-lr-2" />)}
      </Bar>
    </Container>
  )
}

StepBar.propTypes = {
  title: PropTypes.string,
  step: PropTypes.number,
  filled: PropTypes.number,
  fillColor: PropTypes.string,
  baseColor: PropTypes.string,
}

StepBar.defaultProps = {
  title: '',
  step: 3,
  filled: 1,
  fillColor: colors.orange,
  baseColor: colors.lightGrey,
}

export default StepBar
