'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateArcs = exports.generateArcPath = exports.generateLabelArc = undefined;

var _d = require('../../node_modules/d3/build/d3.node');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var generateLabelArc = exports.generateLabelArc = function generateLabelArc(_ref) {
  var _ref$chartHeight = _ref.chartHeight,
      chartHeight = _ref$chartHeight === undefined ? 200 : _ref$chartHeight,
      _ref$chartWidth = _ref.chartWidth,
      chartWidth = _ref$chartWidth === undefined ? 200 : _ref$chartWidth,
      endAngle = _ref.endAngle,
      startAngle = _ref.startAngle;

  if (isNaN(endAngle) || isNaN(startAngle)) appFuncs.logError({
    data: [endAngle, startAngle],
    loc: __filename,
    msg: 'endAngle and startAngle must be valid variables in arcs.generateLabelArc(), attempting to return labelArc anyway'
  });

  return d3.arc().endAngle(endAngle).innerRadius(Math.min(chartHeight, chartWidth)) // eslintignore bigger number = smaller donut
  .outerRadius(Math.min(chartHeight, chartWidth)) // eslintignore bigger number = smaller pie
  .startAngle(startAngle);
};

// path generator
var generateArcPath = exports.generateArcPath = function generateArcPath(_ref2) {
  var _ref2$chartHeight = _ref2.chartHeight,
      chartHeight = _ref2$chartHeight === undefined ? 200 : _ref2$chartHeight,
      _ref2$chartWidth = _ref2.chartWidth,
      chartWidth = _ref2$chartWidth === undefined ? 200 : _ref2$chartWidth,
      _ref2$cornerRadius = _ref2.cornerRadius,
      cornerRadius = _ref2$cornerRadius === undefined ? 1 : _ref2$cornerRadius,
      endAngle = _ref2.endAngle,
      _ref2$padAngle = _ref2.padAngle,
      padAngle = _ref2$padAngle === undefined ? 0.03 : _ref2$padAngle,
      startAngle = _ref2.startAngle;

  if (isNaN(startAngle) || isNaN(endAngle)) appFuncs.logError({
    data: [endAngle, startAngle],
    loc: __filename,
    msg: 'endAngle and startAngle must be valid variables in arcs.generateArcPath(), attempting to return arcPath anyway'
  });

  return d3.arc().cornerRadius(cornerRadius).endAngle(endAngle).innerRadius(Math.min(chartWidth, chartHeight) / 8) // eslintignore bigger number = smaller donut
  .outerRadius(Math.min(chartWidth, chartHeight) / 1.9) // eslintignore bigger number = smaller pie
  .padAngle(padAngle).startAngle(startAngle);
};

/**
 * Returns an array of objects with data for each slice
 * @method generateArcs
 * @param  {[type]}     [sort=null] [description]
 * @return {[type]}     [description]
 */
var generateArcs = exports.generateArcs = function generateArcs(_ref3) {
  var data = _ref3.data,
      _ref3$sort = _ref3.sort,
      sort = _ref3$sort === undefined ? null : _ref3$sort,
      _ref3$yValue = _ref3.yValue,
      yValue = _ref3$yValue === undefined ? '' : _ref3$yValue;

  if (appFuncs._.isEmpty(data) || !yValue) appFuncs.logError({
    data: [data, yValue],
    loc: __filename,
    msg: 'data and yValue must be valid variables in arcs.generateArcs(), attempting to return arcs anyway'
  });

  return d3.pie().sort(sort).value(function (d) {
    return d[yValue];
  })(data);
};