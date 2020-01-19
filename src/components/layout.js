/* eslint-disable no-undef */
import React, { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

export const LayoutContext = createContext({
  windowSize: {
    width: 0,
    height: 0,
  },
})

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          links {
            name
            link
            icon
          }
        }
      }

      banner: file(relativePath: {eq: "banner_1.jpg"}){
        childImageSharp {
          fluid {
            src
            aspectRatio
          }
        }
      }
    }
  `)

  // detect window size
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })
  const [detector, setDetector] = useState()

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })

    setDetector(setInterval(() => {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }
      if (windowSize.width !== newSize.width || windowSize.height !== newSize.height) {
        setWindowSize(newSize)
      }
    }, 1000))
    return () => {
      clearInterval(detector)
    }
  }, [])

  const { title, description, links } = data.site.siteMetadata
  const { fluid } = data.banner.childImageSharp

  return (
    <LayoutContext.Provider value={{ windowSize }}>
      <div className="layout-container">
        <Header
          siteTitle={title}
          siteDescription={description}
          banner={fluid}
          pathname={location.pathname}
          socialLinks={links}
        />
        <main>{children}</main>
      </div>
    </LayoutContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
}

Layout.defaultProps = {
  location: {
    pathname: '',
  }
}

export default Layout
