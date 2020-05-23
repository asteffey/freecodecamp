import d3plus from '../../d3-plus';

const dataUrl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
const chartPadding = { top: 15, right: 35, bottom: 115, left: 80 };

const d3Chart = (svg, svgWidth, svgHeight) => {
    const { chart, width, height } = paddedChart(svg, svgWidth, svgHeight, chartPadding);

    d3plus.json(dataUrl)
        .then(rawData => {
            const data = new parse(rawData, width, height);
            const tip = createTip(chart, data);
            chart
                .call(tip)
                .call(appendCells, data, tip)
                .call(appendBottomAxis, data)
                .call(appendLeftAxis, data)
                .call(appendYearGrid, data)
                .call(appendMonthGrid, data)
                .call(appendBorder, data)
                .call(appendCellOverlay, data, tip)
                .call(appendLegend, data);
        });
};

function paddedChart(svg, svgWidth, svgHeight, { left, top, right, bottom }) {
    svg.append('rect').attrs({
        id: 'background',
        x: 0,
        y: 0,
        width: svgWidth,
        height: svgHeight
    });

    return {
        chart: svg.append('g')
            .attr('transform', `translate(${left}, ${top})`),
        width: svgWidth - left - right,
        height: svgHeight - right - bottom
    };
}

function parse({ baseTemperature, monthlyVariance }, width, height) {
    const data = monthlyVariance.map(({ year, month, variance }) => ({
        year,
        month: month - 1,
        temperature: baseTemperature + variance
    }));
    const yearExtent = d3plus.extent(data, ({year}) => year);
    const years = yearExtent[1] - yearExtent[0] + 1;
    
    const cellHeight = height / 12;
    const cellWidth = Math.ceil(width / years);
    
    const monthScale = d3plus.scaleLinear()
        .range([0, height - cellHeight])
        .domain(d3plus.extent(data, ({ month }) => month));
    const yearScale = d3plus.scaleLinear()
        .range([0, width - cellWidth])
        .domain(yearExtent);

    data.forEach((datum) => {
        datum.x = yearScale(datum.year);
        datum.y = monthScale(datum.month);
    });

    return {
        width,
        height,
        data,
        years,
        cellWidth,
        cellHeight,
        monthScale,
        yearScale,
        colorScale: d3plus.scaleSequential(
            d3plus.extent(data, ({ temperature }) => temperature).reverse(),
            d3plus.interpolateRdYlBu)
    }
}

function createTip(chart, { cellWidth, width }) {
    const offset = cellWidth * 4;

    function svgToPixel(svgUnit) {
        const pixelWidth = chart.node().getBoundingClientRect().width;
        return svgUnit * pixelWidth / width;
    }
    
    function isTipOver(x) {
        const approxTipWidth = 150;
        return (x + offset + approxTipWidth) > width;
    }
    
    return d3plus.tip()
        .direction(({x}) => isTipOver(x) ? 'w' : 'e')
        .offset(({x}) => {
            const sign = isTipOver(x) ? -1 : 1;
            return [0, svgToPixel(offset) * sign];
        })
        .attr('id', 'tooltip')
        .attr('data-year', ({ year }) => year)
        .style('font-size', () => `${svgToPixel(15)}px`)
        .html(({ year, month, temperature }) => `
            ${toMonthName(month)} ${year}<br/>
            ${temperature.toFixed(2)} &#8451;
        `);
}

function toMonthName(month) {
    const d = new Date(0);
    d.setUTCMonth(month);
    return d3plus.utcFormat('%B')(d);
}

function appendCells(chart, { data, cellWidth, cellHeight, colorScale }, tip) {
    chart.appendForEach('rect', data)
        .attrs(({ x, y, year, month, temperature }) => ({
            class: 'cell',
            x,
            y,
            width: cellWidth,
            height: cellHeight,
            'data-year': year,
            'data-month': month,
            'data-temp': temperature
        }))
        .style('fill', ({ temperature }) => colorScale(temperature))
        .on('mouseover', tip.show) // here only to pass fcc test
        .on('mouseout', tip.hide); // here only to pass fcc test
}

function appendBottomAxis(chart, { cellWidth, height, yearScale, years }) {
    chart.append('g')
        .attrs({
            id: 'x-axis',
            transform: `translate(${cellWidth / 2}, ${height})`
        })
        .call(d3plus
            .axisBottom(yearScale)
            .ticks(years)
            .tickFormat(d3plus.format('d'))
            .tickSizeOuter(0)
        )
        .call(g => g.selectAll('.tick')
            .attrs({
                id: toYearTickId,
                'class': toYearTickClass
            })
            .call(tick => tick.select('text')
                .style('text-anchor', 'end')
                .attrs({
                    dx: '1em',
                    dy: '0.7em'
                })
            )
        );
}


const toYearTickId = year => `year-tick-${year}`;
const toYearTickClass = year => year % 10 === 0 ? 'tick' : 'tick hidden';

function appendLeftAxis(chart, { cellHeight, monthScale }) {
    chart.append('g')
        .attrs({
            id: 'y-axis',
            transform: `translate(0, ${cellHeight / 2})`
        })
        .call(d3plus
            .axisLeft(monthScale)
            .tickFormat(toMonthName)
        )
        .call(g => g.selectAll('.tick')
            .attrs({
                id: toMonthTickId
            })
            .call(tick => tick.select('text')
                .style('text-anchor', 'end')
                .attrs({
                    dx: '0.3em',
                    dy: '-0.1em',
                    transform: 'rotate(-45)'
                })
            )
        );
}

const toMonthTickId = month => `year-tick-${month}`;

function appendYearGrid(chart, { yearScale, years, height }) {
    chart.append('g')
        .attrs({
            id: 'year-grid',
            transform: `translate(0, ${height})`
        })
        .call(d3plus
            .axisBottom(yearScale)
            .ticks(years)
            .tickFormat('')
            .tickSize(-height)
        )
        .call(g => g.selectAll('.tick').attrs({
            'class': '',
            id: toYearGridId
        }));
}

const toYearGridId = year => `year-grid-${year}`;

function appendMonthGrid(chart, { monthScale, width }) {
    chart.append('g')
        .attrs({
            id: 'month-grid',
            transform: `translate(${width}, 0)`
        })
        .call(d3plus
            .axisLeft(monthScale)
            .tickFormat('')
            .tickSize(width)
        )
        .call(g => g.selectAll('.tick').attrs({
            'class': '',
            id: toMonthGridId
        }));
}

const toMonthGridId = month => `year-grid-${month}`;

function appendBorder(chart, { width, height }) {
    chart.append('rect').attrs({
        id: 'chart-border',
        x: 0,
        y: 0,
        width: width,
        height: height,
        fill: 'none',
        stroke: 'black'
    });
}

function appendCellOverlay(chart, { data, cellWidth, cellHeight }, tip) {
    chart.appendForEach('rect', data)
        .attrs(({ x, y }) => ({
            x,
            y,
            width: cellWidth,
            height: cellHeight,
            'fill-opacity': 0
        }))
        .on('mouseover', function () {
            highlight.apply(this, arguments);
            tip.show.apply(this, arguments);
        })
        .on('mouseout', function () {
            unhighlight.apply(this, arguments);
            tip.hide.apply(this, arguments);
        });
}

function highlight({ month, year }) {
    for (var y = year - 4; y <= year + 4; y++) {
        d3plus.select(`#${toYearTickId(y)}`).classed('hidden', y !== year);
    }
    for (const id of [
        toYearTickId(year),
        toYearGridId(year),
        toYearGridId(year + 1),
        toMonthTickId(month),
        toMonthGridId(month),
        toMonthGridId(month + 1)
    ]) {
        d3plus.select(`#${id}`).classed('highlighted', true);
    }
}

function unhighlight({ month, year }) {
    for (var y = year - 4; y <= year + 4; y++) {
        d3plus.select(`#${toYearTickId(y)}`).attr('class', toYearTickClass);
    }
    for (const id of [
        toYearTickId(year),
        toYearGridId(year),
        toYearGridId(year + 1),
        toMonthTickId(month),
        toMonthGridId(month),
        toMonthGridId(month + 1)
    ]) {
        d3plus.select(`#${id}`).classed('highlighted', false);
    }
}

function appendLegend(svg, { colorScale, height, width }) {
    const shapes = 40;
    const yOffset = height + 60;
    const padding = 10;

    svg.append('g')
        .attr('id', 'legend')
        .style('font-size', '10px')
        .call(d3plus.legendColor()
            .orient('horizontal')
            .ascending(true)
            .title('Temperatures (℃)')
            .shape('rect')
            .shapePadding(0)
            .shapeHeight(15)
            .shapeWidth((width - padding * 2) / shapes)
            .cells(shapes)
            .labelFormat(d3plus.format('.1f'))
            .scale(colorScale)
        )
        .call(legend => {
            const { x, y, width, height } = legend.node().getBBox();
            legend.attr('transform', `translate(${padding}, ${yOffset})`);
            legend.insert('rect', '.legendCells').attrs({
                id: 'legend-background',
                x: x - padding,
                y: y - padding,
                width: width + padding * 2,
                height: height + padding * 2
            });
        });
}

export default d3Chart;
