import React from 'react';

export const nodeGs = ({
  nodes,
  colorScale,
}) => {
  return nodes.map((node) =>
    <g key={node.id}>
      <circle
        r={5}
        cx={node.x}
        cy={node.y}
        style={{
          "fill": colorScale(node.group),
          "stroke":"#fff",
          "strokeWidth":"1.5px"
        }}/>
      <text x={node.x} y={node.y}>
        {node.id}
      </text>
    </g>
  )
};

  /*
    on each circle suppose to call
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
    review how you did it in /lib/axes.js
  */
