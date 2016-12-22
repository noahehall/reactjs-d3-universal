import * as d3 from 'd3';

/*
 * Create/Update Y Axis in the DOM
 */
export const getYAxis = ({
  id = '',
  thisYScale = null,
}) => (
  id && thisYScale && typeof document !== 'undefined'
    ? d3 // eslintignore let d3 handle the axis instead of building ourselves
      .select(document.getElementById(`${id}`))
      .select('.y.axis')
      .call(d3.axisLeft(thisYScale))
      .selectAll("text")
      .classed('axies text', true)
    : null
);

/*
 * Create/Update X Axis and insert it in DOM
 */
export const getXAxis = ({
  dx = '-.8em',
  dy = '.15em',
  id = '',
  textAnchor = 'end',
  thisXScale = null,
  transform = 'rotate(-65)',
}) => (
  id && thisXScale && typeof document !== 'undefined'
    ? d3 // eslintignore let d3 handle the axis instead of building ourselves
      .select(document.getElementById(`${id}`))
      .select('.x.axis')
      .call(d3.axisBottom(thisXScale))
      .selectAll('text')
      .attr('dx', dx)
      .attr('dy', dy)
      .attr('transform', transform)
      .style('text-anchor', textAnchor)
      .classed('axies text', true)
    : null
);
