import d3 from '../../d3-plus';

const cyclistDataUrl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const category = 'Nationality';

const getYear = ({Year}) => Year;
const getDuration = ({duration}) => duration;
// const getNationality = ({Nationality}) => Nationality;
const getCategory = (datum) => datum[category];
const getX = ({x}) => x;
const getY = ({y}) => y;

const toHtml = ({Time, Place, Name, Year, Nationality, Doping }) => {
    const dopped = Doping.length > 0;
    return `
        <table>
            <tr>
                <td>Name</td>
                <td>${Name}</td>
            </tr>
            <tr>
                <td>Nationality</td>
                <td>${Nationality}</td>
            </tr>
            <tr>
                <td>Time</td>
                <td>${Time}</td>
            </tr>
            <tr>
                <td>Place</td>
                <td>${Place}</td>
            </tr>
            <tr>
                <td>Year</td>
                <td>${Year}</td>
            </tr>
            <tr>
                <td>Doping</td>
                <td>${dopped ? 'Yes' : 'No'}</td>
            </tr>
        </table>
        ${dopped ? `<p>${Doping}</p>` : ''}`;
};

const appendDuration = (cyclist) => ({duration: new Date(cyclist.Seconds * 1000), ...cyclist});
const appendX = (yearScale) => (cyclist) => ({x: yearScale(cyclist.Year), ...cyclist});
const appendY = (durationScale) => (cyclist) => ({y: durationScale(cyclist.duration), ...cyclist});

const pad = ([min, max], padding) => ([min - padding, max + padding]);


const d3CyclistChart = (svg, svgWidth, svgHeight) => {
    const padding = { top: 15, right: 35, bottom: 80, left: 80 };

    const xMin = padding.left;
    const yMin = padding.top;
    const width = svgWidth - xMin - padding.right;
    const height = svgHeight - yMin - padding.bottom;
    const xMax = xMin + width;
    const yMax = yMin + height;

    d3.json(cyclistDataUrl)
        .then(data => data.map(appendDuration))
        .then(data => ({
            data,
            yearScale: d3.scaleLinear()
                .domain(pad(d3.extent(data, getYear), 1))
                .range([xMin, xMax]),
            durationScale: d3.scaleTime()
                .domain(d3.extent(data, getDuration))
                .range([yMin, yMax])
        }))
        .then(({ data, yearScale, durationScale }) => ({
            data: data.map(appendX(yearScale)).map(appendY(durationScale)),
            xAxis: d3.axisBottom(yearScale),
            yAxis: d3.axisLeft(durationScale)
        }))
        .then(({ data, xAxis, yAxis }) => {
            svg.append('g')
                .attr('id', 'x-axis')
                .attr('transform', `translate(0, ${yMax})`)
                .call(xAxis.tickFormat(d3.format('d')))
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '2.9em')
                .attr('dy', '0.2em')
                .attr('transform', 'rotate(70)');

            svg.append('g')
                .attr('transform', `translate(0, ${yMax})`)
                .attr('class', 'grid')
                .call(xAxis.tickFormat('').tickSize(-height));

            svg.append('g')
                .attr('id', 'y-axis')
                .attr('transform', `translate(${xMin}, 0)`)
                .call(yAxis.tickFormat(d3.utcFormat('%M:%S')))
                .selectAll('text')
                .style('text-anchor', 'end')
                .attr('dx', '0.3em')
                .attr('dy', '-0.1em')
                .attr('transform', 'rotate(-45)');

            svg.append('g')
                .attr('transform', `translate(${xMin}, 0)`)
                .attr('class', 'grid')
                .call(yAxis.tickFormat('').tickSize(-width));

            const pointRadius = Math.ceil(width / 100);

            const tip = d3.tip()
                .direction('n')
                .offset(({ x, y }) => [
                    Math.max(0, yMin + 250 - y),
                    Math.min(0, xMax - 70 - x)
                ])
                .attr('id', 'tooltip')
                .attr('data-year', getYear)
                .html(toHtml);
            svg.call(tip);

            const color = d3.scaleOrdinal(d3.schemeCategory10)
                .domain([...new Set(data.map(getCategory))].sort());
            const getColor = datum => color(getCategory(datum));

            const legend = svg.append('g')
                .attr('id', 'legend');
            legend.call(d3.legendColor()
                .title('Nationality')
                .shape('circle')
                .shapeRadius(pointRadius)
                .shapePadding(10)
                .scale(color));
            const legendBox = legend.node().getBBox();
            const legendPadding = 10;
            const legendMargin = 10;
            const legendX = xMax - legendBox.width + legendBox.x - legendPadding - legendMargin;
            const legendY = yMin - legendBox.y + legendPadding + legendMargin;
            legend.attr('transform', `translate(${legendX}, ${legendY})`);
            legend.insert('rect', '.legendCells')
                .attr('id', 'legend-background')
                .attr('x', legendBox.x - legendPadding)
                .attr('y', legendBox.y - legendPadding)
                .attr('width', legendBox.width + (legendPadding*2))
                .attr('height', legendBox.height + (legendPadding*2));
            
            svg.appendForEach('circle', data)
                .attr('class', 'dot')
                .attr('cx', getX)
                .attr('cy', getY)
                .attr('r', pointRadius)
                .style('fill', getColor)
                .attr('data-xvalue', getYear)
                .attr('data-yvalue', getDuration)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);
            
            
        });

    svg.append('rect')
        .attr('id', 'background')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', svgWidth)
        .attr('height', svgHeight);



    // svg.append('rect')
    //     .attr('x', 0)
    //     .attr('y', 0)
    //     .attr('width', height / 4)
    //     .attr('height', height / 4)
    //     .attr('style', 'fill:rgb(0,0,255)');

    // svg.append('rect')
    //     .attr('x', height / 2)
    //     .attr('y', height / 2)
    //     .attr('width', height / 2)
    //     .attr('height', height / 2)
    //     .attr('style', 'fill:rgb(255,0,0)');

    // svg.append('rect')
    //     .attr('x', 0)
    //     .attr('y', height / 2)
    //     .attr('width', height / 2)
    //     .attr('height', height / 2)
    //     .attr('style', 'fill:rgb(0,255,0)');

    // svg.append('rect')
    //     .attr('x', width - height / 2)
    //     .attr('y', height / 2)
    //     .attr('width', height / 2)
    //     .attr('height', height / 2)
    //     .attr('style', 'fill:rgb(100,100,100)');
};

export default d3CyclistChart;