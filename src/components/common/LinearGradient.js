import React from "react"
import PropTypes from "prop-types"

import ModelVector2d from "@models/Vector2d"

const LinearGradient = ({
  id,
  colors,
  axisDeg,
}) => {
  const vector = ModelVector2d.fromPCS(1, axisDeg / 180 * Math.PI)
  const axisSettings = {
    x1: 0,
    x2: vector.x,
    y1: 0,
    y2: vector.y,
  }

  const stops = colors.slice().sort((a, b) => a.offset - b.offset).map(color => ({
    stopColor: color.code,
    offset: `${color.offset * 100}%`,
    key: `${color.code}-${color.offset}`,
  }))

  return (
    <svg width="0" height="0" style={{ width: 0, height: 0 }}>
      <defs>
        <linearGradient id={id} spreadMethod="pad" {...axisSettings}>
          {
            stops.map(s => (
              <stop key={s.key} offset={s.offset} stopColor={s.stopColor} stopOpacity="1"/>
            ))
          }
        </linearGradient>
      </defs>
    </svg>
  )
}

LinearGradient.propTypes = {
  id: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    offset: PropTypes.number,
  })).isRequired,
  axisDeg: PropTypes.number,
}

LinearGradient.defaultProps = {
  axisDeg: 0,
}

export default LinearGradient
