// import * as label from './labels.js';
import { Text } from '../svg/text.js';
import * as d3 from 'd3';
import React from 'react';

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
      .selectAll('g.tick text')
      .classed('axes text', true)
      .attr('dx', dx)
      .attr('dy', dy)
      .attr('transform', transform)
      .style('text-anchor', textAnchor)
    : null
);

/**
 * Positions label on x Axis
 * @method getXAxisLabel
 * @param  {String}      [xAxisLabel=''}] [description]
 * @return {Boolean}     [description]
 */
export const getXAxisLabel = ({
  transform = 'rotate(0)',
  x = 5,
  xAxisLabel = '',
  y = -5,
}) =>
  <Text
    text={xAxisLabel}
    transform={transform}
    x={x}
    y={y}
  />;

getXAxisLabel.propTypes = {
  transform: React.PropTypes.string,
  x: React.PropTypes.number,
  xAxisLabel: React.PropTypes.string,
  y: React.PropTypes.number,
};

/**
 * Positions label on y Axis
 * @method getXAxisLabel
 * @param  {String}      [xAxisLabel=''}] [description]
 * @return {Boolean}     [description]
 */
export const getYAxisLabel = ({
  transform = 'rotate(-90)',
  x = 5,
  y = -5,
  yAxisLabel = '',
}) =>
  <Text
    text={yAxisLabel}
    transform={transform}
    x={x}
    y={y}
  />;

getYAxisLabel.propTypes = {
  transform: React.PropTypes.string,
  x: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  y: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  yAxisLabel: React.PropTypes.string,
};
