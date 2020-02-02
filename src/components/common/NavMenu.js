import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import ScreenWrapper from "./ScreenWrapper"

import { colors, sizes } from "../../constants/common"

const MenuList = styled.div`
  padding-top: ${sizes.navMobile}px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MenuItem = styled.div`
  width: 100%;
`

const MenuLink = styled(Link)`
  display: block;
  padding: 8px 0;
  width: 100%;
  text-align: center;
  font-size: ${sizes.navMobile / 2}px;
  text-decoration: none;
  color: ${colors.grey};
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
