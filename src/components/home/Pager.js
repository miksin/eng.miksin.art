import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Wrapper = styled.div`
`

const Pager = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

Pager.propTypes = {
  children: PropTypes.node,
}

Pager.defaultProps = {
  children: null,
}

export default Pager
