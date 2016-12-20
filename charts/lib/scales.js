import * as d3 from 'd3';
import * as d3chromatic from 'd3-scale-chromatic'; // eslintignore https://github.com/d3/d3-scale-chromatic
import * as label from './labels.js';

// anywhere you need the Y dimension of the bar to scale to the viewport of the svg
// first send it into this function e.g. below in the Height and Y properties
export const yScale = ({
  chartHeight,
  chartType = 'bar',
  dataMaxNumber,
}) => {
  switch (chartType.toLowerCase()) {
    case 'pie': return null;
    case 'bar':
    default: {
      return d3
        .scaleLinear()
        .domain([ 0, dataMaxNumber ])
        .range([ chartHeight, 0 ]);
    }
  }
};

export const getYScale = ({
  data = {},
  margins = {},
  svgHeight = 200,
  value = '',
}) => {
  if (!value || appFuncs._.isEmpty(data)) return null;
  const dataMaxNumber = appFuncs._.maxBy(data, (o) => o[value])[value];

  return yScale({
    chartHeight: svgHeight - (margins.top + margins.bottom),
    dataMaxNumber,
  });
};

// anywhere you need the X dimension of the bar to scale to the viewport of the svg
export const xScale = ({
  chartType = 'bar',
  chartWidth,
  dataLabelsArray,
}) => {
  switch (chartType.toLowerCase()) {
    case 'pie': return null;
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

export const getXScale = ({
  data,
  labels,
  margins,
  svgWidth,
}) =>
  xScale({
    chartWidth: svgWidth - (margins.left + margins.right),
    dataLabelsArray: data.map((d) => label.getLabels({ d, labels })),
  });

// set color scale based on
export const colorScale = (type) => (
  type && d3chromatic[type]
    ? d3.scaleOrdinal(d3chromatic[type])
    : null
);
