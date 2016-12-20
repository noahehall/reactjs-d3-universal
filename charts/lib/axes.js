import * as d3 from 'd3';

export const getYAxis = ({
  thisYScale = null,
  id = '',
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

export const getXAxis = ({
  id = '', // eslint-disable-line
  thisXScale = null,
}) => (
  id && thisXScale && typeof document !== 'undefined'
    ? d3 // eslintignore let d3 handle the axis instead of building ourselves
      .select(document.getElementById(`${id}`))
      .select('.x.axis')
      .call(d3.axisBottom(thisXScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)")
      .classed('axies text', true)
    : null
);
