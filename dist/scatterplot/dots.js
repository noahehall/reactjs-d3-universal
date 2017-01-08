'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScatterPlotDots = undefined;

var _circle = require('../svg/circle.js');

var _labels = require('../lib/labels.js');

var label = _interopRequireWildcard(_labels);

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ScatterPlotDots = exports.ScatterPlotDots = function ScatterPlotDots(_ref) {
  var _ref$chartType = _ref.chartType,
      chartType = _ref$chartType === undefined ? 'scatterplot' : _ref$chartType,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? 'dot' : _ref$className,
      colorScale = _ref.colorScale,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      _ref$labels = _ref.labels,
      labels = _ref$labels === undefined ? [] : _ref$labels,
      _ref$r = _ref.r,
      r = _ref$r === undefined ? 3.5 : _ref$r,
      xValue = _ref.xValue,
      yValue = _ref.yValue,
      xScale = _ref.xScale,
      yScale = _ref.yScale;

  if (!yScale || !xScale || !xValue || !yValue) return null;
  var dots = [];
  data.forEach(function (d, i) {
    var labelText = label.getLabelText({ chartType: chartType, d: d, labels: labels });

    dots.push(_react2.default.createElement(
      'g',
      { className: className, key: '' + labelText.replace(/\s+/g, '-').toLowerCase() + i },
      _react2.default.createElement(_circle.Circle, {
        className: 'circle',
        cx: xScale(d[xValue]),
        cy: yScale(d[yValue]),
        fill: colorScale(i),
        r: r
      })
    ));
  });

  return dots;
};