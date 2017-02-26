import { pack } from './pack.js';
import { hierarchy } from './hierarchy.js';
import { nodesArray } from './nodesarray.js';
import { labelsArray } from './labelsarray';
import React from 'react';
import * as d3 from 'd3';

export default function Pack ({
  chartWidth,
  chartHeight,
  colorScale,
  data,
  id,
  labels,
  margins,
}) {
  const
    root = hierarchy({ data }),
    nodes = pack({ chartWidth })(root).descendants(),
    arrayOfLabels = labelsArray({ nodes, labels, root }),
    arrayOfNodes = nodesArray({
      nodes,
      colorScale,
      labels,
      root,
      chartWidth,
      chartHeight,
      id,
    });

  return (
    <g>
      {arrayOfNodes}
    </g>
  );
}
