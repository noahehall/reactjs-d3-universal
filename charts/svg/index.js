import { Bars } from '../barchart/bars.js';
import { PieSlices } from '../piechart/slices.js';
import * as scales from '../lib/scales.js';
import * as axes from '../lib/axes.js';
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

export const SVG = ({
  chartType = '',
  colorScale = 'schemeAccent',
  data = {},
  id = 'chart',
  labels = [],
  margins = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  preserveAspectRatio = 'xMinYMin meet',
  svgHeight = 200,
  svgWidth = 200,
  value = 'total',
  xAxis = false,
  xScale = false,
  yAxis = false,
  yScale = false,
}) => {
  if (appFuncs._.isEmpty(data)) return null;
  let chartFunction;
  switch (chartType.toLowerCase()) {
    case 'pie':
      chartFunction = PieSlices;
      break;
    case 'bar':
      chartFunction = Bars;
      break;
    default : return <span />;
  }

  const
    chartHeight = svgHeight - (margins.top + margins.bottom),
    chartWidth = svgWidth - (margins.left + margins.right),
    hasDocument = typeof document !== 'undefined',
    thisColorScale = colorScale
      ? scales.colorScale(colorScale)
      : null,
    thisXScale = xScale
      ? scales.getXScale({ data, labels, margins, svgWidth })
      : null,
    thisYScale = yScale
      ? scales.getYScale({ data, margins, svgHeight, value })
      : null;

  if (yAxis && thisYScale && hasDocument) axes.getYAxis({ id, thisYScale });
  if (xAxis && thisXScale && hasDocument) axes.getXAxis({ id, thisXScale });

  return (
    <svg
      className='chart-svg'
      id={id}
      preserveAspectRatio={preserveAspectRatio}
      style={{
        display: 'block',
        position: 'relative',
      }}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        className='chart-svg-g'
        height={chartHeight}
        transform={`translate(${margins.left}, ${margins.top})`}
        width={chartWidth}
      >
        <g
          className={`${chartType.toLowerCase()}-visual-container`}
          transform={getVisualContainerTransform({chartHeight, chartType, chartWidth})}
        >
          {chartFunction({
            chartHeight,
            chartWidth,
            colorScale: thisColorScale,
            data,
            labels,
            value,
            xScale: thisXScale,
            yScale: thisYScale,
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
    </svg>
  );
};

SVG.propTypes = {
  chartType: React.PropTypes.string,
  colorScale: React.PropTypes.string,
  data: React.PropTypes.array,
  id: React.PropTypes.string,
  labels: React.PropTypes.array,
  margins: React.PropTypes.object,
  preserveAspectRatio: React.PropTypes.string,
  svgHeight: React.PropTypes.number,
  svgWidth: React.PropTypes.number,
  value: React.PropTypes.string,
  xAxis: React.PropTypes.bool,
  xScale: React.PropTypes.bool,
  yAxis: React.PropTypes.bool,
  yScale: React.PropTypes.bool,
};

export default SVG;
