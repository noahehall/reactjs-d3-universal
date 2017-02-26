import { pack } from './pack.js';
import { hierarchy } from './hierarchy.js';
import { nodesArray } from './nodesarray.js';
import { labelsArray } from './labelsarray';
import React from 'react';
import * as d3 from 'd3';

let view;

export const zoomTo = ({ chartWidth, v, g, gx, gy, cr, circle }) => {
  view = v;
  const
    k = chartWidth / v[2],
    x = (gx - v[0]) * k,
    y = (gy - v[1]) * k;

  //g.setAttribute("transform", `translate(${x}, ${y}) scale(2 1.5) translate(${-x}, ${-y})`);
  circle.setAttribute("r",  cr * k);
}

export const zoom = ({
  chartWidth,
  margins,
  g,
  gx,
  gy,
  cr,
  circle,
}) => {

  return d3.transition()
    .duration(750)
    .tween("zoom", (d) => {
      const i = d3.interpolateZoom(view, [ gx, gy, cr * 2 + (margins.left + margins.right) ]);

      return (t) => zoomTo({ chartWidth, v: i(t), g, gx, gy, cr, circle });
    });
}

export default function Pack ({
  chartWidth,
  chartHeight,
  colorScale,
  data,
  id,
  labels,
  margins,
}) {
  const handleZoom = (e) => {
    e.stopPropagation();
    let cr;

    const transform = e.currentTarget.getAttribute('transform').split('(')[1].split(',').map((e) => parseFloat(e));
    const circle = e.currentTarget.firstChild;
    if (circle.nodeName === 'circle') cr = circle.getAttribute('r');

    return cr
      ? zoom({
          chartWidth,
          g: e.currentTarget,
          margins,
          gx: transform[0],
          gy: transform[1],
          cr,
          circle,
        })
      : null;
  }

  const
    root = hierarchy({ data }),
    nodes = pack({ chartWidth })(root).descendants(),
    arrayOfLabels = labelsArray({ nodes, labels, root }),
    arrayOfNodes = nodesArray({
      nodes,
      colorScale,
      handleZoom,
      labels,
      root,
      chartWidth,
      chartHeight,
      id,
    });

  view = [root.x, root.y, root.r];

  return (
    <g>
      {arrayOfNodes}
    </g>
  );
}
