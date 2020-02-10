import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import { devices } from "../../constants/common"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;
`

const Card = styled.div`
  width: 100%;
  height: 100%;
`

const PreviewCard = ({ frontmatter }) => {
  return (
    <Wrapper size={devices.mobile}>
      <Card>{frontmatter.title}</Card>
    </Wrapper>
  )
}

PreviewCard.propTypes = {
  frontmatter: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fromNow: PropTypes.string.isRequired,
  }).isRequired,
}

export default PreviewCard
