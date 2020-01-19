/* eslint-disable no-undef */
import React, { createElement, useRef, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import _ from 'lodash'

function GridView ({
  viewList,
  gridSpec,
  margin,
}) {
  const wrapperRef = useRef(null)
  const getSize = () => {
    if (wrapperRef.current) 
      return {
        width: wrapperRef.current.clientWidth,
        height: wrapperRef.current.clientHeight
      }
    return {
      width: 0,
      height: 0
    }
  }

  const [size, setSize] = useState({})
  useEffect(() => {
    setSize(getSize())
    const interval = setInterval(() => {
      setSize(getSize())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // adjust number of grid depending on window size
  let gridNum = gridSpec.length > 0 ? gridSpec[0].gridNum : 1
  for (let i = 1; i < gridSpec.length; i++) {
    if (size.width <= gridSpec[i].width) {
      gridNum = gridSpec[i].gridNum
    }
  }

  // always insert items into grid with minimum height
  const gridList = new Array(gridNum).fill().map(() => ({
    height: 0,
    itemList: []
  }))
  viewList.forEach(item => {
    const minGrid = _.minBy(gridList, 'height')
    minGrid.itemList.push(item)
    minGrid.height += item.inverseRatio
  })

  return (
    <div className="grid-view-wrapper" ref={wrapperRef}>
      {
        gridList.map((grid, i) => (
          <div
            className="grid-view-column"
            style={{
              width: `calc(${100 / gridNum}% - ${margin * 2}px)`,
              margin: `0 ${margin}px`
            }}
            key={i}
          >
            {
              grid.itemList.map(item => (
              <div
                className="grid-view-item" key={item.id}
                style={{ margin: `${margin}px 0` }}
              >
                {
                  createElement(item.viewType, item.viewProps)
                }
              </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

GridView.propTypes = {
  viewList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    inverseRatio: PropTypes.number.isRequired,
    viewType: PropTypes.elementType.isRequired,
    viewProps: PropTypes.any,
  })),
  gridSpec: PropTypes.arrayOf(PropTypes.shape({
    width: PropTypes.number,
    gridNum: PropTypes.number.isRequired
  })),
  margin: PropTypes.number,
}

GridView.defaultProps = {
  viewList: [],
  gridSpec: [
    { gridNum: 3 },
    { gridNum: 2, width: 1080 },
    { gridNum: 1, width: 480 },
  ],
  margin: 4,
}

export default GridView
