import { pack } from './pack.js';
import { hierarchy } from './hierarchy.js';
import { nodesArray } from './nodesarray.js';
import { labelsArray } from './labelsarray';
import React from 'react';
import * as d3 from 'd3';



export const zoomTo = ({ v, view, chartWidth }) => {
    return false;
    var k = chartWidth / v[2]; view = v;
    node.attr("transform", (d) => { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", (d)  => { return d.r * k; });
  }

export default function Pack ({
  chartWidth,
  colorScale,
  data,
  labels,
  margins,
}) {
  const zoom = (e) => {
    e.stopPropagation();

    // transition between a and b
    const transition = d3.transition()
      .duration(750)
        .tween("zoom", (d) => {
          // view = a, focus = b
          const i = d3.interpolateZoom(
            view,
            [ focus.x, focus.y, focus.r * 2 + (margins.left + margins.right) ]
          );

          //
          return (v) => zoomTo(i(1));
        });
  }

  const
    root = hierarchy({ data }),
    nodes = pack({ chartWidth })(root).descendants(),
    arrayOfLabels = labelsArray({ nodes, labels, root }),
    arrayOfNodes = nodesArray({
      nodes,
      colorScale,
      zoom,
      labels,
      root,
    });

  return (
    <g>
      {arrayOfNodes}
    </g>
  );
}
