import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled, { keyframes, css } from "styled-components"
import { XCircle } from "react-feather"

import FlexBox from "../basics/FlexBox"
import ScreenWrapper from "./ScreenWrapper"
import IconButton from "./IconButton"

import { colors, sizes, devices } from "../../constants/common"

const expand = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`

const ready = keyframes`
  0% {
    transform: rotate(0deg) scale(1) translateY(0);
  }
  50% {
    transform: rotate(180deg) scale(0.9) translateY(10%);
  }
  100% {
    transform: rotate(360deg) scale(1) translateY(0);
  }
`

const Wrapper = styled(FlexBox)`
  max-width: ${devices.mobile}px;
  width: 100%;
  height: 100%;
  margin: auto;
`

const RestPadding = styled(FlexBox)`
  flex-grow: 1;
  width: 100%;
`

const MenuList = styled(FlexBox)`
  margin: auto;
  padding-top: ${sizes.navMobile}px;
  width: 100%;
  position: relative;

  &.active > div {
    animation-name: ${expand};
    animation-duration: 1s;
    animation-timing-function: steps(20, end);
    animation-fill-mode: forwards;

    ${props => props.delays}
  }
`

const MenuItem = styled(FlexBox)`
  display: flex;
  width: 0%;
  overflow: hidden;
  &:hover {
    background: linear-gradient(to left, transparent, rgba(255, 255, 255, .2), transparent);
  }
`

const MenuLink = styled(Link)`
  padding: 8px 0;
  margin: auto;
  text-align: center;
  font-size: ${sizes.navMobile / 2}px;
  text-decoration: none;
  color: ${colors.white};
  white-space: nowrap;
`

const CloseButton = styled(IconButton)`
  &.active {
    animation-name: ${ready};
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0,.68,1,.59);
    animation-fill-mode: forwards;
  }
`

const NavMenu = ({ isActive, links, onBlur }) => {
  const delayCss = links
    .map((_, i) => `&:nth-child(${i+1}) { animation-delay: ${i * 0.25}s; }`)
    .join(' ')
  const delays = css`${delayCss}`

  return (
    <ScreenWrapper
      isActive={isActive}
    >
      <Wrapper column center>
        <MenuList
          delays={delays}
          className={isActive ? 'active': ''}
          column
          center
        >
          {
            links.map(l => (
              <MenuItem key={l.name}>
                <MenuLink to={l.path}>{l.name}</MenuLink>
              </MenuItem>
            ))
          }
        </MenuList>
        <RestPadding center>
          <CloseButton
            className={isActive ? 'active' : ''}
            color="transparent"
            onClick={onBlur}
          >
            <XCircle color={colors.white} size={sizes.navButton} />
          </CloseButton>
        </RestPadding>
      </Wrapper>
    </ScreenWrapper>
  )
}

NavMenu.propTypes = {
  isActive: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  color: PropTypes.string,
  onBlur: PropTypes.func,
}

NavMenu.defaultProps = {
  isActive: false,
  links: [],
  color: colors.grey,
  onBlur: () => {}
}

export default NavMenu
