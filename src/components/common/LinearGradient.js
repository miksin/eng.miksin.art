import React from "react"
import PropTypes from "prop-types"

const LinearGradient = ({
  id,
  colors,
  isVertical,
}) => {
  const unit = 100 / (colors.length - 1)
  const axisSettings = isVertical ? { x1: 0, x2: 0, y1: 0, y2: 1 } : {}

  return (
    <svg width="0" height="0" style={{ width: 0, height: 0 }}>
      <defs>
        <linearGradient id={id} spreadMethod="pad" {...axisSettings}>
          {
            colors.map((color, i) => (
              <stop key={color} offset={`${unit * i}%`} stopColor={color} stopOpacity="1"/>
            ))
          }
        </linearGradient>
      </defs>
    </svg>
  )
}

LinearGradient.propTypes = {
  id: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
  isVertical: PropTypes.bool,
}

LinearGradient.defaultTypes = {
  isVertical: false,
}

export default LinearGradient
