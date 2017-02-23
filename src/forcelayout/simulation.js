import * as d3 from 'd3';

export const getSimulation = ({
  chartDataGroupBy,
  chartHeight,
  chartWidth,
}) => d3.forceSimulation()
  .force("link", d3.forceLink().id((d) => d[chartDataGroupBy]).distance(150).strength(1))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2));
  // forces bunches them together
  // see here https://bl.ocks.org/shimizu/e6209de87cdddde38dadbb746feaf3a3
  //.force("y", d3.forceY(0))
  //.force("x", d3.forceX(0));
