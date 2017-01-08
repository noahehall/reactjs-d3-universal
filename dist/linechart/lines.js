'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lines = undefined;

var _lines = require('../lib/lines.js');

var _path = require('../svg/path.js');

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lines = exports.Lines = function Lines(_ref) {
  var _ref$chartType = _ref.chartType,
      chartType = _ref$chartType === undefined ? '' : _ref$chartType,
      colorScale = _ref.colorScale,
      data = _ref.data,
      _ref$lineCurve = _ref.lineCurve,
      lineCurve = _ref$lineCurve === undefined ? '' : _ref$lineCurve,
      xScale = _ref.xScale,
      _ref$xValue = _ref.xValue,
      xValue = _ref$xValue === undefined ? '' : _ref$xValue,
      yScale = _ref.yScale,
      _ref$yValue = _ref.yValue,
      yValue = _ref$yValue === undefined ? '' : _ref$yValue;

  if (appFuncs._.isEmpty(data) || !chartType || !xScale || !yScale || !yValue || !xValue) {
    appFuncs.logError({
      data: [chartType, data, xScale, xValue, yScale, yValue],
      loc: __filename,
      msg: 'chartType, data, xScale, xValue, yScale, yValue must be valid variables in lines.Lines(), returning null'
    });

    return null;
  }

  switch (chartType.toLowerCase()) {
    case 'line':
      {
        var lineGenerator = (0, _lines.generateLine)({
          lineCurve: lineCurve,
          xScale: xScale,
          xValue: xValue,
          yScale: yScale,
          yValue: yValue
        });
        var pathArray = [];
        for (var group in data) {
          // generate path for each lineGroup
          pathArray.push(_react2.default.createElement(_path.Path, {
            chartType: chartType,
            d: lineGenerator(data[group].values),
            fill: 'none',
            id: data[group].id,
            key: data[group].id,
            stroke: colorScale(data[group].id)
          }));
        }return pathArray;
      }
    default:
      return null;
  }
};

exports.default = Lines;