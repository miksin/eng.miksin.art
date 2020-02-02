import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Avatar from "../common/Avatar"

import { sizes, devices, icons } from "../../constants/home"
import { formatText } from "../../helpers"
import { colors } from "../../constants/common"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${devices.tablet}px) {
    flex-direction: column;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;

  @media screen and (max-width: ${devices.tablet}px) {
    align-items: center;
  }
`

const Content = styled.p`
`

const LinkWraper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`

const SocialLink = styled.a`
  margin: 4px;
  width: ${sizes.icon}px;
  height: ${sizes.icon}px;
  color: ${colors.grey};
`

const IntroCard = ({
  avatar,
  contents,
  socialLinks,
}) => {
  return (
    <Wrapper>
      <Avatar
        src={avatar}
        size={200}
        alt={''}
        border={{ size: 0 }}
      />
      <ContentWrapper>
        <LinkWraper>
          {
            socialLinks.map(l => {
              const Icon = icons[l.name] || null
              return (
                <SocialLink
                  title={l.name}
                  key={l.name}
                  href={l.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={sizes.icon} />
                </SocialLink>
              )
            })
          }
        </LinkWraper>
        <Content
          dangerouslySetInnerHTML={{ __html: formatText(contents) }}
        />
      </ContentWrapper>
    </Wrapper>
  )
}

IntroCard.propTypes = {
  avatar: PropTypes.string,
  contents: PropTypes.string,
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })),
}

IntroCard.defaultProps = {
  avatar: '',
  contents: '',
  socialLinks: [],
}

export default IntroCard
