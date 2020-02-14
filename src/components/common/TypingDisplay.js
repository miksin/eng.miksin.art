import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

import ModelTypeWriter from "../../models/TypeWriter"
import { colors } from "../../constants/common"
import { toDualColors } from "../../helpers"

const blink = keyframes`
  from, to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
`

const roll = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Text = styled.h1`
  margin: 0 0 0 auto;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: ${props => props.bgImage};
  white-space: ${props => props.whiteSpace};
  color: transparent;
  font-size: ${props => props.size}px;
  line-height: normal;
`

const Cursor = styled.h1`
  margin: 0 auto 0 0;
  transform-origin: center;
  animation: ${props => props.animation} ${props => props.options};
  color: ${props => props.color};
  font-size: ${props => props.size}px;
  line-height: normal;
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
  delInterval,
  goalInterval,
  animation
}) => {
  const [typed, setTyped] = useState('')
  const [typeWriter, setTypeWriter] = useState(null)
  
  useEffect(() => {
    setTypeWriter(new ModelTypeWriter(words, {
      typeInterval,
      delInterval,
      goalInterval
    }))
  }, [words, typeInterval, delInterval])

  useEffect(() => {
    if (typeWriter) typeWriter.update(setTyped)
    return () => {
      if (typeWriter) typeWriter.destroy()
    }
  }, [typeWriter])

  const gradientColors = toDualColors(color)

  return (
    <Wrapper>
      <Text
        bgImage={`linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`}
        whiteSpace={isWrap ? 'normal' : 'nowrap'}
        size={size}
      >
        {typed}
      </Text>
      <Cursor
        style={{
          marginLeft: animation === 'roll' ? size / 2 : 0
        }}
        color={gradientColors[1]}
        size={size}
        animation={animation === 'roll' ? roll : blink}
        options={animation === 'roll' ? '1s linear infinite' : '0.75s step-end infinite'}
      >
        {cursor}
      </Cursor>
    </Wrapper>
  )
}

TypingDisplay.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  isWrap: PropTypes.bool,
  cursor: PropTypes.string,
  typeInterval: PropTypes.number,
  delInterval: PropTypes.number,
  goalInterval: PropTypes.number,
  animation: PropTypes.oneOf(['blink', 'roll'])
}

TypingDisplay.defaultProps = {
  words: [''],
  size: 14,
  color: colors.grey,
  isWrap: false,
  cursor: '_',
  typeInterval: 300,
  delInterval: 100,
  goalInterval: 1000,
  animation: 'blink'
}

export default TypingDisplay
