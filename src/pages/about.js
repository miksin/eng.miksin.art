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
import { colors, sizes, devices } from "@constants/about"

const Base = styled(FlexBox)`
`

const Wrapper = styled(FlexBox)`
  width: 100%;
  max-width: ${devices.tablet}px;
  margin: 0 auto;
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

const IntroCard = styled(FlexBox)`
  padding: 24px 0;
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
    title,
    subtitles,
    author,
    links,
    socialLinks,
  } = data.site.siteMetadata

  return (
    <>
      <Seo title="About" />
      <Nav links={links}/>
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
            <Avatar
              src={data.avatar.childImageSharp.fluid.src}
              alt="avatar"
              size={200}
              mode="rounded"
              border={{ size: 0 }}
            />
            <SocialLink socialLinks={socialLinks} color={colors.indigo} />
          </IntroCard>
        </Wrapper>
      </Base>
    </>
  )
}

export default About

