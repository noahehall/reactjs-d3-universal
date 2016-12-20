import { Path } from '../svg/path.js';
import * as arcs from '../lib/arcs.js';
import * as d3 from 'd3';
import * as label from '../lib/labels.js';
import React from 'react';

export const PieSlices = ({
  chartHeight,
  chartWidth,
  data,
  fontSize = '10px',
  textAnchor = 'middle',
  labels,
  value = 'total',
}) => {
  const arcData = arcs.generateArcs({
    data,
    sort: null,
    value,
  });

  const arcArray = [];

  arcData.forEach((arc, idx) => {
    const thisArc = arcs.generateArcPath({
      chartHeight,
      chartWidth,
      endAngle: arc.endAngle,
      startAngle: arc.startAngle,
    });

    arcArray.push(
      <g
        className='pie-slice'
        key={idx}
      >
        <Path
          d={thisArc()}
          fill={d3.interpolateCool(Math.random())}
          id={`arc-${idx}`}
        />
        {
          label.getLabels({
            arc,
            chartHeight,
            chartType: 'pie',
            chartWidth,
            fontSize,
            idx,
            labels,
            textAnchor,
          })
        }
      </g>
    );
  });

  return arcArray;
};
