import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { navigate } from "gatsby"
import { ChevronRight } from "react-feather"

import FlexBox from "@components/basic/FlexBox"
import Avatar from "@components/common/Avatar"
import TextButton from "@components/common/TextButton"
import { devices, sizes, icons, colors } from "@constants/home"
import { formatText } from "@src/helpers"

const Wrapper = styled.div`
  max-width: ${sizes.introCardMaxSize}px;
  width: 100%;
`

const AvatarWrapper = styled(FlexBox)`
  width: 100%;
  transform: translateY(${props => props.offsetY}px);
`

const ContentWrapper = styled(FlexBox)`
  background: #FFFFFF;
  border-radius: 5px;
  width: 100%;
  padding: 24px;
  padding-top: ${props => props.paddingTop}px !important;

  @media screen and (max-width: ${devices.mobile}px) {
    padding: 12px;
  }
`

const Content = styled.p`
  text-align: center;
  word-break: break-all;
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
    <Wrapper column center>
      <AvatarWrapper center offsetY={sizes.introCardAvatarSize / 2}>
        <Avatar
          src={avatar}
          size={sizes.introCardAvatarSize}
          alt="avatar"
          mode={'circle'}
          border={{ size: 2, color: colors.white }}
        />
      </AvatarWrapper>
      <ContentWrapper column center paddingTop={sizes.introCardAvatarSize / 2}>
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
                  <Icon size={sizes.icon} color={colors.indigo} />
                </SocialLink>
              )
            })
          }
        </LinkWraper>
        <Content
          dangerouslySetInnerHTML={{ __html: formatText(contents) }}
        />
        <TextButton
          icon={{ Element: ChevronRight }}
          text={'Profile'}
          color={colors.indigo}
          isOutlined
          isRounded
          onClick={() => navigate('/about')}
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
