import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { Menu, X } from "react-feather"

import NavMenu from "./NavMenu"

import { colors, sizes, devices } from "../../constants/common"

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  height: ${sizes.nav}px;
  background-color: rgba(255, 255, 255, .7);
  z-index: 20;

  @media screen and (max-width: ${devices.mobile}px) {
    height: ${sizes.navMobile}px;
  }
`

const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 0 12px;
  height: 100%;
  display: flex;

  @media screen and (max-width: ${devices.mobile}px) {
    display: none;
  }
`

const LinkName = styled.h1`
  margin: auto;
  font-size: ${props => props.size}px;
  color: ${props => props.color};
`

const MenuButton = styled.div`
  cursor: pointer;
  margin: auto 8px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: none;

  @media screen and (max-width: ${devices.mobile}px) {
    display: block;
  }
`

const GrowPad = styled.div`
  flex-grow: 1;
  display: none;

  @media screen and (max-width: ${devices.mobile}px) {
    display: block;
  }
`

const Nav = ({
  links,
  color,
}) => {
  const [isActive, setIsActive] = useState(false)

  const fontSize = Math.max(sizes.nav / 3, 20)

  return (
    <>
      <Wrapper>
        <MenuButton
          size={fontSize}
          onClick={() => setIsActive(true)}
        >
          {isActive ? <X size={fontSize} /> : <Menu size={fontSize} />}
        </MenuButton>
        <GrowPad />
        {
          links.map(link => (
            <NavLink key={link.name} to={link.path}>
              <LinkName size={fontSize} color={color}>
                {link.name}
              </LinkName>
            </NavLink>
          ))
        }
      </Wrapper>
      <NavMenu
        isActive={isActive}
        links={links}
        onBlur={() => setIsActive(false)}
      />
    </>
  )
}

Nav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  color: PropTypes.string,
}

Nav.defaultProps = {
  links: [],
  color: colors.grey
}

export default Nav
