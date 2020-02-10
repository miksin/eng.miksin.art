import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

// https://css-tricks.com/aspect-ratio-boxes/
const Wrapper = styled.div`
&:before {
  content: "";
  width: 1px;
  margin-left: -1px;
  float: left;
  height: 0;
  padding-top: ${props => props.ratio} * 100%;
}
&:after { /* to clear float */
  content: "";
  display: table;
  clear: both;
}
`

const Container = styled.div`
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
