import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import PreviewCard from "@components/common/PreviewCard"
import { colors, devices } from "@constants/common"

const Wrapper = styled.div`
  margin-bottom: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media screen and (max-width: ${devices.mobile}px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`

const LinkItemWithHidden = styled(Link)`
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

const LinkItem = styled(Link)`
  display: block;
  color: ${colors.grey};
  text-decoration: none;
  width: 33%;

  @media screen and (max-width: ${(devices.tablet + devices.mobile) / 2}px) {
    width: 50%;
  }

  @media screen and (max-width: ${devices.mobile}px) {
    width: 100%;
  }
`

const ListPreview = ({
  articles,
  hiddenOnResponsive,
}) => {
  return (
    <Wrapper>
      {
        articles.map((article) => {
          const ItemComponent = hiddenOnResponsive ? LinkItemWithHidden : LinkItem
          return (
            <ItemComponent key={article.path} to={article.path}>
              <PreviewCard {...article} />
            </ItemComponent>
          )
        })
      }
    </Wrapper>
  )
}

ListPreview.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
  })),
  hiddenOnResponsive: PropTypes.bool,
}

ListPreview.defaultProps = {
  articles: [],
  hiddenOnResponsive: false,
}

export default ListPreview
