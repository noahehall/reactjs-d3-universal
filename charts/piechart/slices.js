import { Path } from '../svg/path.js';
import * as arcs from '../lib/arcs.js';
import * as label from '../lib/labels.js';
import * as scales from '../lib/scales.js';
import React from 'react';

export const PieSlices = ({
  chartHeight,
  chartWidth,
  data,
  fontSize = '10px',
  textAnchor = 'middle',
  labels,
  yValue = 'total',
}) => {
  const arcData = arcs.generateArcs({
    data,
    sort: null,
    yValue,
  });

  const arcArray = [];

  arcData.forEach((arc, idx) => {
    const thisArc = arcs.generateArcPath({
      chartHeight,
      chartWidth,
      endAngle: arc.endAngle,
      startAngle: arc.startAngle,
    });

    const labelText = label.getLabelText({ chartType: 'simple', d: arc.data, labels });

    arcArray.push(
      <g
        className='pie-slice'
        key={`${labelText.replace(/\s+/g, '-').toLowerCase()}${idx}`}
      >
        <Path
          d={thisArc()}
          fill={scales.colorScale({ colorScaleType: 'random' })}
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
