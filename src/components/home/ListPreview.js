import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const LinkItem = styled(Link)`
`

const ListPreview = ({
  articles,
}) => {
  return (
    <Wrapper>
      {
        articles.map((article) => (
          <LinkItem key={article.path} to={article.path}>
            {article.title}
          </LinkItem>
        ))
      }
    </Wrapper>
  )
}

ListPreview.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fromNow: PropTypes.string.isRequired,
  })),
}

ListPreview.defaultProps = {
  articles: [],
}

export default ListPreview
