import * as d3 from 'd3';

const simulation = ({
  chartDataGroupBy,
  chartHeight,
  chartWidth,
}) =>
  d3.forceSimulation()
    .force("link", d3.forceLink().id((d) => d[chartDataGroupBy]).distance(200).strength(1))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(chartWidth / 2, chartHeight / 2));

export const getSimulation = ({
  chartDataGroupBy,
  chartHeight,
  chartWidth,
}) => simulation({ chartDataGroupBy, chartHeight, chartWidth });
