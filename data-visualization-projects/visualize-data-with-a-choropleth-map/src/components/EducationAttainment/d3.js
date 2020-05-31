import d3plus from '../../d3-plus'
import * as topojson from 'topojson-client'

export const usTopologyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
export const educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
const chartPadding = { top: 15, right: 15, bottom: 15, left: 15 }

const d3Chart = (svg, svgWidth, svgHeight) => {
  const { chart, width, height } = paddedChart(svg, svgWidth, svgHeight, chartPadding)

  return Promise.all([
    d3plus.json(usTopologyUrl)
      .then(usTopology =>
        topojson.feature(usTopology, usTopology.objects.counties).features
      ),
    d3plus.json(educationUrl)
  ])
    .then(data => parse(data, width, height))
    .then(data => {
      const tip = createTip(chart, data)
      chart
        .call(tip)
        .call(appendCounties, data, tip)
        .call(appendLegend, data)
    })
    .catch(err => console.error(err))
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

function parse ([countyData, educationData], width, height) {
  const educationById = groupBy(educationData, 'fips')
  const data = countyData.map(({ id: fips, ...topology }) => {
    const { area_name: areaName, ...education } = educationById[fips]
    return { fips, ...topology, areaName, ...education }
  })

  data.forEach(item => {
    const { bachelorsOrHigher } = item
    item.bachelorsOrHigherPercent = bachelorsOrHigher / 100
  })

  return {
    width,
    height,
    data,
    colorScale: d3plus.scaleSequential(
      d3plus.extent(data, ({ bachelorsOrHigherPercent }) => bachelorsOrHigherPercent),
      d3plus.interpolateBlues)
  }
}

function groupBy (array, key) {
  const grouped = {}
  array.forEach(({ [key]: by, ...item }) => { grouped[by] = item })
  return grouped
}

function createTip (chart, { width }) {
  function svgToPixel (svgUnit) {
    const pixelWidth = chart.node().getBoundingClientRect().width
    return svgUnit * pixelWidth / width
  }

  return d3plus.tip()
    .direction('n')
    .offset([0, 10])
    .attr('id', 'tooltip')
    .attr('data-education', ({ bachelorsOrHigher }) => bachelorsOrHigher)
    .style('font-size', () => `${svgToPixel(15)}px`)
    .html(toTooltipHtml)
}

export const toTooltipHtml = ({ areaName, state, bachelorsOrHigherPercent }) =>
    `${areaName}, ${state}: ${d3plus.format('.0%')(bachelorsOrHigherPercent)}`

function appendCounties (chart, { data, width, height, colorScale }, tip) {
  chart.append('g')
    .attr('id', 'nation')
    .call(nation => {
      nation.appendForEach('path', data)
        .attrs(({ fips, bachelorsOrHigher, bachelorsOrHigherPercent }) => ({
          class: 'county',
          stroke: 'black',
          fill: colorScale(bachelorsOrHigherPercent),
          'data-fips': fips,
          'data-education': bachelorsOrHigher
        }))
        .attr('d', d3plus.geoPath())
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    })
    .call(containAndCenter, width, height)
}

function containAndCenter (selection, chartWidth, chartHeight) {
  const { x, y, width, height } = selection.node().getBBox()
  const scale = Math.min(chartWidth / width, chartHeight / height)
  const xOffset = (chartWidth / scale - width) / 2
  const yOffset = (chartHeight / scale - height) / 2

  selection.attr(
    'transform',
    // -x moves to 0 and xOffset centers
    `scale(${scale}) translate(${(-x + xOffset)}, ${-y + yOffset})`
  )
}

function appendLegend (chart, { colorScale, width, height }) {
  const shapes = 8

  chart.append('g')
    .attrs({
      id: 'legend',
      transform: `translate(${width * 0.65}, ${height * 0.05})`
    })
    .style('font-size', '14px')
    .call(d3plus.legendColor()
      .orient('horizontal')
      .shape('rect')
      .shapePadding(0)
      .shapeHeight(15)
      .shapeWidth(width / 4 / shapes)
      .cells(shapes)
      .labelFormat(d3plus.format('.0%'))
      .scale(colorScale)
    )
}

export default d3Chart
