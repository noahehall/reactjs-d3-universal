'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLine = undefined;

var _d = require('../../node_modules/d3/build/d3.node');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var generateLine = exports.generateLine = function generateLine(_ref) {
  var _ref$lineCurve = _ref.lineCurve,
      lineCurve = _ref$lineCurve === undefined ? '' : _ref$lineCurve,
      xScale = _ref.xScale,
      _ref$xValue = _ref.xValue,
      xValue = _ref$xValue === undefined ? '' : _ref$xValue,
      yScale = _ref.yScale,
      _ref$yValue = _ref.yValue,
      yValue = _ref$yValue === undefined ? '' : _ref$yValue;

  if (!xScale || !xValue || !yValue || !yScale) {
    appFuncs.logError({
      data: [xScale, xValue, yScale, yValue],
      loc: __filename,
      msg: 'xScale, xValue, yScale and yValue must be valid variables in lines.generateLine(), returning null'
    });

    return null;
  }

  var thisCurve = void 0;

  if (!lineCurve || !d3[lineCurve]) thisCurve = d3.curveBasis;else thisCurve = d3[lineCurve];

  return d3.line().curve(thisCurve).x(function (d) {
    return xScale(d[xValue]);
  }).y(function (d) {
    return yScale(d[yValue]);
  });
};