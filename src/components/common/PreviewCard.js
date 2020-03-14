import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexPad from "@components/basic/FlexPad"
import { colors } from "@constants/common"

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 12px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 12px;
  overflow: hidden;
  background: linear-gradient(transparent, ${props => props.color});
`

const Title = styled.h4`
  margin: auto;
  word-break: break-all;
  color: ${props => props.color};
`

const PreviewCard = ({
  frontmatter,
  bgColor,
  textColor,
}) => {
  return (
    <Wrapper>
      <Container color={bgColor}>
        <FlexPad />
        <Title color={textColor}>{frontmatter.title}</Title>
      </Container>
    </Wrapper>
  )
}

PreviewCard.propTypes = {
  frontmatter: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fromNow: PropTypes.string.isRequired,
  }).isRequired,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
}

PreviewCard.defaultProps = {
  bgColor: colors.grey,
  textColor: colors.white,
}

export default PreviewCard
