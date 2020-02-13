import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled, { keyframes, css } from "styled-components"

import ScreenWrapper from "./ScreenWrapper"

import { colors, sizes, devices } from "../../constants/common"

const expand = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
`

const MenuList = styled.div`
  margin: auto;
  padding-top: ${sizes.navMobile}px;
  max-width: ${devices.mobile}px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.active > div {
    animation-name: ${expand};
    animation-duration: 1s;
    animation-timing-function: steps(20, end);
    animation-fill-mode: forwards;

    ${props => props.delays}
  }
`

const MenuItem = styled.div`
  width: 0%;
  overflow: hidden;
  &:hover {
    background: linear-gradient(to left, transparent, rgba(255, 255, 255, .2), transparent);
  }
`

const MenuLink = styled(Link)`
  display: block;
  padding: 8px 0;
  width: 100%;
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
      onClick={onBlur}
    >
      <MenuList delays={delays} className={isActive ? ['active']: []}>
        {
          links.map(l => (
            <MenuItem key={l.name}>
              <MenuLink to={l.path}>{l.name}</MenuLink>
            </MenuItem>
          ))
        }
      </MenuList>
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
