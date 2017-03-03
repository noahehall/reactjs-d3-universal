import * as d3 from 'd3';

 /**
  * hierarchy - https://github.com/d3/d3-hierarchy
  *
  * @param {object} data an object representing the root node
  *
  * @returns {object} a root node
  */
export const hierarchy = ({ data = {} }) =>
  d3.hierarchy(data, (d) => (d.children && d.children[0].type !== 'metadata' ? d.children : null))
    .sum((d) => Number(d.size))
    .sort((a, b) => Number(b.value) - Number(a.value));
