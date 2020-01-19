import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export default class ExcerptCard extends Component {
  static propTypes = {
    frontmatter: PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
      fromNow: PropTypes.string,
      date: PropTypes.string.isRequired,
      featuredImage: PropTypes.shape({
        childImageSharp: PropTypes.shape({
          fluid: PropTypes.shape({
            src: PropTypes.string.isRequired,
            aspectRatio: PropTypes.number
          }).isRequired
        }).isRequired
      }),
    }).isRequired
  }

  get featuredImage () {
    const { featuredImage } = this.props.frontmatter
    if (!featuredImage) return null
    const { src } = featuredImage.childImageSharp.fluid
    return <img src={src} />
  }

  render() {
    const {
      title,
      excerpt,
      path,
      date,
      fromNow
    } = this.props.frontmatter

    return (
      <Link to={path}>
        <div className="gallery-item-wrapper">
          <div className="excerpt-card-container gallery-item-bg">
            <h4>{title}</h4>
            <div className="featured-image">
              {this.featuredImage}
            </div>
            <p>{excerpt} ...</p>
            <span className="timestamp">{fromNow}</span>
          </div>
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
}

