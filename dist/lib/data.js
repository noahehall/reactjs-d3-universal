'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = exports.groupBy = exports.formatTime = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _time = require('./time.js');

var time = _interopRequireWildcard(_time);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatTime = exports.formatTime = function formatTime(_ref) {
  var data = _ref.data,
      _ref$timeProperty = _ref.timeProperty,
      timeProperty = _ref$timeProperty === undefined ? '' : _ref$timeProperty,
      _ref$xScaleTimeFormat = _ref.xScaleTimeFormat,
      xScaleTimeFormat = _ref$xScaleTimeFormat === undefined ? '' : _ref$xScaleTimeFormat;

  if (!timeProperty || !xScaleTimeFormat || appFuncs._.isEmpty(data)) {
    appFuncs.logError({
      data: [data, timeProperty, xScaleTimeFormat],
      loc: __filename,
      msg: 'timeProperty and xScaleTimeFormat must be valid variables in data.formatTime(), returning data without transformations'
    });

    return data;
  }
  var parseTime = time.parse({ format: xScaleTimeFormat });
  var transformed = [];

  data.forEach(function (group) {
    return transformed.push(_extends({}, group, _defineProperty({}, timeProperty, parseTime(group[timeProperty]))));
  });

  return transformed;
};

var groupBy = exports.groupBy = function groupBy(_ref2) {
  var _ref2$chartDataGroupB = _ref2.chartDataGroupBy,
      chartDataGroupBy = _ref2$chartDataGroupB === undefined ? '' : _ref2$chartDataGroupB,
      data = _ref2.data,
      xScaleTime = _ref2.xScaleTime,
      xScaleTimeFormat = _ref2.xScaleTimeFormat,
      _ref2$xValue = _ref2.xValue,
      xValue = _ref2$xValue === undefined ? '' : _ref2$xValue;

  if (appFuncs._.isEmpty(data) || !chartDataGroupBy) {
    appFuncs.logError({
      data: [chartDataGroupBy, data],
      loc: __filename,
      msg: 'data and chartDataGroupBy must be valid variables in data.groupBy(), returning data without transformations'
    });

    return data;
  }
  // group all values by groupby
  var dataValues = appFuncs._.groupBy(data, function (d) {
    return d[chartDataGroupBy];
  });

  if (appFuncs._.isEmpty(dataValues)) {
    appFuncs.logError({
      data: [data, dataValues],
      loc: __filename,
      msg: 'could not create groups for data on key ' + chartDataGroupBy + ', returning data'
    });

    return data;
  }

  // create object with values and keys for each lineValues group
  var dataGroups = Object.keys(dataValues).map(function (key) {
    var transformed = [];

    // transform time if required
    if (xScaleTime && xScaleTimeFormat) transformed = formatTime({
      data: dataValues[key],
      timeProperty: xValue,
      xScaleTimeFormat: xScaleTimeFormat
    });

    return {
      id: key,
      values: transformed.length ? transformed : dataValues[key]
    };
  });

  return dataGroups;
};

var format = exports.format = function format(_ref3) {
  var _ref3$chartDataGroupB = _ref3.chartDataGroupBy,
      chartDataGroupBy = _ref3$chartDataGroupB === undefined ? '' : _ref3$chartDataGroupB,
      _ref3$chartType = _ref3.chartType,
      chartType = _ref3$chartType === undefined ? '' : _ref3$chartType,
      data = _ref3.data,
      _ref3$xScaleTime = _ref3.xScaleTime,
      xScaleTime = _ref3$xScaleTime === undefined ? false : _ref3$xScaleTime,
      _ref3$xScaleTimeForma = _ref3.xScaleTimeFormat,
      xScaleTimeFormat = _ref3$xScaleTimeForma === undefined ? '' : _ref3$xScaleTimeForma,
      _ref3$xValue = _ref3.xValue,
      xValue = _ref3$xValue === undefined ? '' : _ref3$xValue;

  if (appFuncs._.isEmpty(data)) return data;

  switch (chartType.toLowerCase()) {
    case 'table':
    case 'line':
    case 'scatterplot':
    case 'bar':
    case 'pie':
    default:
      {
        // Group data and return
        if (chartDataGroupBy) return groupBy({
          chartDataGroupBy: chartDataGroupBy,
          data: data,
          xScaleTime: xScaleTime,
          xScaleTimeFormat: xScaleTimeFormat,
          xValue: xValue
        });

        // transform time and return
        if (xScaleTime && xScaleTimeFormat) return formatTime({
          data: data,
          timeProperty: xValue,
          xScaleTimeFormat: xScaleTimeFormat
        });

        return data;
      }
  }
};