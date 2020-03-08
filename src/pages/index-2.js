import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import FlexBox from "@components/basic/FlexBox"
import Nav from "@components/common/Nav"
import Banner from "@components/home/Banner"
import Footer from "@components/footer"
import IntroCard from "@components/home/IntroCard"
import ListPreview from "@components/home/ListPreview"
import ScrollTitleWrapper from "@components/home/ScrollTitleWrapper"
import ResponsiveBlock from "@components/home/ResponsiveBlock"

import { scrollToAnchor, assignLanguages } from "@src/helpers"
import { sizes, colors, about } from "@constants/home"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        ...SiteMetaFragment
      }

      avatar: file(relativePath: {eq: "miksin-avatar.jpg"}) {
        childImageSharp {
          fluid {
            src
          }
        }
      }

      blogs: allMarkdownRemark (
        filter: {frontmatter: {path: {regex: "/\/blog\/.*/"}}}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 3
      ) {
        ...ArticlePreviewFragment
      }

      gallery: allMarkdownRemark (
        filter: {frontmatter: {path: {regex: "/\/gallery\/.*/"}}}
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 3
      ) {
        ...ArticlePreviewFragment
      }
    }
  `)

  const [vh, setVh] = useState(undefined)
  const [lang, setLang] = useState('en')
  useEffect(() => {
    /* eslint-disable no-undef */

    // set window height (prevent url bar problems in mobile)
    if (window) {
      setLang(assignLanguages())
      setVh(window.innerHeight)
    }

    /* eslint-enable no-undef */
  }, [])

  const bannerStyles = {}
  if (vh) bannerStyles.minHeight = vh

  const {
    title,
    subtitles,
    author,
    links,
    socialLinks,
  } = data.site.siteMetadata

  const blogArticles = data.blogs.edges.map(edge => edge.node.frontmatter)
  const galleryArticles = data.gallery.edges.map(edge => edge.node.frontmatter)

  return (
    <>
      <Nav links={links}/>
      <Banner
        styles={bannerStyles}
        onEntry={() => scrollToAnchor('scroll-block-1', sizes.nav)}
        words={{
          title: [title],
          subtitle: subtitles,
        }}
      />
      <FlexBox column center>
        <ResponsiveBlock
          id="scroll-block-1"
          bgColors={colors.lightBlue}
        >
          <IntroCard
            avatar={data.avatar.childImageSharp.fluid.src}
            contents={about[lang] || about.en}
            socialLinks={socialLinks}
          />
        </ResponsiveBlock>
      </FlexBox>
      <div id="scroll-content">
        <ScrollTitleWrapper
          title="About"
          direction={'left'}
          bgColor={['#80cbc4', colors.cyan]}
        >
          <IntroCard
            avatar={data.avatar.childImageSharp.fluid.src}
            contents={about[lang] || about.en}
            socialLinks={socialLinks}
          />
        </ScrollTitleWrapper>
        <ScrollTitleWrapper
          title="Blog"
          direction={'right'}
          bgColor={[colors.teal, '#80cbc4']}
        >
          <ListPreview articles={blogArticles} />
        </ScrollTitleWrapper>
        <ScrollTitleWrapper
          title="Gallery"
          direction={'left'}
          bgColor={['#81d4fa', colors.lightBlue]}
        >
          <ListPreview articles={galleryArticles} />
        </ScrollTitleWrapper>
      </div>
      <Footer
        siteAuthor={author}
      />
    </>
  )
}

export default IndexPage
