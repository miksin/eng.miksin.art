import React from "react"
import PropTypes from "prop-types"

import ModelVector2d from "../../models/Vector2d"

const LinearGradient = ({
  id,
  colors,
  axisDeg,
}) => {
  const unit = 100 / (colors.length - 1)
  const vector = ModelVector2d.fromPCS(1, axisDeg / 180 * Math.PI)
  const axisSettings = {
    x1: 0,
    x2: vector.x,
    y1: 0,
    y2: vector.y,
  }

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
  axisDeg: PropTypes.number,
}

LinearGradient.defaultTypes = {
  axisDeg: 0,
}

export default LinearGradient
