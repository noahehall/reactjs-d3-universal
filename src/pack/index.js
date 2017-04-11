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
  foreignObject,
  foreignObjectType,
  id,
  labels,
  margins,
}) {
  return (
    <g className='nodes-array-container'>
      {nodesArray({
        chartHeight,
        chartWidth,
        colorScale,
        id,
        foreignObject,
        foreignObjectType,
        labels,
        nodes: pack({ chartWidth, chartHeight })(hierarchy({ data })).descendants(),
      })}
    </g>
  );
}
