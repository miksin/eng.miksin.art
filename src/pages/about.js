import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import FlexBox from "@components/basic/FlexBox"
import Seo from "@components/seo"
import Nav from "@components/common/Nav"
import TopPad from "@components/common/TopPad"
import Avatar from "@components/common/Avatar"
import TypingDisplay from "@components/common/TypingDisplay"
import SocialLink from "@components/common/SocialLink"
import { colors, sizes, devices, about } from "@constants/about"

const Base = styled(FlexBox)`
  background-color: ${colors.lightBlue};
  min-height: 100vh;
`

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: ${devices.tablet}px;
  margin: 0 auto;
  padding: 12px;
  border-radius: 5px;
  background-color: ${colors.white};
`

const Title = styled.div`
  padding: 24px 0;

  &:after {
    content: " ";
    display: block;
    width: 55px;
    height: 1px;
    margin-top: 16px;
    margin-left: auto;
    margin-right: auto;
    background: ${props => props.color};
  }
`

const IdentityCard = styled(FlexBox)`
  width: 100%;
  max-width: ${sizes.description}px;
  justify-content: space-around;

  @media screen and (max-width: ${sizes.description}px) {
    flex-direction: column !important;
  }
`

const IntroCard = styled(FlexBox)`
  padding: 24px 0;
`

const Author = styled.h1`
  color: ${colors.indigo};
`

const Description = styled.p`
  width: 100%;
  max-width: ${sizes.description}px;
`

const About = () => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      site {
        ...SiteMetaFragment
      }

      avatar: file(relativePath: {eq: "miksin-avatar.jpg"}){
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  const {
    author,
    links,
    socialLinks,
  } = data.site.siteMetadata

  return (
    <>
      <Seo title="About" />
      <Nav
        links={links}
        bgColor={colors.lightBlue}
        iconColor={colors.white}
      />
      <Base column center>
        <TopPad />
        <Wrapper column>
          <Title color={colors.lightBlue}>
            <TypingDisplay
              words={['ABOUT ME']}
              color={colors.lightBlue}
              size={sizes.title}
              typeInterval={200}
              cursor={'_'}
            />
          </Title>
          <IntroCard column center>
            <IdentityCard className="mg-tb-8" center>
              <Avatar
                src={data.avatar.childImageSharp.fluid.src}
                alt="avatar"
                size={200}
                mode="rounded"
                border={{ size: 0 }}
              />
              <FlexBox column center>
                <Author className="mg-tb-8">{author}</Author>
                <SocialLink socialLinks={socialLinks} color={colors.indigo} />
              </FlexBox>
            </IdentityCard>
            <Description className="mg-tb-16">{about.en}</Description>
          </IntroCard>
        </Wrapper>
        <Wrapper className="mg-t-16" column>
          <Title color={colors.lightBlue}>
            <TypingDisplay
              words={['SKILLS']}
              color={colors.lightBlue}
              size={sizes.title}
              typeInterval={200}
              cursor={'_'}
            />
          </Title>
        </Wrapper>
        <TopPad />
      </Base>
    </>
  )
}

export default About

