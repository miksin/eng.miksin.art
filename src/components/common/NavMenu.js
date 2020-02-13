import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled, { keyframes, css } from "styled-components"
import { Power } from "react-feather"

import ScreenWrapper from "./ScreenWrapper"
import IconButton from "./IconButton"

import { colors, sizes, devices } from "../../constants/common"

const Wrapper = styled.div`
  max-width: ${devices.mobile}px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`

const RestPadding = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
      <Wrapper>
        <MenuList delays={delays} className={isActive ? ['active']: []}>
          {
            links.map(l => (
              <MenuItem key={l.name}>
                <MenuLink to={l.path}>{l.name}</MenuLink>
              </MenuItem>
            ))
          }
        </MenuList>
        <RestPadding>
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
