import * as d3 from 'd3';
import * as d3chromatic from 'd3-scale-chromatic'; // eslintignore https://github.com/d3/d3-scale-chromatic
import * as label from './labels.js';

/**
 * create yscale
 * anywhere you need the Y dimension of the bar to scale to the viewport of the svg
 * first send it into this function e.g. below in the Height and Y properties
 */
export const yScale = ({
  chartHeight,
  chartType = 'bar',
  dataMaxNumber,
  dataMinNumber = 1,
}) => {
  switch (chartType.toLowerCase()) {
    case 'pie': return null;
    case 'scatterplot':
    case 'bar':
    default: {
      return d3
        .scaleLinear()
        .domain([
          chartType === 'scatterplot'
            // -1 for scatterplot dots to always be above axis
            ? dataMinNumber - 1
            : 0,
          chartType === 'scatterplot'
            // +1 for scatterplot dots to always be below axis
            ? dataMaxNumber + 1
            : dataMaxNumber,
        ])
        .range([ chartHeight, 0 ]);
    }
  }
};

/**
 * retrieve xscale
 */
export const getYScale = ({
  // chartHeight = 200,
  chartType = 'bar',
  data = {},
  // chartWidth = 200,
  margins = {},
  svgHeight = 200,
  yValue = '',
}) => {
  if (!yValue || appFuncs._.isEmpty(data)) return null;
  let
    dataMaxNumber,
    dataMinNumber;

  switch (chartType.toLowerCase()) {
    case 'pie': return null;
    case 'scatterplot': {
      dataMinNumber = appFuncs._.minBy(data, (o) => o[yValue])[yValue];
    }
    case 'bar': // eslint-disable-line no-fallthrough
    default: {
      dataMaxNumber = appFuncs._.maxBy(data, (o) => o[yValue])[yValue];
    }
  }

  return yScale({
    chartHeight: svgHeight - (margins.top + margins.bottom),
    chartType,
    dataMaxNumber,
    dataMinNumber,
  });
};

/**
 * create xscale
 * anywhere you need the X dimension of the bar to scale to the viewport of the svg
 */
export const xScale = ({
  // chartHeight = 200,
  chartType = 'bar',
  chartWidth = 200,
  dataLabelsArray,
  dataMinNumber = 1,
  dataMaxNumber = 1,
}) => {
  switch (chartType.toLowerCase()) {
    case 'pie': return null;
    case 'scatterplot': {
      return d3
        .scaleLinear()
        .domain([
          dataMinNumber > 0
            // -1 for scatterplot dots to always be above axis
            ? dataMinNumber - 1
            : 0,
          // +1 for scatterplot dots to always be below axis
          dataMaxNumber + 1
        ])
        .range([ 0, chartWidth ]);
    }
    case 'bar':
    default: {
      return d3
        .scaleBand()
        .domain(dataLabelsArray)
        .rangeRound([ 0, chartWidth ])
        .paddingInner(0.1)
        .paddingOuter(0.5);
    }
  }
};

/**
 * retrieve xscale
 */
export const getXScale = ({
  chartType = 'bar',
  data,
  labels,
  margins,
  svgWidth,
  xValue,
}) => { // eslint-disable-line consistent-return
  const chartWidth = svgWidth - (margins.left + margins.right);

  switch (chartType.toLowerCase()) {
    case 'pie': return null;
    case 'scatterplot': {
      let dataMaxNumber, dataMinNumber;

      try {
        dataMaxNumber = appFuncs._.maxBy(data, (o) => o[xValue])[xValue];
        dataMinNumber = appFuncs._.minBy(data, (o) => o[xValue])[xValue];
      } catch (err) {
        appFuncs.console('error')(err);

        return null;
      }

      return xScale({
        chartType,
        chartWidth,
        dataMaxNumber,
        dataMinNumber,
      });
    }
    case 'bar':
    default: {
      return xScale({
        chartType,
        chartWidth,
        dataLabelsArray: data.map((d) => label.getLabels({ d, labels })),
      });
    }
  }
};

// Retrieve color scale
export const colorScale = ({ colorScaleScheme, colorScaleType = 'categorical' }) => {
  switch (colorScaleType.toLowerCase()) {
    case 'categorical': {
      return colorScaleScheme && d3chromatic[colorScaleScheme]
        ? d3.scaleOrdinal(d3chromatic[colorScaleScheme])
        : null;
    }
    case 'sequential': {
      return d3.scaleSequential(d3.interpolatePiYG);
    }
    case 'random':
    default: {
      return d3.interpolateCool(Math.random());
    }
  }
};
