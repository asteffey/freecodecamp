import '../d3-plus'

const chartPadding = { top: 15, right: 15, bottom: 15, left: 15 }

const treemapChart = (rawData) => (svg, svgWidth, svgHeight) => {
  paddedChart(svg, svgWidth, svgHeight, chartPadding)
}

function paddedChart (svg, svgWidth, svgHeight, { left, top, right, bottom }) {
  svg.append('rect').attrs({
    id: 'background',
    x: 0,
    y: 0,
    width: svgWidth,
    height: svgHeight
  })

  return {
    chart: svg.append('g')
      .attr('transform', `translate(${left}, ${top})`),
    width: svgWidth - left - right,
    height: svgHeight - right - bottom
  }
}

export default treemapChart
