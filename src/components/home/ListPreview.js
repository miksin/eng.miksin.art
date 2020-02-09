import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import PreviewCard from "../common/PreviewCard"

import { colors, devices } from "../../constants/common"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media screen and (max-width: ${devices.mobile}px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`

const LinkItem = styled(Link)`
  display: block;
  color: ${colors.grey};
  text-decoration: none;
  margin-bottom: 24px;
`

const ListPreview = ({
  articles,
}) => {
  return (
    <Wrapper>
      {
        articles.map((article) => (
          <LinkItem key={article.path} to={article.path}>
            <PreviewCard frontmatter={article} />
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
