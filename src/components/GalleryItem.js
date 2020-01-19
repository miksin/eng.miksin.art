import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

function GalleryItem ({
  frontmatter,
}) {
  const {
    path,
    title,
    date,
    featuredImage,
  } = frontmatter
  const { src } = featuredImage.childImageSharp.fluid

  return (
    <Link to={path}>
      <div className="gallery-item-wrapper">
        <img
          className="gallery-item-bg"
          src={src}
          alt={title}
        />
        <div
          className="gallery-item-info"
        >
          <p>{title}</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  )
}

GalleryItem.propTypes = {
  frontmatter: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    fromNow: PropTypes.string,
    date: PropTypes.string,
    featuredImage: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.shape({
          src: PropTypes.string.isRequired,
          aspectRatio: PropTypes.number
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
}

export default GalleryItem
