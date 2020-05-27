import React from 'react'
import styled from 'styled-components'
import ScaledD3Container from '../ScaledD3Container'
import d3Chart from './d3'
import './style.css'
import useDimensions from 'react-use-dimensions'

const FullScreenContainer = styled.div`
    padding: 10px
    height: calc(100vh - ${({ marginTop }) => `${marginTop}px`})
`

const GlobalTemp = () => {
  const [ref, { height }] = useDimensions()
  return (
    <>
      <div ref={ref}>
        <h1 id='title'>United States Education Attainment</h1>
        <h3 id='description'>Percentage of adults age 25 and older with a bachelor&apos;s degree or higher (2010-2014)</h3>
      </div>
      <FullScreenContainer marginTop={height + 20}>
        <ScaledD3Container drawSvg={d3Chart} viewBox={{ width: 1600, height: 900 }} />
      </FullScreenContainer>
    </>
  )
}

export default GlobalTemp
