import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery, navigate } from "gatsby"
import _ from "lodash"

import Seo from "@components/seo"
import FlexBox from "@components/basic/FlexBox"
import Nav from "@components/common/Nav"
import ListPreview from "@components/common/ListPreview"
import Banner from "@components/home/Banner"
import Footer from "@components/footer"
import IntroCard from "@components/home/IntroCard"
import PlayListPreview from "@components/home/PlayListPreview"
import ResponsiveBlock from "@components/home/ResponsiveBlock"

import { scrollToAnchor, assignLanguages } from "@src/helpers"
import { devices, sizes, colors, about } from "@constants/home"

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
        limit: 5
      ) {
        ...GalleryPreviewFragment
      }

      nonSenseImages: allFile(filter: {extension: {regex: "/(jpg)|(png)|(jpeg)/"}, relativeDirectory: {eq: "nonsense"}}) {
        edges {
          node {
            ...FeaturedImageFragment
          }
        }
      }
    }
  `)

  const [vw, setVw] = useState(undefined)
  const [vh, setVh] = useState(undefined)
  const [lang, setLang] = useState('en')
  useEffect(() => {
    /* eslint-disable no-undef */

    // set window height (prevent url bar problems in mobile)
    if (window) {
      setLang(assignLanguages())
      setVw(window.innerWidth)
      setVh(window.innerHeight)
    }

    /* eslint-enable no-undef */
  }, [])

  const bannerStyles = {}
  if (vh) bannerStyles.minHeight = vh

  const scrollOffset = !vw || vw > devices.mobile ? sizes.nav : sizes.navMobile

  const {
    title,
    subtitles,
    author,
    links,
    socialLinks,
  } = data.site.siteMetadata

  const blogArticles = data.blogs.edges.map(edge => edge.node.frontmatter)
  const galleryArticles = data.gallery.edges.map(edge => edge.node.frontmatter)
  const nonSenseImages = _.shuffle(data.nonSenseImages.edges.map(edge => edge.node.childImageSharp.fluid.src))
  const blockTitleSize = vw && vw <= devices.mobile ? sizes.scrollTitleMobile : sizes.scrollTitle

  return (
    <>
      <Seo title="Home" />
      <Nav links={links}/>
      <Banner
        styles={bannerStyles}
        onEntry={() => scrollToAnchor('scroll-block-1', scrollOffset)}
        words={{
          title: [title],
          subtitle: subtitles,
        }}
      />
      <FlexBox column center>
        <ResponsiveBlock
          id="scroll-block-1"
          bgColors={colors.lightBlue}
          title={{
            show: true,
            text: 'ABOUT',
            color: colors.white,
            size: blockTitleSize,
          }}
          onEntry={() => scrollToAnchor('scroll-block-2', scrollOffset)}
          onTitle={() => navigate('/about')}
        >
          <IntroCard
            avatar={data.avatar.childImageSharp.fluid.src}
            contents={about[lang] || about.en}
            socialLinks={socialLinks}
          />
        </ResponsiveBlock>
        <ResponsiveBlock
          id="scroll-block-2"
          bgColors={colors.white}
          title={{
            show: true,
            text: 'Recent Posts',
            color: colors.lightBlue,
            size: blockTitleSize,
          }}
          onEntry={() => scrollToAnchor('scroll-block-3', scrollOffset)}
          onTitle={() => navigate('/blog')}
        >
          <ListPreview articles={blogArticles.map((frontmatter, index) => ({
            ...frontmatter,
            thumbnailSrc: nonSenseImages[index % nonSenseImages.length],
            thumbnailAlt: 'blog',
          }))} />
        </ResponsiveBlock>
        <ResponsiveBlock
          id="scroll-block-3"
          bgColors={colors.lightBlue}
          title={{
            show: true,
            text: 'Gallery',
            color: colors.white,
            size: blockTitleSize,
          }}
          onTitle={() => navigate('/gallery')}
        >
          <PlayListPreview articles={galleryArticles.map(frontmatter => ({
            ...frontmatter,
            src: frontmatter.featuredImage.childImageSharp.fluid.src,
            aspectRatio: frontmatter.featuredImage.childImageSharp.fluid.aspectRatio,
          }))} color={colors.white} />
        </ResponsiveBlock>
      </FlexBox>
      <Footer
        siteAuthor={author}
      />
    </>
  )
}

export default IndexPage
