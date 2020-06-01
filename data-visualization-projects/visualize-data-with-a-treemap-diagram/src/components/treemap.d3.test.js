import * as d3 from 'd3'
import treemap from './treemap.d3'

const width = 100
const height = 100

beforeEach(async () => {
  document.body.innerHTML = `<svg viewBox="0 0 ${width} ${height}"></svg>`

  window.SVGElement.prototype.getBBox = () => ({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })

  window.SVGElement.prototype.createSVGPoint = () => ({
    x: 0,
    y: 0,
    matrixTransform: window.SVGElement.prototype.createSVGPoint
  })

  window.SVGElement.prototype.getScreenCTM = () => ({})

  const svg = d3.select('svg')
  treemap(svg, width, height)
})

it('should have <rect> elements with a corresponding class="tile" that represent the data', () => {
  
})
