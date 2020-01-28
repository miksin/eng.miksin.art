import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

import ModelTypeWriter from "../models/TypeWriter"

const blink = keyframes`
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

const Text = styled.h1`
  margin-right: 0;
`

const Cursor = styled.h1`
  margin-left: 0;
  animation: ${blink} 0.75s step-end infinite;  
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`

const TypingDisplay = ({
  words,
  size,
  color,
  isWrap
}) => {
  const [typed, setTyped] = useState('')
  const [typeWriter, setTypeWriter] = useState(null)
  
  useEffect(() => {
    setTypeWriter(new ModelTypeWriter(words))
  }, [words])

  useEffect(() => {
    if (typeWriter) typeWriter.update(setTyped)
    return () => {
      if (typeWriter) typeWriter.destroy()
    }
  }, [typeWriter])

  return (
    <Wrapper>
      <Text style={{
        color: color, 
        fontSize: size,
        whiteSpace: isWrap ? 'normal' : 'nowrap'
        }}>{typed}</Text>
      <Cursor style={{ color: color, fontSize: size }}>_</Cursor>
    </Wrapper>
  )
}

TypingDisplay.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  isWrap: PropTypes.bool,
}

TypingDisplay.defaultProps = {
  words: ['Example Title'],
  size: 14,
  color: `#424242`,
  isWrap: false
}

export default TypingDisplay
