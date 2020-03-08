import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import PreviewCard from "@components/home/PreviewCard"

import { colors, devices } from "@constants/common"

const Wrapper = styled.div`
  width: 100%;
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
  width: 33%;
  &:last-child:nth-child(3n+1),
   :last-child:nth-child(3n+2),
   :nth-last-child(2):nth-child(3n+1) {
     display: none;
   }

  @media screen and (max-width: ${(devices.tablet + devices.mobile) / 2}px) {
    width: 50%;
    &:last-child:nth-child(odd) {
      display: none;
    }
  }

  @media screen and (max-width: ${devices.mobile}px) {
    width: 100%;
  }
`

const ListPreview = ({
  articles,
}) => {
  return (
    <Wrapper>
      {
        articles.map((article) => (
          <LinkItem key={article.path} to={article.path}>
            <PreviewCard {...article} />
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
