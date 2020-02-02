import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import Nav from "../components/common/Nav"
import Banner from "../components/Banner"
import Footer from "../components/footer"
import IntroCard from "../components/home/IntroCard"
import ScrollTitleWrapper from "../components/ScrollTitleWrapper"

import { scrollToAnchor } from "../helpers"
import { sizes, colors, about } from "../constants/home"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        ...SiteMetaFragment
      }

      avatar: file(relativePath: {eq: "miksin-avatar.jpeg"}) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  const [vh, setVh] = useState(undefined)
  useEffect(() => {
    /* eslint-disable no-undef */

    // set window height (prevent url bar problems in mobile)
    if (window) setVh(window.innerHeight)

    /* eslint-enable no-undef */
  }, [])

  const bannerStyles = {}
  if (vh) bannerStyles.minHeight = vh

  const {
    title,
    subtitles,
    description,
    author,
    links,
    socialLinks,
  } = data.site.siteMetadata

  return (
    <>
      <Nav links={links}/>
      <Banner
        styles={bannerStyles}
        onEntry={() => scrollToAnchor('scroll-content', sizes.nav)}
        words={{
          title: [title],
          subtitle: subtitles
        }}
      />
      <div id="scroll-content">
        <ScrollTitleWrapper
          title="About"
          direction={'left'}
          bgColor={colors.cyan}
        >
          <IntroCard
            avatar={data.avatar.childImageSharp.fluid.src}
            contents={about.tw}
            socialLinks={socialLinks}
          />
        </ScrollTitleWrapper>
        <ScrollTitleWrapper
          title="Blog"
          direction={'right'}
          bgColor={colors.pink}
        >
          <div></div>
        </ScrollTitleWrapper>
        <ScrollTitleWrapper
          title="Gallery"
          direction={'left'}
          bgColor={colors.teal}
        >
          <div></div>
        </ScrollTitleWrapper>
      </div>
      <Footer
        siteAuthor={author}
      />
    </>
  )
}

export default IndexPage
