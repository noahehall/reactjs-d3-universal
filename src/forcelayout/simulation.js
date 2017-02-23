import * as d3 from 'd3';

// https://github.com/d3/d3-force
export const getSimulation = ({
  chartDataGroupBy,
  chartHeight,
  chartWidth,
}) => d3.forceSimulation()
  // default spacing, dont use if display text with eact circle
  //.force("link", d3.forceLink().id((d) => d[chartDataGroupBy]))
  // add extra spacing, e.g. for text
  .force("link", d3.forceLink().id((d) => d[chartDataGroupBy])
    .distance(150)
    // you need to create a count function, see docs
    // this is required for a responsive graph
    //.strength((d) => 1 / Math.min(count(d.source), count(d.target)))
  )
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2));
  // forces bunches them together
  // see here https://bl.ocks.org/shimizu/e6209de87cdddde38dadbb746feaf3a3
  //.force("y", d3.forceY(0))
  //.force("x", d3.forceX(0));
