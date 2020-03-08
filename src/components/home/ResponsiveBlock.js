import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import VisibilitySensor from "react-visibility-sensor"

import FlexBox from "@components/basic/FlexBox"
import TypingDisplay from "@components/common/TypingDisplay"
import EntryLink from "@components/home/EntryLink"
import { toDualColors } from "@src/helpers"
import { devices, sizes, colors } from "@constants/home"

const Wrapper = styled(FlexBox)`
  justify-content: space-around !important;
  margin: 0;
  width: 100%;
  min-height: ${props => props.minHeight};
  padding 12px;
  padding-top: ${sizes.nav}px !important;
  overflow: hidden;
  background: linear-gradient(to right, ${props => props.bgColors[0]}, ${props => props.bgColors[1]});

  @media screen and (max-width: ${devices.mobile}px) {
    padding-top: ${sizes.navMobile}px !important;
  }
`

const Inner = styled(FlexBox)`
  margin: 0 auto;
  width: 100%;
  max-width: ${devices.tablet}px;
  height: 100%;
`

const Title = styled(FlexBox)`
  margin: 16px auto;

  &:after {
    content: " ";
    display: block;
    width: 55px;
    height: 1px;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
    background: ${props => props.color};
  }
`

const TransparentWrapper = styled.div`
  ${props => props.visible ? null : `opacity: 0;`}
  ${props => props.visible ? null : `pointer-event: none;`}
`

const ResponsiveBlock = ({ children, id, bgColors, title, onEntry }) => {
  const [vh, setVh] = useState(undefined)
  useEffect(() => {
    /* eslint-disable no-undef */
    // set window height (prevent url bar problems in mobile)
    if (window) {
      setVh(window.innerHeight)
    }
    /* eslint-enable no-undef */
  }, [])

  const minHeight = vh ? `${vh - sizes.nav}px` : `calc(100vh - ${sizes.nav}px)`

  const [visible, setVisible] = useState(false)

  return (
    <VisibilitySensor
      partialVisibility={['top', 'bottom', 'left', 'right']}
      offset={{ top: 20, bottom: 20 }}
      onChange={setVisible}
    >
      <Wrapper
        center column
        id={id}
        bgColors={toDualColors(bgColors)}
        minHeight={minHeight}
      >
        {
          title.show ? <Title column color={title.color}>
            <TypingDisplay
              words={visible ? [title.text] : []}
              color={title.color}
              size={title.size}
              typeInterval={1000 / title.text.length}
              cursor={''}
            />
          </Title> : null
        }
        <Inner column center>{children}</Inner>
        <TransparentWrapper visible={!!onEntry}>
          <EntryLink
            direction="down"
            size={sizes.entryLink}
            onClick={onEntry}
            shadow
            color={[title.color, title.color]}
          />
        </TransparentWrapper>
      </Wrapper>
    </VisibilitySensor>
  )
}

ResponsiveBlock.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string,
  bgColors: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  title: PropTypes.shape({
    show: PropTypes.bool,
    text: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
  }),
  onEntry: PropTypes.func,
}

ResponsiveBlock.defaultProps = {
  children: null,
  id: null,
  bgColors: colors.white,
  title: {
    show: false,
    text: '',
    color: colors.white,
    size: sizes.scrollTitle,
  },
  onEntry: null,
}

export default ResponsiveBlock
