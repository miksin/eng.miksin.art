import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { colors } from "../constants/home"

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  height: ${props => props.height}px;
  background-color: rgba(255, 255, 255, .7);
  z-index: 20;
`

const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 0 12px;
  height: 100%;
  display: flex;
`

const LinkName = styled.h1`
  margin: auto;
  font-size: ${props => props.size}px;
  color: ${props => props.color};
`

const Nav = ({
  links,
  height,
  color,
}) => {
  return (
    <Wrapper height={height}>
      {
        links.map(link => (
          <NavLink key={link.name} to={link.path}>
            <LinkName size={Math.max(height / 3, 20)} color={color}>{link.name}</LinkName>
          </NavLink>
        ))
      }
    </Wrapper>
  )
}

Nav.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
  })),
  height: PropTypes.number.isRequired,
  color: PropTypes.string,
}

Nav.defaultProps = {
  links: [],
  color: colors.grey
}

export default Nav
