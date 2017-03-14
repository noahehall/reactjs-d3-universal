/* eslint-disable */
import * as d3 from 'd3';

 /**
  * pack - https://github.com/d3/d3-hierarchy/blob/master/README.md#pack
  * Enclosure diagrams use containment (nesting) to represent a hierarchy.
  *
  * @param {number} [chartWidth=200] Width of SVG
  *
  * @return {type} d3 pack layout
  */
export const pack = ({ chartWidth = 200, chartHeight = 200 }) =>
  d3.pack()
    .size([ chartWidth, chartHeight ])
    .padding(2);
