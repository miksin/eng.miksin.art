import React from "react"
import PropTypes from "prop-types"

const colors = [
  '#FCDD51',
  '#C6ABD4',
  '#95C1E6',
  '#A5CD6C',
  '#EE8893',
]

const TagsNav = ({ tags }) => (
  <div className="tags-nav">
    {
      tags.map((tag, i) => (
        <div
          className="tag"
          key={tag.fieldValue}
          style={{
            backgroundColor: colors[i % colors.length]
          }}
        >
          <p className="value">{tag.fieldValue}</p>
          <span className="count">{tag.totalCount}</span>
        </div>
      ))
    }
  </div>
)

TagsNav.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    fieldValue: PropTypes.string.isRequired,
    totalCount: PropTypes.number.isRequired
  }))
}

TagsNav.defaultProps = {
  tags: []
}

export default TagsNav
