import * as d3 from 'd3'
import treemap from '../treemap'
import fakeData from './testData.json'

const width = 100
const height = 100

function mapBy (array, key) {
  const mapped = {}
  array.forEach(({ [key]: by, ...item }) => { mapped[by] = item })
  return mapped
}

function groupBy (array, key) {
  const grouped = {}
  array.forEach((item) => {
    const by = item[key]
    if (!grouped[by]) {
      grouped[by] = [item]
    } else {
      grouped[by].push(item)
    }
  })
  return grouped
}

const ascending = (a, b) => a - b

beforeEach(() => {
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

  window.SVGElement.prototype.getComputedTextLength = () => 0

  const svg = d3.select('svg')
  treemap(fakeData)(svg, width, height)
})

describe('tiles', () => {
  it('should have <rect> elements with a corresponding class="tile" that represent the data', () => {
    const tile = document.querySelector('rect.tile')
    expect(tile).toBeInTheDocument()
  })

  it('should be at least 2 different fill colors used for the tiles', () => {
    const tiles = [...document.querySelectorAll('rect.tile')]

    const colors = new Set()
    tiles.forEach(tile =>
      colors.add(tile.style.fill || tile.getAttribute('fill'))
    )

    expect(colors.size).toBeGreaterThanOrEqual(2)
  })

  describe('tile', () => {
    it('should have the properties data-name, data-category, and data-value containing their corresponding name, category, and value', () => {
      const tiles = [...document.querySelectorAll('rect.tile')]
      const items = mapBy(
        fakeData.children
          .flatMap(({ children }) => children)
          .map(item => item),
        'name')

      tiles.forEach(tile => {
        const name = tile.getAttribute('data-name')
        const item = items[name]

        expect(item).not.toBeUndefined()
        expect(tile.getAttribute('data-value')).toEqual(item.value)
        expect(tile.getAttribute('data-category')).toEqual(item.category)
      })
    })

    it('area should correspond to the data-value amount', () => {
      const allTiles = [...document.querySelectorAll('rect.tile')]
      const tilesByCategory = groupBy(allTiles, 'category')

      Object.keys(tilesByCategory).forEach(category => {
        const tiles = tilesByCategory[category]
        tiles.sort((a, b) => a.getAttribute('data-value') - b.getAttribute('data-value'))

        const areas = tiles.map(tile => tile.getAttribute('width') * tile.getAttribute('height'))
        expect(areas).toEqual([...areas].sort(ascending))
      })
    })
  })
})

describe('legend', () => {
  it('should have a legend with a corresponding id="legend"', () => {
    const legend = document.querySelector('#legend')

    expect(legend).toBeInTheDocument()
  })

  it('should have rect elements with a corresponding class="legend-item"', () => {
    const legendItem = document.querySelector('#legend rect.legend-item')

    expect(legendItem).toBeInTheDocument()
  })

  it('should have at least 2 different fill colors used for the legend', () => {
    const legendRects = document.querySelectorAll('#legend rect.legend-item')

    const colors = new Set()
    legendRects.forEach(county =>
      colors.add(county.style.fill || county.getAttribute('fill'))
    )

    expect(colors.size).toBeGreaterThanOrEqual(2)
  })
})
