import * as d3 from 'd3';

export const hierarchy = ({ data }) =>
  d3.hierarchy(data)
    .sum((d) => Number(d.size))
    .sort((a, b) => Number(b.value) - Number(a.value));
