import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { navigate } from "gatsby"
import { ChevronRight } from "react-feather"

import FlexBox from "@components/basic/FlexBox"
import Avatar from "@components/common/Avatar"
import TextButton from "@components/common/TextButton"
import { sizes, devices, icons, colors } from "@constants/home"
import { formatText } from "@src/helpers"

const Wrapper = styled(FlexBox)`
  background: #FFFFFF;
`

const ContentWrapper = styled(FlexBox)`
`

const Content = styled.p`
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
      <Avatar
        src={avatar}
        size={200}
        alt={''}
        border={{ size: 0 }}
      />
      <ContentWrapper column center>
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
        <TextButton
          icon={{ Element: ChevronRight }}
          text={'Profile'}
          color={colors.cyan}
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
