export function makeChart(chartId, dataObj, colorScheme) {
  const { members, series, dates } = dataObj;

  const margin = { top: 10, right: 20, bottom: 10, left: 20 };
  const width = 540 - margin.left - margin.right;
  const height = 250 - margin.top - margin.bottom;

  const chartBox = d3.select(chartId);

  const select = chartBox.append('select')
    .attr('class', 'select-box')
    .style('margin', '10px 0 0 18px')
    .style('display', 'block');

  select.selectAll('option')
    .data(['All', ...members])
    .join('option')
    .text(d => d);

  const svg = chartBox.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const xScale = d3.scaleUtc()
    .domain(d3.extent(dates))
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(series, (s) => d3.max(s.values, (d) => d.value))])
    .range([height - margin.bottom, margin.top]);

  const colorScale = d3.scaleOrdinal()
    .domain(members)
    .range(colorScheme);

  const xAxis = d3.axisBottom(xScale);

  const yAxis = d3.axisLeft(yScale);

  const line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value))

  const chart = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  chart.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  chart.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis);

  const lineGroup = chart.append('g')
    .selectAll('g')
    .data(series)
    .join('g');

  lineGroup.append('path')
    .attr('class', 'line-path')
    .attr('d', d => line(d.values))
    .style('stroke', d => colorScale(d.member))

  lineGroup.append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10)
    .attr('text-anchor', 'middle')
    .selectAll('.label-text')
    .data(d => d.values)
    .join('text')
    .text(d => d.value)
    .attr('dy', '0.35em')
    .attr('x', d => xScale(d.date))
    .attr('y', d => yScale(d.value))
    .call(d => d.filter((d, i, data) => i === data.length - 1)
      .append('tspan')
      .attr('font-weight', 'bold')
      .text(d => d.member))
    .clone(true).lower()
    .attr('class', 'text-cover')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 6);

  d3.select('.select-box').on('change', function(el, d) {
    const selectedValue = d3.select('.select-box').property('value');

    lineGroup.select('.line-path')
      .style('opacity', (d) => (selectedValue === 'All' || selectedValue === d.member) ? 1 : 0);
    lineGroup.selectAll('text')
      .attr('fill-opacity', (d) => (selectedValue === 'All' || selectedValue === d.member) ? 1 : 0);
    lineGroup.selectAll('.text-cover')
      .attr('stroke', (d) => (selectedValue === 'All' || selectedValue === d.member) ? 'white' : 'none');
  })
}