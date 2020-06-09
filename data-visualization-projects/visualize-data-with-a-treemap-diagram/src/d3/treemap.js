import d3plus from './d3plus'
import darkColorScheme19 from './darkColorScheme19'

const chartPadding = { top: 5, right: 5, bottom: 30, left: 5 }

const colorScale = d3plus.scaleOrdinal(darkColorScheme19)

const treemapChart = (rawData) => (svg, svgWidth, svgHeight) => {
  const { chart, width, height } = paddedChart(svg, svgWidth, svgHeight, chartPadding)

  if (rawData.name === undefined) {
    return
  }

  const data = parse(rawData, width, height)

  chart
    .call(appendTiles, data)
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

function parse (rawData, width, height) {
  return toTreemap(rawData, width, height)
    .map(({ x0, x1, y0, y1, ...other }) => ({
      ...other,
      x: x0,
      y: y0,
      width: x1 - x0,
      height: y1 - y0
    }))
}

function toTreemap (rawData, width, height) {
  const hierarchy = d3plus.hierarchy(rawData)
    .sum(({ value }) => value)

  const layout = d3plus.treemap()
    .size([width, height])
    .paddingOuter(2)

  return layout(hierarchy).leaves()
}

function appendTiles (chart, data) {
  const maxArea = d3plus.max(data, ({ width, height }) => width * height)
  const textScaleFactor = 0.3
  function scaleText (width, height) {
    return Math.pow(
      width * height, textScaleFactor) /
      Math.pow(maxArea, textScaleFactor
      )
  }

  chart.appendForEach('g', data)
    .attrs(({ x, y }) => ({
      class: 'tile',
      transform: `translate(${x}, ${y})`
    }))
    .call(g => {
      g.append('rect')
        .attrs(({ width, height, data: { category, name, value } }) => ({
          class: 'tile',
          x: 0,
          y: 0,
          width,
          height,
          fill: colorScale(category),
          'data-category': category,
          'data-name': name,
          'data-value': value
        }))
    })
    .forEach((g, { width, height, data: { name } }) => {
      g.append('text')
        .text(name)
        .call(d3plus.textwrap().bounds({ width, height }))
      g.select('div')
        .attr('style', `font-size: ${scaleText(width, height) * 20}px`)
    })
}

export default treemapChart
