import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// https://css-tricks.com/aspect-ratio-boxes/
const Wrapper = styled.div`
  position: relative;

  &:before {
    content: "";
    width: 1px;
    margin-left: -1px;
    float: left;
    height: 0;
    padding-top: ${props => props.ratio * 100}%;
  }
  &:after { /* to clear float */
    content: "";
    display: table;
    clear: both;
}
`

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const FixedAspectRatioBox = ({ ratio, children }) => {
  return (
    <Wrapper ratio={ratio}>
      <Container>{children}</Container>
    </Wrapper>
  )
}

FixedAspectRatioBox.propTypes = {
  ratio: PropTypes.number,
  children: PropTypes.elementType
}

FixedAspectRatioBox.defaultProps = {
  ratio: 1,
  children: null,
}

export default FixedAspectRatioBox
