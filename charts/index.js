import { Bars } from './barchart/bars.js';
import { Lines } from './linechart/lines.js';
import { PieSlices } from './piechart/slices.js';
import { ScatterPlotDots } from './scatterplot/dots.js';
import { SVG } from './svg';
import * as axes from './lib/axes.js';
import * as dataFunctions from './lib/data.js';
import * as scales from './lib/scales.js';
import React from 'react';

export const getVisualContainerTransform = ({
  chartHeight,
  chartType,
  chartWidth,
}) => {
  switch(chartType.toLowerCase()) {
    case 'pie': return `translate(${[ chartWidth/2, chartHeight/2 ]})`;
    default : return 'translate(0, 0)';
  }
};

export const Chart = ({
  chart = { data: {}, margins: {}},
  chartDataGroupBy = '',
  chartType = '',
  colorScaleScheme = 'schemeAccent',
  colorScaleType = 'categorical',
  containerHeight = 200,
  containerWidth = 200,
  datumLabels = [],
  id = 'barchart',
  margins = { bottom: 20, left: 60, right: 60, top: 20 },
  preserveAspectRatio = 'xMinYMin meet',
  xAxis = false,
  xAxisLabel = '',
  xScale = false,
  xScaleTime = false, // eslint-disable-line
  xScaleTimeFormat = '',
  xValue = '',
  yAxis = false,
  yAxisLabel = '',
  yScale = false,
  yValue = 'total',
}) => {
  if (appFuncs._.isEmpty(chart.data)) return null;
  let chartFunction;
  switch (chartType.toLowerCase()) {
    case 'pie':
      chartFunction = PieSlices;
      break;
    case 'bar':
      chartFunction = Bars;
      break;
    case 'scatterplot':
      chartFunction = ScatterPlotDots;
      break;
    case 'line':
      chartFunction = Lines;
      break;
    default : return <span />;
  }

  const
    chartHeight = containerHeight - (margins.top + margins.bottom),
    chartWidth = containerWidth - (margins.left + margins.right),
    colorScale = colorScaleScheme
      ? scales.colorScale({ chartDataGroupBy, colorScaleScheme, colorScaleType })
      : null,
    data = dataFunctions.format({
      chartDataGroupBy,
      chartType,
      data: chart.data,
      xScaleTime,
      xScaleTimeFormat,
      xValue,
    }),
    hasDocument = typeof document !== 'undefined',
    thisXAxisLabel = xAxis
      ? axes.getXAxisLabel({
        chartDataGroupBy,
        transform: 'rotate(0)',
        x: containerWidth / 2 - margins.left,
        xAxisLabel: xAxisLabel || xValue,
        y: containerHeight,
      })
      : null,
    thisXScale = xScale
      ? scales.getXScale({
        chartDataGroupBy,
        chartHeight,
        chartType,
        chartWidth,
        data,
        labels: datumLabels,
        margins,
        svgWidth: containerWidth,
        xScaleTime,
        xScaleTimeFormat,
        xValue,
      })
      : null,
    thisYAxisLabel = yAxis
      ? axes.getYAxisLabel({
        chartDataGroupBy,
        transform: 'rotate(-90)',
        // x & y flip because of rotation
        x: -containerHeight / 2 - margins.top,
        y: '1em',
        yAxisLabel: yAxisLabel || yValue,
      })
      : null,
    thisYScale = yScale
      ? scales.getYScale({
        chartDataGroupBy,
        chartHeight,
        chartType,
        chartWidth,
        data,
        margins,
        svgHeight: containerHeight,
        yValue,
      })
      : null;

  if (yAxis && thisYScale && hasDocument) axes.getYAxis({ id, thisYScale });
  if (xAxis && thisXScale && hasDocument) axes.getXAxis({ id, thisXScale });

  return (
    <SVG
      id={id}
      labels={datumLabels}
      margins={margins}
      preserveAspectRatio={preserveAspectRatio}
      svgHeight={containerHeight}
      svgWidth={containerWidth}
    >
      <g
        className='chart-svg-g'
        height={chartHeight}
        transform={`translate(${margins.left}, ${margins.top})`}
        width={chartWidth}
      >
        <g
          className={`${chartType.toLowerCase()}-visual-container`}
          transform={getVisualContainerTransform({ chartHeight, chartType, chartWidth })}
        >
          {chartFunction({
            chartDataGroupBy,
            chartHeight,
            chartType,
            chartWidth,
            colorScale,
            colorScaleScheme,
            colorScaleType,
            data,
            labels: datumLabels,
            xScale: thisXScale,
            xScaleTime,
            xScaleTimeFormat,
            xValue,
            yScale: thisYScale,
            yValue,
          })}
        </g>
      </g>
      { xAxis &&
        <g
          className='x axis'
          transform={`translate(${margins.left}, ${chartHeight + margins.top})`}
        />
      }
      { thisXAxisLabel }
      { yAxis &&
        <g
          className='y axis'
          transform={`translate(${margins.left}, ${margins.top})`}
        />
      }
      { thisYAxisLabel }
      <section
        id={`${id}-tooltip`}
        style={{
          backgroundColor: 'black',
          border: '2px red dashed',
          borderRadius: '4px',
          opacity: 0,
          padding: '10px',
          position: 'absolute',
        }}
      />
    </SVG>
  );
};

Chart.propTypes = {
  chart: React.PropTypes.object,
  chartDataGroupBy: React.PropTypes.string,
  chartType: React.PropTypes.string,
  colorScaleScheme: React.PropTypes.string,
  colorScaleType: React.PropTypes.string,
  containerHeight: React.PropTypes.number,
  containerWidth: React.PropTypes.number,
  datumLabels: React.PropTypes.array,
  id: React.PropTypes.string,
  margins: React.PropTypes.object,
  preserveAspectRatio: React.PropTypes.string,
  xAxis: React.PropTypes.bool,
  xAxisLabel: React.PropTypes.string,
  xScale: React.PropTypes.bool,
  xScaleTime: React.PropTypes.bool,
  xScaleTimeFormat: React.PropTypes.string,
  xValue: React.PropTypes.string,
  yAxis: React.PropTypes.bool,
  yAxisLabel: React.PropTypes.string,
  yScale: React.PropTypes.bool,
  yValue: React.PropTypes.string,
};

export default Chart;
