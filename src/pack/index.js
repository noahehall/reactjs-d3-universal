/* eslint-disable */
import { hierarchy } from './hierarchy.js';
import { nodesArray } from './nodesarray.js';
import { pack } from './pack.js';
import React from 'react';

export default function Pack ({
  chartHeight,
  chartWidth,
  colorScale,
  data,
  id,
  labels,
  margins,
}) {
  return (
    <g>
      {nodesArray({
        chartHeight,
        chartWidth,
        colorScale,
        id,
        labels,
        nodes: pack({ chartWidth, chartHeight })(hierarchy({ data })).descendants(),
      })}
    </g>
  );
}
