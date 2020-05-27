import * as d3 from 'd3';
import d3Chart from './d3';
import fakeTopology from './__tests__/topology.json'
import fakeEducation from './__tests__/education.json'

const width = 100;
const height = 100;

beforeEach(() => {
    document.body.innerHTML = `<svg viewBox="0 0 ${width} ${height}"></svg>`;

    global.fetch = require('jest-fetch-mock');
    fetch
        .once(JSON.stringify(fakeTopology))
        .once(JSON.stringify(fakeEducation));
    
    // stub because jsdom doesn't support getBBox
    window.SVGElement.prototype.getBBox = () => ({
        x: 0,
        y: 0,
        width: 0,
        height: 0
    });
})

it('User Story #3: My choropleth should have counties with a corresponding class="county" that represent the data.', async () => {
    const svg = d3.select('svg');
    await d3Chart(svg, width, height);

    const counties = document.querySelector('.county');
    expect(counties).toBeInTheDocument();
});

it('User Story #6: My choropleth should have a county for each provided data point.', async () => {
    const svg = d3.select('svg');
    await d3Chart(svg, width, height);

    const counties = document.querySelectorAll('.county');
    expect(counties.length).toEqual(fakeTopology.objects.counties.geometries.length);
});
