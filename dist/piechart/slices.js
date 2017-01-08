'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieSlices = undefined;

var _path = require('../svg/path.js');

var _arcs = require('../lib/arcs.js');

var arcs = _interopRequireWildcard(_arcs);

var _labels = require('../lib/labels.js');

var label = _interopRequireWildcard(_labels);

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var PieSlices = exports.PieSlices = function PieSlices(_ref) {
  var _ref$chartHeight = _ref.chartHeight,
      chartHeight = _ref$chartHeight === undefined ? 200 : _ref$chartHeight,
      _ref$chartWidth = _ref.chartWidth,
      chartWidth = _ref$chartWidth === undefined ? 200 : _ref$chartWidth,
      colorScale = _ref.colorScale,
      data = _ref.data,
      _ref$labels = _ref.labels,
      labels = _ref$labels === undefined ? [] : _ref$labels,
      _ref$yValue = _ref.yValue,
      yValue = _ref$yValue === undefined ? '' : _ref$yValue;

  if (appFuncs._.isEmpty(data) || !yValue || !labels.length || !colorScale) {
    appFuncs.logError({
      data: [colorScale, data, labels, yValue],
      loc: __filename,
      msg: 'colorScale, labels, data and yValue must be valid variables in slices.PieSlices(), returning null'
    });

    return null;
  }

  var arcData = arcs.generateArcs({
    data: data,
    sort: null,
    yValue: yValue
  });

  var arcArray = [];

  arcData.forEach(function (arc, idx) {
    var thisArc = arcs.generateArcPath({
      chartHeight: chartHeight,
      chartWidth: chartWidth,
      endAngle: arc.endAngle,
      startAngle: arc.startAngle
    });

    var labelText = label.getLabelText({ chartType: 'simple', d: arc.data, labels: labels });

    if (!labelText.length) appFuncs.logError({
      data: labelText,
      loc: __filename,
      msg: 'labelText has 0 length in slices.PieSlices()'
    });

    arcArray.push(_react2.default.createElement(
      'g',
      {
        className: 'pie-slice',
        key: '' + labelText.replace(/\s+/g, '-').toLowerCase() + idx
      },
      _react2.default.createElement(_path.Path, {
        d: thisArc(),
        fill: colorScale(idx),
        id: 'arc-' + idx
      }),
      label.getLabels({
        arc: arc,
        chartHeight: chartHeight,
        chartType: 'pie',
        chartWidth: chartWidth,
        idx: idx,
        labels: labels
      })
    ));
  });

  return arcArray;
};