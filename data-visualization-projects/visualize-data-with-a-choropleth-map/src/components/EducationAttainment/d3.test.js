import * as d3 from 'd3'
import d3Chart, { toTooltipHtml } from './d3'
import fakeTopology from './__tests__/topology.json'
import fakeEducation from './__tests__/education.json'
import { fireEvent, waitFor } from '@testing-library/dom'

const width = 100
const height = 100

const sample = (arr) => [
  arr[0],
  arr[Math.floor(arr.length / 2)],
  arr[arr.length - 1]
]

beforeEach(async () => {
  document.body.innerHTML = `<svg viewBox="0 0 ${width} ${height}"></svg>`

  global.fetch = require('jest-fetch-mock')
  fetch
    .once(JSON.stringify(fakeTopology))
    .once(JSON.stringify(fakeEducation))

  // stub because jsdom doesn't support getBBox
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
  await d3Chart(svg, width, height)
})

describe('counties', () => {
  it('User Story #3: My choropleth should have counties with a corresponding class="county" that represent the data.', () => {
    const counties = document.querySelector('.county')
    expect(counties).toBeInTheDocument()
  })

  it('User Story #4: There should be at least 4 different fill colors used for the counties.', () => {
    const counties = document.querySelectorAll('.county')

    const colors = new Set()
    counties.forEach(county =>
      colors.add(county.style.fill || county.getAttribute('fill'))
    )

    expect(colors.size).toBeGreaterThanOrEqual(4)
  })

  it('User Story #5: My counties should each have data-fips and data-education properties containing their corresponding fips and education values.', () => {
    const counties = [...document.querySelectorAll('.county')]

    counties.forEach(county => {
      expect(county).toHaveAttribute('data-fips')
      expect(county).toHaveAttribute('data-education')
    })
  })

  it('User Story #6: My choropleth should have a county for each provided data point.', () => {
    const counties = document.querySelectorAll('.county')
    expect(counties.length).toEqual(fakeEducation.length)
  })

  it('User Story #7: The counties should have data-fips and data-education values that match the sample data.', () => {
    const counties = [...document.querySelectorAll('.county')]

    expect(counties.map(c => c.getAttribute('data-fips')).sort())
      .toEqual(fakeEducation.map(({ fips }) => fips.toString()).sort())
    expect(counties.map(c => c.getAttribute('data-education')).sort())
      .toEqual(fakeEducation.map(({ bachelorsOrHigher }) => bachelorsOrHigher.toString()).sort())
  })
})

describe('legend', () => {
  it('User Story #8: My choropleth should have a legend with a corresponding id="legend".', () => {
    const legend = document.querySelector('#legend')

    expect(legend).toBeInTheDocument()
  })

  it('User Story #9: There should be at least 4 different fill colors used for the legend.', () => {
    const legendRects = document.querySelectorAll('#legend rect')

    const colors = new Set()
    legendRects.forEach(county =>
      colors.add(county.style.fill || county.getAttribute('fill'))
    )

    expect(colors.size).toBeGreaterThanOrEqual(4)
  })
})

describe('tooltip', () => {
  it('User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.', async () => {
    const counties = sample(document.querySelectorAll('.county'))

    for (const county of counties) {
      fireEvent.mouseOver(county)

      const tooltip = await waitFor(() => document.querySelector('#tooltip'))
      expect(tooltip).toBeInTheDocument()

      fireEvent.mouseOut(county)

      expect(tooltip).not.toBeVisible()
    }
  })

  it.each`
        areaName | state   | bachelorsOrHigherPercent | html
        ${'foo'}  | ${'TX'} | ${0.11}                  | ${'foo, TX: 11%'}
        ${'foo'}  | ${'TX'} | ${0.222}                 | ${'foo, TX: 22%'}
    `('displays correct html text', ({ html, ...data }) => {
    expect(toTooltipHtml(data)).toEqual(html)
  })

  it('User Story #11: My tooltip should have a data-education property that corresponds to the data-education of the active area.', async () => {
    const counties = sample(document.querySelectorAll('.county'))

    for (const county of counties) {
      fireEvent.mouseOver(county)
      const tooltip = await waitFor(() => document.querySelector('#tooltip'))
      expect(tooltip.getAttribute('data-education'))
        .toEqual(county.getAttribute('data-education'))
    }
  })
})
