'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorScale = exports.getXScale = exports.xScale = exports.getYScale = exports.yScale = undefined;

var _d = require('../../node_modules/d3/build/d3.node');

var d3 = _interopRequireWildcard(_d);

var _d3ScaleChromatic = require('../../node_modules/d3-scale-chromatic/build/d3-scale-chromatic');

var d3chromatic = _interopRequireWildcard(_d3ScaleChromatic);

var _labels = require('./labels.js');

var label = _interopRequireWildcard(_labels);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // eslintignore https://github.com/d3/d3-scale-chromatic


/**
 * create yscale
 * anywhere you need the Y dimension of the bar to scale to the viewport of the svg
 * first send it into this function e.g. below in the Height and Y properties
 */
var yScale = exports.yScale = function yScale(_ref) {
  var chartHeight = _ref.chartHeight,
      chartType = _ref.chartType,
      dataMaxNumber = _ref.dataMaxNumber,
      dataMinNumber = _ref.dataMinNumber;

  if (!chartType) {
    appFuncs.logError({
      data: [chartHeight, chartType, dataMinNumber, dataMaxNumber],
      loc: __filename,
      msg: 'chart type cannot be undefined for scales.yScale(), returning null'
    });

    return null;
  }
  switch (chartType.toLowerCase()) {
    case 'pie':
      return null;
    case 'line':
    case 'scatterplot':
    case 'bar':
    default:
      {
        if (chartHeight < 0 || dataMaxNumber < 0) {
          appFuncs.logError({
            data: [chartHeight, chartType, dataMaxNumber, dataMinNumber],
            loc: __filename,
            msg: 'all values should be defined and above 0 for scales.yScale(), returning null'
          });

          return null;
        }

        return d3.scaleLinear().domain([chartType === 'scatterplot'
        // -1 for scatterplot dots to always be above axis
        ? dataMinNumber - 1 : 0, chartType === 'scatterplot'
        // +1 for scatterplot dots to always be below axis
        ? dataMaxNumber + 1 : dataMaxNumber]).range([chartHeight, 0]);
      }
  }
};

/**
 * retrieve xscale
 */
var getYScale = exports.getYScale = function getYScale(_ref2) {
  var _ref2$chartDataGroupB = _ref2.chartDataGroupBy,
      chartDataGroupBy = _ref2$chartDataGroupB === undefined ? '' : _ref2$chartDataGroupB,
      _ref2$chartType = _ref2.chartType,
      chartType = _ref2$chartType === undefined ? '' : _ref2$chartType,
      data = _ref2.data,
      _ref2$margins = _ref2.margins,
      margins = _ref2$margins === undefined ? {} : _ref2$margins,
      _ref2$svgHeight = _ref2.svgHeight,
      svgHeight = _ref2$svgHeight === undefined ? 200 : _ref2$svgHeight,
      _ref2$yValue = _ref2.yValue,
      yValue = _ref2$yValue === undefined ? '' : _ref2$yValue;

  if (!yValue || !chartType || appFuncs._.isEmpty(data)) {
    appFuncs.logError({
      data: [chartType, data, yValue],

      msg: 'yValue, chartType and data need to be valid variables for scales.getYScale(), returning null'
    });

    return null;
  }

  var dataMaxNumber = void 0,
      dataMinNumber = void 0;

  // flatten if required
  var thisData = [];
  if (chartDataGroupBy) data.forEach(function (group) {
    var _thisData;

    return (_thisData = thisData).push.apply(_thisData, _toConsumableArray(group.values));
  });else thisData = data;

  switch (chartType.toLowerCase()) {
    case 'pie':
      return null;
    case 'line': // eslintignore both min and max
    case 'scatterplot':
      {
        // eslintignore both min and max
        try {
          dataMinNumber = appFuncs._.minBy(thisData, function (o) {
            return o[yValue];
          })[yValue];
        } catch (err) {
          appFuncs.logError({
            data: [thisData, yValue],
            err: err,
            loc: __filename,
            msg: 'error creating dataMinNumber for scatterplot chart in scales.getYScale()'
          });
        }
      }
    case 'bar': // eslint-disable-line no-fallthrough
    default:
      {
        try {
          dataMaxNumber = appFuncs._.maxBy(thisData, function (o) {
            return o[yValue];
          })[yValue];
        } catch (err) {
          appFuncs.logError({
            data: [thisData, yValue],
            err: err,
            loc: __filename,
            msg: 'error creating dataManNumber for bar chrt chart in scales.getYScale()'
          });
        }
      }
  }

  return yScale({
    chartHeight: svgHeight - (margins.top + margins.bottom),
    chartType: chartType,
    dataMaxNumber: dataMaxNumber,
    dataMinNumber: dataMinNumber
  });
};

/**
 * create xscale
 * anywhere you need the X dimension of the bar to scale to the viewport of the svg
 */
var xScale = exports.xScale = function xScale(_ref3) {
  var _ref3$chartType = _ref3.chartType,
      chartType = _ref3$chartType === undefined ? '' : _ref3$chartType,
      _ref3$chartWidth = _ref3.chartWidth,
      chartWidth = _ref3$chartWidth === undefined ? 200 : _ref3$chartWidth,
      _ref3$dataLabelsArray = _ref3.dataLabelsArray,
      dataLabelsArray = _ref3$dataLabelsArray === undefined ? [] : _ref3$dataLabelsArray,
      dataMinNumber = _ref3.dataMinNumber,
      dataMaxNumber = _ref3.dataMaxNumber,
      xScaleTime = _ref3.xScaleTime;

  if (!chartType) {
    appFuncs.logError({
      loc: __filename,
      msg: 'chart type (' + chartType + ') needs to be a valid chart type for scales.xScale(), returning null'
    });

    return null;
  }

  if (xScaleTime) switch (chartType.toLowerCase()) {
    case 'line':
      {
        return d3.scaleTime().domain([dataMinNumber, dataMaxNumber]).range([0, chartWidth]);
      }
    default:
      {
        appFuncs.logError({
          loc: __filename,
          msg: 'chartType ' + chartType + ' not setup for xScaleTime in scales.xScale(), returning null'
        });

        return null;
      }
  }

  switch (chartType.toLowerCase()) {
    case 'pie':
      return null;
    case 'scatterplot':
      {
        return d3.scaleLinear().domain([dataMinNumber > 0
        // -1 for scatterplot dots to always be above axis
        ? dataMinNumber - 1 : 0,
        // +1 for scatterplot dots to always be below axis
        dataMaxNumber + 1]).range([0, chartWidth]);
      }
    case 'bar':
      {
        if (!dataLabelsArray.length) appFuncs.logError({
          data: [chartType, dataLabaelsArray],
          loc: __filename,
          msg: 'dataLabaelsArray cannot be empty in scales.xScale(), attempting to create and return xScale anyway'
        });

        return d3.scaleBand().domain(dataLabelsArray).rangeRound([0, chartWidth]).paddingInner(0.1).paddingOuter(0.5);
      }
    default:
      {
        appFuncs.logError({
          msg: 'chartType ' + chartType + ' is not setup for scale creation in scales.xScale(), returning null'
        });

        return null;
      }
  }
};

/**
 * retrieve xscale
 */
var getXScale = exports.getXScale = function getXScale(_ref4) {
  var _ref4$chartDataGroupB = _ref4.chartDataGroupBy,
      chartDataGroupBy = _ref4$chartDataGroupB === undefined ? '' : _ref4$chartDataGroupB,
      _ref4$chartType = _ref4.chartType,
      chartType = _ref4$chartType === undefined ? '' : _ref4$chartType,
      data = _ref4.data,
      labels = _ref4.labels,
      _ref4$margins = _ref4.margins,
      margins = _ref4$margins === undefined ? {} : _ref4$margins,
      _ref4$svgWidth = _ref4.svgWidth,
      svgWidth = _ref4$svgWidth === undefined ? 200 : _ref4$svgWidth,
      xValue = _ref4.xValue,
      xScaleTime = _ref4.xScaleTime;
  // eslint-disable-line consistent-return
  if (appFuncs._.isEmpty(data)) {
    appFuncs.logError({
      data: [chartType, data],
      loc: __filename,
      msg: 'data must be a valid variable in scales.getXScale(), returning null'
    });

    return null;
  }
  var chartWidth = svgWidth - (margins.left + margins.right);

  var dataLabelsArray = void 0,
      dataMaxNumber = void 0,
      dataMinNumber = void 0;

  // flatten if required
  var thisData = [];
  if (chartDataGroupBy) data.forEach(function (group) {
    var _thisData2;

    return (_thisData2 = thisData).push.apply(_thisData2, _toConsumableArray(group.values));
  });else thisData = data;

  switch (chartType.toLowerCase()) {
    case 'pie':
      return null;
    case 'line': // eslintignore both min and max
    case 'scatterplot':
      {
        // eslintignore both min and max
        try {
          dataMaxNumber = appFuncs._.maxBy(thisData, function (o) {
            return o[xValue];
          })[xValue];
        } catch (err) {
          appFuncs.logError({
            data: [thisData, xValue],
            err: err,
            loc: __filename,
            msg: 'error creating dataMaxNumber for scatterplot chart in scales.getXScale()'
          });
        }

        try {
          dataMinNumber = appFuncs._.minBy(thisData, function (o) {
            return o[xValue];
          })[xValue];
        } catch (err) {
          appFuncs.logError({
            data: [thisData, xValue],
            err: err,
            loc: __filename,
            msg: 'error creating dataMixNumber for scatterplot chart in scales.getXScale()'
          });
        }

        break;
      }
    case 'bar': // eslint-disable-line
    default:
      {
        dataLabelsArray = thisData.map(function (d) {
          return label.getLabels({ chartType: chartType, d: d, labels: labels });
        });
      }
  }

  return xScale({
    chartType: chartType,
    chartWidth: chartWidth,
    dataLabelsArray: dataLabelsArray,
    dataMaxNumber: dataMaxNumber,
    dataMinNumber: dataMinNumber,
    xScaleTime: xScaleTime
  });
};

// Retrieve color scale
var colorScale = exports.colorScale = function colorScale(_ref5) {
  var _ref5$colorScaleSchem = _ref5.colorScaleScheme,
      colorScaleScheme = _ref5$colorScaleSchem === undefined ? 'schemeCategory20' : _ref5$colorScaleSchem,
      _ref5$colorScaleType = _ref5.colorScaleType,
      colorScaleType = _ref5$colorScaleType === undefined ? 'basic' : _ref5$colorScaleType;

  switch (colorScaleType.toLowerCase()) {
    // update this:
    // https://github.com/d3/d3-scale/blob/master/README.md#category-scales
    case 'basic':
      {
        if (d3[colorScaleScheme]) return d3.scaleOrdinal(d3[colorScaleScheme]);

        appFuncs.logError({
          data: [colorScaleScheme, colorScaleType],
          loc: __filename,
          msg: 'Scheme ' + colorScaleScheme + ' does not exist for Scale type ' + colorScaleType + ', returning default schemeCategory20'
        });

        return d3.scaleOrdinal(d3.schemeCategory20);
      }
    // update this:
    // https://github.com/d3/d3-scale-chromatic#categorical
    // https://github.com/d3/d3-scale-chromatic#diverging
    case 'chromatic':
      {
        if (colorScaleScheme && d3chromatic[colorScaleScheme]) return d3.scaleOrdinal(d3chromatic[colorScaleScheme]);

        appFuncs.logError({
          data: [colorScaleScheme, colorScaleType],
          loc: __filename,
          msg: 'Scheme ' + colorScaleScheme + ' does not exist for Scale type ' + colorScaleType + ', returning ' + schemeAccent
        });

        return d3.scaleOrdinal(d3chromatic.schemeAccent);
      }
    // update this
    // https://github.com/d3/d3/blob/master/API.md#sequential-scales
    case 'sequential':
      {
        return d3.scaleSequential(d3.interpolatePiYG);
      }
    // update this: https://github.com/d3/d3/blob/master/API.md#sequential-scales
    case 'random':
    default:
      {
        appFuncs.logError({
          data: [colorScaleScheme, colorScaleType],
          loc: __filename,
          msg: 'Scheme ' + colorScaleScheme + ' does not exist for Scale type ' + colorScaleType + ', returning ' + interpolateCool
        });

        return d3.interpolateCool;
      }
  }
};