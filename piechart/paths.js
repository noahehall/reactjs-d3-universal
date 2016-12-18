import React from 'react';
import * as d3 from 'd3';

// path generator
function generateArcPath ({
  chartHeight,
  chartWidth,
  cornerRadius = 1,
  endAngle,
  padAngle = 0.03,
  startAngle,
}) {
  return d3.arc()
    .cornerRadius(cornerRadius)
    .endAngle(endAngle)
    .innerRadius(Math.min(chartWidth, chartHeight)/8) // eslintignore bigger number = smaller donut
    .outerRadius(Math.min(chartWidth, chartHeight)/1.9) // eslintignore bigger number = smaller pie
    .padAngle(padAngle)
    .startAngle(startAngle);
}

export const PiePath = ({
  arc,
  chartHeight,
  chartWidth,
  idx,
}) => {
  const thisArc = generateArcPath({
    chartHeight,
    chartWidth,
    endAngle: arc.endAngle,
    startAngle: arc.startAngle,
  });

  return <path
    d={thisArc()}
    fill={d3.interpolateCool(Math.random())}
    id={`arc-${idx}`}
    stroke='gray'
  />;
};

PiePath.propTypes = {
  arc: React.PropTypes.object,
  chartHeight: React.PropTypes.number,
  chartWidth: React.PropTypes.number,
  idx: React.PropTypes.number,
};
