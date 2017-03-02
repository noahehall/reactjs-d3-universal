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
  const
    root = hierarchy({ data }),
    arrayOfNodes = nodesArray({
      chartHeight,
      chartWidth,
      colorScale,
      id,
      labels,
      nodes: pack({ chartWidth, chartHeight })(root).descendants(),
    });

  return (
    <g>
      {arrayOfNodes}
    </g>
  );
}
