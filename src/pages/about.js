import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Paper from "../components/Paper"
import Avatar from "../components/Avatar"

const About = ({
  location,
}) => {
  const data = useStaticQuery(graphql`
    query AboutPageQuery {
      avatar: file(relativePath: {eq: "miksin-avatar.jpeg"}){
        childImageSharp {
          fluid {
            src
          }
        }
      }
    }
  `)

  const avatarSrc = data.avatar.childImageSharp.fluid.src

  return (
    <Layout location={location}>
      <SEO title="About" />
      <Paper>
        <div className="persona">
          <Avatar
            src={avatarSrc}
            alt="miksin-avatar"
            size={120}
          />
          <h2 className="title">Miksin</h2>
        </div>
        <article className="about-content">
          <section className="paragraph --tw">
            台灣人，現居於日本東京擔任軟體工程師。<br />
            軟體技能以web前後端為主，系統、雲端、架構等皆有涉獵。<br />
            平時興趣為繪圖、興趣程式開發等。
          </section>
          <section className="paragraph --en">
            Taiwanese, and being a software engineer in Tokyo, Japan. <br />
            Web development is the main programming skill,
            but also researching about system, cloud, and infrastructure. <br />
            By the way, painting and side project development are my interests.
          </section>
          <section className="paragraph --jp">
            台湾人、ソフトウェアエンジニアとして東京に働いている。<br />
            得意分野はweb系が、システム、クラウド、インフラも触っている。<br />
            趣味は絵描き、趣味としてのプログラミングなど。
          </section>
        </article>
      </Paper>
    </Layout>
  )
}

About.propTypes = {
  location: PropTypes.object.isRequired,
}

About.defaultProps = {
}

export default About

