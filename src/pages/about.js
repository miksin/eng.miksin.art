import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"

const About = ({
  location,
}) => {
  return (
    <Layout location={location}>
      <SEO title="About" />
    </Layout>
  )
}

About.propTypes = {
  location: PropTypes.object.isRequired,
}

About.defaultProps = {
}

export default About

