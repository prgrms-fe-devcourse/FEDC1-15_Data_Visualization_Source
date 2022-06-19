export function makeChart(chartId, data, colorScheme) {
  const columns = ['참여', '비참여'];

  const margin = { top: 30, right: 10, bottom: 5, left: 25 };
  const width = 540 - margin.left - margin.right;
  const height = 118 - margin.top - margin.bottom;

  const chartBox = d3.select(chartId);
  const svg = chartBox.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.top, height - margin.bottom])
    .padding(0.08);

  const colorScale = d3.scaleOrdinal()
    .domain(columns)
    .range(colorScheme);

  const xAxis = d3.axisTop(xScale)
    .tickFormat(d => d * 100 + '%')

  const yAxis = d3.axisLeft(yScale)
    .tickSizeOuter(0);

  const stack = d3.stack()
    .keys(columns)
    .offset(d3.stackOffsetExpand);

  const series = stack(data);

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  chart.append('g')
    .attr('transform', `translate(0,${margin.top})`)
    .call(xAxis)
    .call(g => g.selectAll('.domain').remove());

  chart.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis)
    .call(g => g.selectAll('.domain').remove());

  const stackGroup = chart.append('g')
    .selectAll('g')
    .data(series)
    .join('g')
    .attr('fill', d => colorScale(d.key))
    .attr('fill-opacity', 0.9)

  stackGroup.selectAll('rect')
    .data(d => d)
    .join('rect')
    .attr('x', d => xScale(d[0]))
    .attr('y', d => yScale(d.data.name))
    .attr('width', d => xScale(d[1]) - xScale(d[0]))
    .attr('height', yScale.bandwidth())

  const legendGroup = svg.append('g')
    .attr('transform', `translate(${margin.left},10)`)
    .attr('text-anchor', 'start')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10);

  const legend = legendGroup.selectAll('.legend')
    .data(colorScale.domain())
    .join('g')
    .attr('transform', (d, i) => `translate(${i * 90},0)`)

  legend.append('rect')
    .attr('width', 15)
    .attr('height', 15)
    .attr('fill', colorScale)

  legend.append('text')
    .attr('x', 23)
    .attr('y', 9.5)
    .attr('dy', '0.35em')
    .text(d => d);
}