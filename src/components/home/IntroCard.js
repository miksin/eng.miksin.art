import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import FlexBox from "@components/basic/FlexBox"
import Avatar from "@components/common/Avatar"
import SocialLink from "@components/common/SocialLink"
import { devices, sizes, colors } from "@constants/home"
import { formatText } from "@src/helpers"

const Wrapper = styled.div`
  position: relative;
  max-width: ${sizes.introCardMaxSize}px;
  width: 100%;
  padding-top: ${props => props.paddingTop}px;
`

const AvatarWrapper = styled(FlexBox)`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
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

const IntroCard = ({
  avatar,
  contents,
  socialLinks,
}) => {
  return (
    <Wrapper column center paddingTop={sizes.introCardAvatarSize / 2}>
      <ContentWrapper column center paddingTop={sizes.introCardAvatarSize / 2}>
        <SocialLink socialLinks={socialLinks} color={colors.indigo} />
        <Content
          dangerouslySetInnerHTML={{ __html: formatText(contents) }}
        />
      </ContentWrapper>
      <AvatarWrapper center>
        <Avatar
          src={avatar}
          size={sizes.introCardAvatarSize}
          alt="avatar"
          mode={'circle'}
          border={{ size: 2, color: colors.white }}
        />
      </AvatarWrapper>
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
