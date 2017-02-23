import React from 'react';

export const nodeGs = ({
  chartDataGroupBy,
  colorScale,
  nodes,
}) => {
  const nodeGArray = [];

  nodes.forEach((node) => node.x !== undefined && node.y !== undefined
    && nodeGArray.push(
      <g key={node[chartDataGroupBy]}>
        <circle
          r={node.r || 5}
          cx={node.x}
          cy={node.y}
          style={{
            "fill": colorScale(node.group),
            "stroke":"#fff",
            "strokeWidth":"1.5px"
          }}/>
        <text x={node.x} y={node.y}>
          {node[chartDataGroupBy]}
        </text>
      </g>
    )
  );

  return nodeGArray;
}

  /*
    on each circle suppose to call
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
    review how you did it in /lib/axes.js
  */
