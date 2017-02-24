import { pack } from './pack.js';
import { hierarchy } from './hierarchy.js';
import { nodesArray } from './nodesarray.js';
import { labelsArray } from './labelsarray';
import React from 'react';

export default function Pack ({
  chartWidth,
  colorScale,
  data,
  labels
}) {
  const
    root = hierarchy({ data }),
    //focus = root,
    nodes = pack({ chartWidth })(root).descendants(),
    arrayOfNodes = nodesArray({ nodes, colorScale }),
    arrayOfLabels = labelsArray({ nodes, labels, root })

  return (
    <g>
      {arrayOfNodes}{arrayOfLabels}
    </g>
  );
}
