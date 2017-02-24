import React from 'react';
// import * as d3 from 'd3';

export const nodesArray = ({ colorScale, nodes }) => {
  const nodeArray = [];
  nodes.forEach((d, idx) =>
    nodeArray.push(
      // TODO: add click handler to each circle for zoom
      <circle
        key={idx}
        r={d.r}
        cx={d.x}
        cy={d.y}
        className={d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root' }
        style={{
          fill: d.children ? colorScale(d.depth) : 'white',
          "stroke":"#fff",
          "strokeWidth":"1.5px",
        }}
      />
    )
  );

  return nodeArray;
};
