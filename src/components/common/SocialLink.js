import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexBox from "@components/basic/FlexBox"
import { colors, featherIcons as icons, sizes } from "@constants/common"

const Wrapper = styled(FlexBox)`
  margin: 8px 0;
`

const Link = styled.a`
  margin: 4px;
  width: ${sizes.icon}px;
  height: ${sizes.icon}px;
`

const SocialLink = ({ socialLinks, color }) => (
  <Wrapper center>
    {socialLinks.map(l => {
      const Icon = icons[l.name] || null
      return (
        <Link
          title={l.name}
          key={l.name}
          href={l.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon size={sizes.icon} color={color} />
        </Link>
      )
    })}
  </Wrapper>
)

SocialLink.propTypes = {
  color: PropTypes.string,
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
}

SocialLink.defaultProps = {
  color: colors.white,
  socialLinks: [],
}

export default SocialLink
