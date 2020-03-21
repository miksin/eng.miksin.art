import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import FlexBox from "@components/basic/FlexBox"
import Underline from "@components/basic/Underline"
import Seo from "@components/seo"
import Nav from "@components/common/Nav"
import TopPad from "@components/common/TopPad"
import Avatar from "@components/common/Avatar"
import TypingDisplay from "@components/common/TypingDisplay"
import SocialLink from "@components/common/SocialLink"
import StepBar from "@components/about/StepBar"
import { colors, sizes, devices, about, skills } from "@constants/about"
import { assignLanguages } from "@src/helpers"

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

const Title = styled(Underline)`
  padding: 24px 0;
`

const SubTitle = styled(Underline)`
  padding: 16px 0;

  & > * {
    text-align: center;
    color: ${props => props.color};
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

const TwoColumnWrapper = styled(FlexBox)`
  & > * {
    width: 50%;
  }
  @media screen and (max-width: ${devices.mobile}px) {
    & > * {
      width: 100%;
    }
  }
`

const Cell = styled.div`
  padding: 12px;
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

  const [lang, setLang] = useState('en')
  useEffect(() => {
    /* eslint-disable no-undef */
    if (window) setLang(assignLanguages())
    /* eslint-enable no-undef */
  }, [])

  const {
    author,
    links,
    socialLinks,
  } = data.site.siteMetadata

  const languages = Object.keys(skills.languages).map(name => ({
    name,
    ability: skills.languages[name],
  })).sort((a, b) => b.ability - a.ability)

  const frameworks = Object.keys(skills.frameworks).map(name => ({
    name,
    ability: skills.frameworks[name],
  })).sort((a, b) => b.ability - a.ability)

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
            <Description className="mg-tb-16">{about[lang]}</Description>
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
          <SubTitle color={colors.indigo}>
            <h3>Programming / Markup Languages</h3>
          </SubTitle>
          <TwoColumnWrapper wrap className="mg-b-32">
            {languages.map(lang => (
              <Cell key={lang.name}>
                <StepBar
                  title={lang.name}
                  filled={lang.ability}
                  fillColor={colors.lime}
                />
              </Cell>)
            )}
          </TwoColumnWrapper>
          <SubTitle color={colors.indigo}>
            <h3>Frameworks / Libraries</h3>
          </SubTitle>
          <TwoColumnWrapper wrap>
            {frameworks.map(framework => (
              <Cell key={framework.name}>
                <StepBar
                  title={framework.name}
                  filled={framework.ability}
                  fillColor={colors.lime}
                />
              </Cell>)
            )}
          </TwoColumnWrapper>
        </Wrapper>
        <TopPad />
      </Base>
    </>
  )
}

export default About

