import React from 'react'
import PropTypes from 'prop-types'

const Paper = ({ children }) => (
  <div className="paper">
    {children}
  </div>
)

Paper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired
}

export default Paper
