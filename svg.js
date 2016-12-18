import { PieSlices } from './piechart/slices.js';
import React from 'react';

export const SVG = ({
  chartHeight,
  chartType,
  chartWidth,
  data,
  labels,
  margin,
  preserveAspectRatio = 'xMinYMin meet',
  svgHeight,
  svgWidth,
  value,
}) => {
  let ChartType;
  switch (chartType.toLowerCase()) {
    case 'pie':
      ChartType = PieSlices;
      break;
    default : return <span />;
  }

  return (
    <svg
        className='chart-svg'
      preserveAspectRatio={preserveAspectRatio}
      style={{
        display: 'block',
        position: 'relative',
      }}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        className='chart-g'
        height={chartWidth}
        transform={`translate(${[ margin.left, margin.top ]})`}
        width={chartWidth}
      >
        <g
          className='piechart-slices-container'
          transform={`translate(${[ chartWidth/2, chartHeight/2 ]})`}
        >
          {ChartType({
            chartHeight,
            chartWidth,
            data,
            labels,
            value,
          })}
        </g>
      </g>
    </svg>
  );
};

SVG.propTypes = {
  chartHeight: React.PropTypes.number,
  chartType: React.PropTypes.string,
  chartWidth: React.PropTypes.number,
  data: React.PropTypes.array,
  labels: React.PropTypes.array,
  margin: React.PropTypes.object,
  preserveAspectRatio: React.PropTypes.string,
  svgHeight: React.PropTypes.number,
  svgWidth: React.PropTypes.number,
  value: React.PropTypes.string,
};
