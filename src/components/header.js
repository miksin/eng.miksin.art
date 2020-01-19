import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Fragment } from "react"

const Header = ({
  siteTitle,
  siteDescription,
  banner,
  links,
  socialLinks,
  pathname,
}) => (
  <>
    <header>
      <div
        className="background"
        style={{
          backgroundImage: `url(${banner.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="header-wrapper">
        <div className="header-title">
          <h1>{siteTitle}</h1>
          <h3>{siteDescription}</h3>
        </div>
        <div className="social-links plane">
          {
            socialLinks.map(l => (
              <div key={l.name}>
                <a href={l.link} target="__blank">
                  <img src={l.icon} />
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </header>
    <div className="fix-nav">
      <nav className="header-nav">
        {
          links.map((link, i) => (
            <Fragment key={link.name}>
              {i > 0 ? ` | ` : null}
              <Link
                to={link.path}
                className={link.path === pathname ? 'active' : ''}
              >
                { link.name }
              </Link>
            </Fragment>
          ))
        }
      </nav>
    </div>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  siteDescription: PropTypes.string,
  banner: PropTypes.shape({
    src: PropTypes.string.isRequired,
    aspectRatio: PropTypes.number,
  }).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  socialLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  })),
  pathname: PropTypes.string.isRequired,
}

Header.defaultProps = {
  siteTitle: ``,
  siteDescription: ``,
  links: [
    { path: '/', name: 'Home' },
    { path: '/about', name: 'About' },
    { path: '/blog', name: 'Blog' },
    { path: '/gallery', name: 'Gallery' },
  ],
  socialLinks: [],
}

export default Header
