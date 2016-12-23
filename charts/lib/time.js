import * as d3 from 'd3';

export const parse = ({
  format = "%Y%m%d"
}) => d3.timeParse(format);
