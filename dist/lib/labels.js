'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLabels = exports.getPieLabels = exports.getLabelText = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

var _arcs = require('./arcs.js');

var arcs = _interopRequireWildcard(_arcs);

var _text = require('../svg/text.js');

var _text2 = _interopRequireDefault(_text);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getLabelText = exports.getLabelText = function getLabelText(_ref) {
  var _ref$arc = _ref.arc,
      arc = _ref$arc === undefined ? {} : _ref$arc,
      _ref$chartType = _ref.chartType,
      chartType = _ref$chartType === undefined ? '' : _ref$chartType,
      _ref$d = _ref.d,
      d = _ref$d === undefined ? {} : _ref$d,
      _ref$labels = _ref.labels,
      labels = _ref$labels === undefined ? [] : _ref$labels;

  if (!labels.length || !chartType) {
    appFuncs.logError({
      data: [arc, chartType, d, labels],
      loc: __filename,
      msg: 'labels, chartType, and arc must be valid variables in labels.getLabelText(), returning empty string'
    });

    return '';
  }
  switch (chartType.toLowerCase()) {
    case 'pie':
      {
        var _ret = function () {
          if (appFuncs._.isEmpty(arc.data)) {
            appFuncs.logError({
              data: [arc, chartType, labels],
              loc: __filename,
              msg: 'arc.data must be a valid variable in labels.getLabelText(), returning empty string'
            });

            return {
              v: ''
            };
          }

          var label = [];
          labels.forEach(function (thisLabel, idx) {
            return label.push(_react2.default.createElement(
              'tspan',
              { className: 'label', key: thisLabel + '-' + idx },
              arc.data[thisLabel] + '  '
            ));
          });

          return {
            v: label
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    case 'scatterplot':
    case 'bar':
    case 'simple':
      {
        if (appFuncs._.isEmpty(d)) {
          appFuncs.logError({
            data: d,
            loc: __filename,
            msg: 'd must be a valid variable in labels.getLabelText(), returning empty string'
          });

          return '';
        }

        var thisLabel = '';
        labels.forEach(function (label) {
          return thisLabel += d[label] + ' ';
        });

        return thisLabel;
      }
    default:
      {
        appFuncs.logError({
          data: chartType,
          loc: __filename,
          msg: 'chartType not setup for labels.getLabelText() returning null'
        });

        return null;
      }
  }
};
getLabelText.propTypes = {
  arc: _react2.default.PropTypes.object,
  chartType: _react2.default.PropTypes.string,
  d: _react2.default.PropTypes.object,
  labels: _react2.default.PropTypes.array
};

var getPieLabels = exports.getPieLabels = function getPieLabels(_ref2) {
  var _ref2$arc = _ref2.arc,
      arc = _ref2$arc === undefined ? {} : _ref2$arc,
      _ref2$chartHeight = _ref2.chartHeight,
      chartHeight = _ref2$chartHeight === undefined ? 200 : _ref2$chartHeight,
      _ref2$chartWidth = _ref2.chartWidth,
      chartWidth = _ref2$chartWidth === undefined ? 200 : _ref2$chartWidth,
      _ref2$idx = _ref2.idx,
      idx = _ref2$idx === undefined ? 0 : _ref2$idx,
      _ref2$labels = _ref2.labels,
      labels = _ref2$labels === undefined ? [] : _ref2$labels;

  if (appFuncs._.isEmpty(arc) || !labels.length) {
    appFuncs.logError({
      data: arc,
      loc: __filename,
      msg: 'arc and labels must be a valid variable in labels.getPieLabels(), returning null'
    });

    return null;
  }

  var thisArc = arcs.generateLabelArc({
    chartHeight: chartHeight,
    chartWidth: chartWidth,
    endAngle: arc.endAngle,
    startAngle: arc.startAngle
  });
  // tbd: automatic text sizing
  // appFuncs.console('dir')(this.text.getComputedTextLength());

  var _thisArc$centroid = thisArc.centroid(arc),
      _thisArc$centroid2 = _slicedToArray(_thisArc$centroid, 2),
      x = _thisArc$centroid2[0],
      y = _thisArc$centroid2[1],
      dx = (arc.endAngle + arc.startAngle) / 2 > Math.PI ? -15 : 15,
      text = getLabelText({ arc: arc, chartType: 'pie', labels: labels });

  if (!text) {
    appFuncs.logError({
      data: ['chartType = pie', arc, labels],
      msg: 'text needs to be a valid variable, check labels.getLabelText method, returning empty string'
    });

    return '';
  }

  return _react2.default.createElement(_text2.default, {
    chartType: 'pie',
    className: '',
    dx: dx,
    dy: 0,
    text: text,
    transform: 'rotate(0)',
    x: x / 2,
    xlinkHref: '#arc-' + idx,
    y: y / 2
  });
};
getPieLabels.propTypes = {
  arc: _react2.default.PropTypes.object,
  chartHeight: _react2.default.PropTypes.number,
  chartWidth: _react2.default.PropTypes.number,
  idx: _react2.default.PropTypes.number,
  labels: _react2.default.PropTypes.array
};

var getLabels = exports.getLabels = function getLabels(_ref3) {
  var _ref3$arc = _ref3.arc,
      arc = _ref3$arc === undefined ? {} : _ref3$arc,
      _ref3$chartHeight = _ref3.chartHeight,
      chartHeight = _ref3$chartHeight === undefined ? 200 : _ref3$chartHeight,
      _ref3$chartType = _ref3.chartType,
      chartType = _ref3$chartType === undefined ? '' : _ref3$chartType,
      _ref3$chartWidth = _ref3.chartWidth,
      chartWidth = _ref3$chartWidth === undefined ? 200 : _ref3$chartWidth,
      d = _ref3.d,
      _ref3$idx = _ref3.idx,
      idx = _ref3$idx === undefined ? 0 : _ref3$idx,
      _ref3$labels = _ref3.labels,
      labels = _ref3$labels === undefined ? [] : _ref3$labels;

  if (!chartType) {
    appFuncs.logError({
      data: [arc, chartType, d, labels],
      loc: __filename,
      msg: 'Chart type must be defined in labels.getLabels(), returning empty string'
    });

    return '';
  }
  switch (chartType.toLowerCase()) {
    case 'pie':
      return getPieLabels({
        arc: arc,
        chartHeight: chartHeight,
        chartType: chartType,
        chartWidth: chartWidth,
        idx: idx,
        labels: labels
      });
    default:
      {
        var label = '';
        labels.forEach(function (thisLabel) {
          return label += d[thisLabel] + ' ';
        });

        return label;
      }
  }
};