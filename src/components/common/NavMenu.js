import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import ScreenWrapper from "./ScreenWrapper"
import TypingDisplay from "../TypingDisplay"

import { colors, sizes, devices } from "../../constants/common"

const MenuList = styled.div`
  margin: auto;
  padding-top: ${sizes.navMobile}px;
  max-width: ${devices.mobile}px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MenuItem = styled.div`
  width: 100%;
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
`

const NavMenu = ({ isActive, links, onBlur }) => {
  return (
    <ScreenWrapper
      isActive={isActive}
      onClick={onBlur}
    >
      <MenuList>
        {
          links.map(l => (
            <MenuItem key={l.name}>
              <MenuLink to={l.path}>
                <TypingDisplay
                  words={[l.name]}
                  color={colors.white}
                  size={sizes.navMobile / 2}
                  cursor={''}
                  typeInterval={150}
                />
              </MenuLink>
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
