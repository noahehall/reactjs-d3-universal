import * as d3 from 'd3';

export const generateLine = ({
  // https://github.com/d3/d3-shape#curves
  lineCurve = 'curveBasis',
  xScale,
  xValue = '',
  yScale,
  yValue = '',
}) => d3
  .line()
  .curve(d3[lineCurve] ? d3[lineCurve] : d3.curveBasis)
  .x((d) => xScale(d[xValue]))
  .y((d) => yScale(d[yValue]));
