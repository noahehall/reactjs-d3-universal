'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bars = undefined;

var _rect = require('../svg/rect.js');

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

var _labels = require('../lib/labels.js');

var label = _interopRequireWildcard(_labels);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bars = exports.Bars = function Bars(_ref) {
  var _ref$chartHeight = _ref.chartHeight,
      chartHeight = _ref$chartHeight === undefined ? 200 : _ref$chartHeight,
      colorScale = _ref.colorScale,
      data = _ref.data,
      labels = _ref.labels,
      _ref$yValue = _ref.yValue,
      yValue = _ref$yValue === undefined ? '' : _ref$yValue,
      xScale = _ref.xScale,
      yScale = _ref.yScale;

  if (!yScale || !xScale || !yValue) {
    appFuncs.logError({
      data: [xScale, yScale, yValue],
      loc: __filename,
      msg: 'yScale, yValue and xScale must be valid variables in Bars(), returning null'
    });

    return null;
  }
  var rects = [];
  data.forEach(function (d, i) {
    // this is required for tick marks
    var labelText = label.getLabelText({ chartType: 'bar', d: d, labels: labels });
    rects.push(_react2.default.createElement(
      'g',
      { className: 'bar', key: '' + labelText.replace(/\s+/g, '-').toLowerCase() + i },
      _react2.default.createElement(_rect.Rect, {
        className: 'rect',
        fill: colorScale(i),
        height: chartHeight - yScale(d[yValue]),
        width: xScale.bandwidth()
        // `i * (barWidth + barOffset)` if you're not using scaleBands
        , x: xScale(labelText),
        y: yScale(d[yValue])
      })
    ));
  });

  return rects;
};

exports.default = Bars;