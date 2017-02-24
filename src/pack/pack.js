import * as d3 from 'd3';

export const pack = ({ chartWidth }) =>
  d3.pack()
    .size([ chartWidth - 4, chartWidth -4 ])
    .padding(2);
