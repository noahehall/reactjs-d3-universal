import { Bars } from './barchart/bars.js';
import { PieSlices } from './piechart/slices.js';
import { ScatterPlotDots } from './scatterplot/dots.js';
import { SVG } from './svg';
import * as axes from './lib/axes.js';
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
  chartType = '',
  colorScaleScheme = 'schemeAccent',
  colorScaleType = 'categorical',
  containerHeight = 200,
  containerWidth = 200,
  id = 'barchart',
  labels = [],
  margins = { bottom: 20, left: 60, right: 60, top: 20 },
  preserveAspectRatio = 'xMinYMin meet',
  xAxis = false,
  xScale = false,
  xValue = '',
  yAxis = false,
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
    default : return <span />;
  }

  const
    chartHeight = containerHeight - (margins.top + margins.bottom),
    chartWidth = containerWidth - (margins.left + margins.right),
    colorScale = colorScaleScheme
      ? scales.colorScale({ colorScaleScheme, colorScaleType })
      : null,
    data = chart.data,
    hasDocument = typeof document !== 'undefined',
    thisXScale = xScale
      ? scales.getXScale({
        chartHeight,
        chartType,
        chartWidth,
        data,
        labels,
        margins,
        svgWidth: containerWidth,
        xValue
      })
      : null,
    thisYScale = yScale
      ? scales.getYScale({
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
      labels={labels}
      margins={appFuncs._.isEmpty(chart.margins) ? margins : chart.margins}
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
            chartHeight,
            chartType,
            chartWidth,
            colorScale,
            colorScaleScheme,
            colorScaleType,
            data,
            labels,
            xScale: thisXScale,
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
      { yAxis &&
        <g
          className='y axis'
          transform={`translate(${margins.left}, ${margins.top})`}
        />
      }
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
  chartType: React.PropTypes.string,
  colorScaleScheme: React.PropTypes.string,
  colorScaleType: React.PropTypes.string,
  containerHeight: React.PropTypes.number,
  containerWidth: React.PropTypes.number,
  id: React.PropTypes.string,
  labels: React.PropTypes.array,
  margins: React.PropTypes.object,
  preserveAspectRatio: React.PropTypes.string,
  xAxis: React.PropTypes.bool,
  xScale: React.PropTypes.bool,
  xValue: React.PropTypes.string,
  yAxis: React.PropTypes.bool,
  yScale: React.PropTypes.bool,
  yValue: React.PropTypes.string,
};

export default Chart;
