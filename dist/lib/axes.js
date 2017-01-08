'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYAxisLabel = exports.getXAxisLabel = exports.getXAxis = exports.getYAxis = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // import * as label from './labels.js';


var _text = require('../svg/text.js');

var _text2 = _interopRequireDefault(_text);

var _d = require('../../node_modules/d3/build/d3.node');

var d3 = _interopRequireWildcard(_d);

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Create/Update Y Axis in the DOM
 */
var getYAxis = exports.getYAxis = function getYAxis(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === undefined ? '' : _ref$id,
      _ref$thisYScale = _ref.thisYScale,
      thisYScale = _ref$thisYScale === undefined ? null : _ref$thisYScale;

  if (!id || !thisYScale) {
    appFuncs.logError({
      data: [id, thisYScale, typeof document === 'undefined' ? 'undefined' : _typeof(document)],
      loc: __filename,
      msg: 'id and thisYScale must be valid variables in axes.getYAxis(), returning null'
    });

    return null;
  }

  // dont create axis when rendering on server
  if (typeof document === 'undefined') return null;

  return d3 // eslintignore let d3 handle the axis instead of building ourselves
  .select(document.getElementById('' + id)).select('.y.axis').call(d3.axisLeft(thisYScale)).selectAll("text").classed('axies text', true);
};

/*
 * Create/Update X Axis and insert it in DOM
 */
var getXAxis = exports.getXAxis = function getXAxis(_ref2) {
  var _ref2$dx = _ref2.dx,
      dx = _ref2$dx === undefined ? '-.8em' : _ref2$dx,
      _ref2$dy = _ref2.dy,
      dy = _ref2$dy === undefined ? '.15em' : _ref2$dy,
      _ref2$id = _ref2.id,
      id = _ref2$id === undefined ? '' : _ref2$id,
      _ref2$textAnchor = _ref2.textAnchor,
      textAnchor = _ref2$textAnchor === undefined ? 'end' : _ref2$textAnchor,
      _ref2$thisXScale = _ref2.thisXScale,
      thisXScale = _ref2$thisXScale === undefined ? null : _ref2$thisXScale,
      _ref2$transform = _ref2.transform,
      transform = _ref2$transform === undefined ? 'rotate(-65)' : _ref2$transform;

  if (!id || !thisXScale) {
    appFuncs.logError({
      data: [id, thisXScale, typeof document === 'undefined' ? 'undefined' : _typeof(document)],
      loc: __filename,
      msg: 'id and thisXScale must be valid variables in axes.getXAxis(), returning null'
    });

    return null;
  }

  // dont create axis when rendering on server
  if (typeof document === 'undefined') return null;

  return d3 // eslintignore let d3 handle the axis instead of building ourselves
  .select(document.getElementById('' + id)).select('.x.axis').call(d3.axisBottom(thisXScale)).selectAll('g.tick text').classed('axes text', true).attr('dx', dx).attr('dy', dy).attr('transform', transform).style('text-anchor', textAnchor);
};

/**
 * Positions label on x Axis
 * @method getXAxisLabel
 * @param  {String}      [xAxisLabel=''}] [description]
 * @return {Boolean}     [description]
 */
var getXAxisLabel = exports.getXAxisLabel = function getXAxisLabel(_ref3) {
  var _ref3$transform = _ref3.transform,
      transform = _ref3$transform === undefined ? 'rotate(0)' : _ref3$transform,
      _ref3$x = _ref3.x,
      x = _ref3$x === undefined ? 5 : _ref3$x,
      _ref3$xAxisLabel = _ref3.xAxisLabel,
      xAxisLabel = _ref3$xAxisLabel === undefined ? '' : _ref3$xAxisLabel,
      _ref3$y = _ref3.y,
      y = _ref3$y === undefined ? -5 : _ref3$y;

  if (!xAxisLabel) {
    appFuncs.logError({
      data: xAxisLabel,
      loc: __filename,
      msg: 'id and thisYScale must be valid variables in axes.getYAxis(), returning null'
    });

    return null;
  }

  return _react2.default.createElement(_text2.default, {
    chartType: 'axes',
    text: xAxisLabel,
    transform: transform,
    x: x,
    y: y
  });
};

getXAxisLabel.propTypes = {
  transform: _react2.default.PropTypes.string,
  x: _react2.default.PropTypes.number,
  xAxisLabel: _react2.default.PropTypes.string,
  y: _react2.default.PropTypes.number
};

/**
 * Positions label on y Axis
 * @method getXAxisLabel
 * @param  {String}      [xAxisLabel=''}] [description]
 * @return {Boolean}     [description]
 */
var getYAxisLabel = exports.getYAxisLabel = function getYAxisLabel(_ref4) {
  var _ref4$transform = _ref4.transform,
      transform = _ref4$transform === undefined ? 'rotate(-90)' : _ref4$transform,
      _ref4$x = _ref4.x,
      x = _ref4$x === undefined ? 5 : _ref4$x,
      _ref4$y = _ref4.y,
      y = _ref4$y === undefined ? -5 : _ref4$y,
      _ref4$yAxisLabel = _ref4.yAxisLabel,
      yAxisLabel = _ref4$yAxisLabel === undefined ? '' : _ref4$yAxisLabel;

  if (!yAxisLabel) {
    appFuncs.logError({
      data: [transform, x, y, yAxisLabel],
      loc: __filename,
      msg: 'yAxisLabel must be a valid variable in axes.getYAxisLabel(), returning empty string'
    });

    return '';
  }

  return _react2.default.createElement(_text2.default, {
    chartType: 'axes',
    text: yAxisLabel,
    transform: transform,
    x: x,
    y: y
  });
};

getYAxisLabel.propTypes = {
  transform: _react2.default.PropTypes.string,
  x: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  y: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  yAxisLabel: _react2.default.PropTypes.string
};