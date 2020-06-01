import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import ScaledD3Container from './ScaledD3Container'
import treemapChart from './treemap.d3'
import useDimensions from 'react-use-dimensions'
import PropTypes from 'prop-types'
import './style.css'

const FullScreenContainer = styled.div`
    padding: 10px
    height: calc(100vh - ${({ marginTop }) => `${marginTop}px`})
`

const DataSetDisplay = ({ title, description, url }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    document.title = title

    fetch(url)
      .then(response => response.json())
      .then(json => setData(json))
  }, [title, url])

  const chart = useMemo(() => treemapChart(data), [data])

  const [ref, { height }] = useDimensions()
  return (
    <>
      <div ref={ref}>
        <h1 id='title'>{title}</h1>
        <h3 id='description'>{description}</h3>
      </div>
      <FullScreenContainer marginTop={height + 40}>
        <ScaledD3Container drawSvg={chart} viewBox={{ width: 1600, height: 900 }} />
      </FullScreenContainer>
    </>
  )
}

DataSetDisplay.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string
}

export default DataSetDisplay
