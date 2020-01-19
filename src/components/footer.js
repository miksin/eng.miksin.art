import PropTypes from "prop-types"
import React from "react"

const Footer = ({ siteAuthor, links }) => (
  <footer>
    <div className="content">
      <h4 style={{ flexGrow: 1 }}>
        © {new Date().getFullYear()}, {siteAuthor}
      </h4>
      <div className="links">
        {
          links.map(l => (
            <div key={l.name}>
              <a href={l.link} target="__blank">
                <img src={l.icon} />
              </a>
            </div>
          ))
        }
      </div>
    </div>
  </footer>
)

Footer.propTypes = {
  siteAuthor: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })),
}

Footer.defaultProps = {
  siteAuthor: ``,
  links: [],
}

export default Footer
