import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import {
  ChevronLeft,
  ChevronRight,
} from "react-feather"

import FlexBox from "@components/basic/FlexBox"
import FlexPad from "@components/basic/FlexPad"
import { sizes, colors } from "@constants/home"

const padding = 8;

const Frame = styled(FlexBox)`
  width: 100%;
  overflow: hidden;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${sizes.playlistHeight + 2 * padding}px;
`

const ListContainer = styled.div`
  top: 0;
  left: 0;
  display: flex;
  position: absolute;
  transition: transform 0.5s ease-out;
  transform: translateX(${props => props.offset}px);
`

const CardLink = styled(Link)`
  display: block;
  padding: ${padding}px;

  &:hover {
    .hover-cover {
      opacity: 0;
    }
  }
`

const PreviewCard = styled.div`
  position: relative;
  width: 100%;
  background-size: cover;
`

const HoverCover = styled.div`
  content: "";
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.3s linear;
`

const Panel = styled(FlexBox)`
`

const PanelButton = styled.div`
  width: ${sizes.playlistPanelBtnSize + 2 * padding}px;
  height: ${sizes.playlistPanelBtnSize + 2 * padding}px;
  padding: ${padding}px;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

const PlayListPreview = ({ articles, color }) => {
  const wrapperRef = useRef(null)
  const listRef = useRef(null)
  const [offset, setOffset] = useState(0)

  const slide = (moveNext = true) => {
    if (!wrapperRef.current || !listRef.current) return
    const wrapperWidth = wrapperRef.current.clientWidth
    const listWidth = listRef.current.clientWidth
    const leftMargin = 0
    const rightMargin = wrapperWidth - listWidth

    const diff = wrapperWidth * 0.67 * (moveNext ? 1 : -1);
    setOffset(oldOffset => Math.max(Math.min(oldOffset + diff, leftMargin), rightMargin))
  }

  return (
    <Frame column>
      <Wrapper ref={wrapperRef}>
        <ListContainer offset={offset} ref={listRef}>
          {articles.map(article => (
              <CardLink to={article.path} key={article.path}>
                <PreviewCard style={{
                  width: sizes.playlistHeight * article.aspectRatio,
                  height: sizes.playlistHeight,
                  backgroundImage: `url(${article.src})`,
                }}>
                  <HoverCover className="hover-cover" />
                </PreviewCard>
              </CardLink>
          ))}
        </ListContainer>
      </Wrapper>
      <Panel center>
        <PanelButton onClick={() => slide(true)}>
          <ChevronLeft size={sizes.playlistPanelBtnSize} color={color} />
        </PanelButton>
        <FlexPad />
        <PanelButton onClick={() => slide(false)}>
          <ChevronRight size={sizes.playlistPanelBtnSize} color={color} />
        </PanelButton>
      </Panel>
    </Frame>
  )
}

PlayListPreview.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
  })),
  color: PropTypes.string,
}

PlayListPreview.defaultProps = {
  articles: [],
  color: colors.white,
}

export default PlayListPreview
