import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Banner = ({ children }) => {
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

Banner.propTypes = {
  children: PropTypes.node.isRequired
}

export default Banner
