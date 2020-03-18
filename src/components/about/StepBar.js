import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { colors } from "@constants/about"

const Container = styled.div`
  width: 100%;
`

const Cell = styled.div`
  background-color: ${props => props.color};
`

const StepBar = ({ step, filled, fillColor, baseColor }) => {
  const cells = new Array(Math.max(step, 1)).map((_, index) => ({
    index,
  }))

  return (
    <Container>
      {cells.map(c => <Cell key={c.index}>{c.index}</Cell>)}
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
