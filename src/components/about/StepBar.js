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
`

const StepBar = ({ step, filled, fillColor, baseColor }) => {
  const cells = new Array(Math.max(step, 1)).map((_, index) => ({
    index,
    color: filled > index ? baseColor : fillColor,
  }))

  return (
    <Container>
      <Bar>
        {cells.map(c => <Cell key={c.index} color={c.color}>{c.index}</Cell>)}
      </Bar>
    </Container>
  )
}

StepBar.propTypes = {
  step: PropTypes.number,
  filled: PropTypes.number,
  fillColor: PropTypes.string,
  baseColor: PropTypes.string,
}

StepBar.defaultProps = {
  step: 3,
  filled: 1,
  fillColor: colors.orange,
  baseColor: colors.lightGrey,
}

export default StepBar
