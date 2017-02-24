import React from 'react';
// import * as d3 from 'd3';

export const nodesArray = ({ colorScale, nodes }) => {
  const nodeArray = [];
  nodes.forEach((d) =>
    nodeArray.push(
      // TODO: add click handler to each circle for zoom
      <circle
        className={d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root' }
        fill={d.children ? colorScale(d.depth) : null}
      />
    )
  );

  return nodeArray;
};
