import { hierarchy } from './hierarchy.js';
import { labelsArray } from './labelsarray';
import { nodesArray } from './nodesarray.js';
import { pack } from './pack.js';
import * as d3 from 'd3';
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
    nodes = pack({ chartWidth })(root).descendants(),
    arrayOfLabels = labelsArray({ nodes, labels, root }),
    arrayOfNodes = nodesArray({
      chartHeight,
      chartWidth,
      colorScale,
      id,
      labels,
      nodes,
      root,
    });

  return (
    <g>
      {arrayOfNodes}
    </g>
  );
}
