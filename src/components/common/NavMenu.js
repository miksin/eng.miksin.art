import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled, { keyframes, css } from "styled-components"
import { Power } from "react-feather"

import FlexBox from "../basics/FlexBox"
import ScreenWrapper from "./ScreenWrapper"
import IconButton from "./IconButton"

import { colors, sizes, devices } from "../../constants/common"

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

const expand = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
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
          <IconButton color="transparent" onClick={onBlur}>
            <Power color={colors.white} size={sizes.navButton} />
          </IconButton>
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
