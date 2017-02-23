import { linkGs } from './links.js';
import { nodeGs } from './nodes.js';
import { getSimulation } from './simulation.js';
import React from 'react';
// https://bl.ocks.org/mbostock/4062045

export default function ForceLayout ({
  chartDataGroupBy,
  chartHeight,
  chartWidth,
  colorScale,
  data,
}) {
  const thisSim = getSimulation({
    chartDataGroupBy,
    chartHeight,
    chartWidth,
  });

  const nodes = nodeGs({
    chartDataGroupBy,
    colorScale,
    nodes: data.nodes,
  });

  const links = linkGs({
    links: data.links
  });

  thisSim.nodes(data.nodes);
  thisSim.force('link').links(data.links);
  thisSim.restart();

  return (
    <g>
      {links}{nodes}
    </g>
  );
}
