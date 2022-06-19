export function makeChart(chartId, data, colorScheme) {
  const margin = { top: 20, right: 0, bottom: 10, left: 30 };
  const width = 540 - margin.left - margin.right;
  const height = 277 - margin.top - margin.bottom;

  const chartBox = d3.select(chartId);
  const svg = chartBox.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const xScale = d3.scaleUtc()
    .domain(d3.extent(data, d => d.date))
    .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([height - margin.bottom, margin.top]);

  const xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickSizeOuter(0);

  const yAxis = d3.axisLeft(yScale)
  
  const line = d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.value))

  svg.append('path')
    .data([data])
    .attr('class', 'line-path')
    .attr('stroke', colorScheme[0])
    .attr('d', line);

  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(xAxis);

  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(yAxis);

}