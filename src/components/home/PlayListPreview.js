import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import { colors, sizes, devices } from "@constants/home"

const Wrapper = styled.div`
`

const PlayListPreview = ({ articles }) => {
  return (
    <Wrapper>
      {
        articles.map(article => (
          <div key={article.path}>article.title</div>
        ))
      }
    </Wrapper>
  )
}

PlayListPreview.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
  })),
}

PlayListPreview.defaultProps = {
  articles: [],
}

export default PlayListPreview
