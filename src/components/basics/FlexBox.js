import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.dir};
  flex-wrap: ${props => props.wrap};
  ${props => props.ext}
`

const FlexBox = ({
  children,
  className,
  column,
  reverse,
  wrap,
  center,
}) => {
  const ext = `
    ${center ? 'justify-content: center;' : ''}
    ${center ? 'align-items: center;' : ''}
  `

  return (
    <Wrapper
      className={className}
      dir={`${column ? 'column' : 'row'} ${reverse ? 'reverse' : ''}`} 
      wrap={wrap ? 'wrap' : 'nowrap'}
      ext={css`${ext}`}
    >
      {children}
    </Wrapper>
  )
}

FlexBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  column: PropTypes.bool,
  reverse: PropTypes.bool,
  wrap: PropTypes.bool,
  center: PropTypes.bool,
}

FlexBox.defaultProps = {
  children: null,
  className: '',
  column: false,
  reverse: false,
  wrap: false,
  center: false,
}

export default FlexBox
