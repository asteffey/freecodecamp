import d3 from '../../d3-plus';
import dateFormat from 'dateformat';

const gdpDataUrl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

const d3GdpChart = (svg, svgWidth, svgHeight) => {
    const padding = { top: 15, right: 35, bottom: 80, left: 80 };

    const xMin = padding.left;
    const yMin = padding.top;
    const width = svgWidth - xMin - padding.right;
    const height = svgHeight - yMin - padding.bottom;
    const xMax = xMin + width;
    const yMax = yMin + height;

    d3.json(gdpDataUrl).then(({ data: rawData }) => {
        const data = rawData.map(([dateString, gdp]) => ({ dateString, date: new Date(dateString), gdp }));

        const dateScale = d3.scaleTime()
            .domain([d3.min(data, ({ date }) => date), d3.max(data, ({ date }) => date)])
            .range([xMin, xMax]);

        const gdpScale = d3.scaleLinear()
            .domain([d3.max(data, ({ gdp }) => gdp), 0])
            .range([yMin, yMax]);

        data.forEach(datum => {
            datum.x = dateScale(datum.date);
            datum.y = gdpScale(datum.gdp);
        });

        svg.append('g')
            .attr('id', 'x-axis')
            .attr('transform', `translate(0, ${yMax})`)
            .call(d3.axisBottom(dateScale).ticks(30).tickFormat(d3.timeFormat('%Y')))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '2.9em')
            .attr('dy', '-0.3em')
            .attr('transform', 'scale(2.5) rotate(70)');

        svg.append('g')
            .attr('transform', `translate(0, ${yMax})`)
            .attr('class', 'grid')
            .call(d3.axisBottom(dateScale).ticks(30).tickFormat('').tickSize(-height));

        svg.append('g')
            .attr('id', 'y-axis')
            .attr('transform', `translate(${xMin}, 0)`)
            .call(d3.axisLeft(gdpScale))
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '0.3em')
            .attr('dy', '-0.1em')
            .attr('transform', 'scale(2.5) rotate(-45)');

        svg.append('g')
            .attr('transform', `translate(${xMin}, 0)`)
            .attr('class', 'grid')
            .call(d3.axisLeft(gdpScale).tickFormat('').tickSize(-width));

        const barWidth = Math.ceil(width / data.length);

        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });

        const tip = d3.tip()
            .direction('n')
            .offset(({ x, y }) => [
                Math.max(0, yMin + 40 - y),
                Math.min(0, xMax - 70 - x)
            ])
            .attr('id', 'tooltip')
            .attr('data-date', ({ dateString }) => dateString)
            .html(({ gdp, date }) => `${dateFormat(date, 'mmm yyyy')}<br/>${formatter.format(gdp)} Billion`);
        svg.call(tip);

        svg.appendForEach('rect', data)
            .attr('class', 'bar')
            .attr('x', ({ x }) => x)
            .attr('width', barWidth)
            .attr('y', ({ y }) => y)
            .attr('height', ({ y }) => yMax - y)
            .attr('data-date', ({ dateString }) => dateString)
            .attr('data-gdp', ({ gdp }) => gdp)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        svg.append('path')
            .datum(data)
            .attr('class', 'gdpLine')
            .attr('d', d3.line()
                .x(({ x }) => x)
                .y(({ y }) => y)
            );


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

export default d3GdpChart;