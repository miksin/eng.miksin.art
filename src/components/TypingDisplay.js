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
  margin: 0 0 0 auto;
`

const Cursor = styled.h1`
  margin: 0 auto 0 0;
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
  isWrap,
  cursor,
  typeInterval,
  delInterval
}) => {
  const [typed, setTyped] = useState('')
  const [typeWriter, setTypeWriter] = useState(null)
  
  useEffect(() => {
    setTypeWriter(new ModelTypeWriter(words, {
      typeInterval,
      delInterval
    }))
  }, [words, typeInterval, delInterval])

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
        <Cursor style={{ color: color, fontSize: size }}>
          {cursor}
        </Cursor>
    </Wrapper>
  )
}

TypingDisplay.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,
  isWrap: PropTypes.bool,
  cursor: PropTypes.string,
  typeInterval: PropTypes.number,
  delInterval: PropTypes.number
}

TypingDisplay.defaultProps = {
  words: [''],
  size: 14,
  color: `#424242`,
  isWrap: false,
  cursor: '_',
  typeInterval: 300,
  delInterval: 100
}

export default TypingDisplay
