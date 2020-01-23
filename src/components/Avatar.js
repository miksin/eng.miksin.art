import React from "react"
import PropTypes from "prop-types"

const Avatar = ({
  src,
  alt,
  size,
  mode,
  border
}) => {
  const style = size ? {
    width: `${size}px`,
    height: `${size}px`
  } : {}

  return (
    <div
      className={`avatar --${mode} --border-${border}`}
      style={style}
    >
      <img src={src} alt={alt} />
    </div>
  )
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
  mode: PropTypes.oneOf(['circle', 'rounded', 'square']),
  border: PropTypes.oneOf(['none', 'thin', 'solid'])
}

Avatar.defaultProps = {
  src: '',
  alt: '',
  size: null,
  mode: 'circle',
  border: 'solid'
}

export default Avatar
