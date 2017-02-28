import React from 'react';

export const nodeGs = ({
  chartDataGroupBy = '',
  colorScale = () => null,
  nodes = [],
}) => {
  if (nodes.length < 1) return [];

  const nodeGArray = [];

  nodes.forEach((node) => node.x !== undefined && node.y !== undefined
    && nodeGArray.push(
      <g key={node[chartDataGroupBy]}>
        <circle
          cx={node.x}
          cy={node.y}
          r={node.r || 5}
          style={{
            "fill": colorScale(node.group),
            "stroke":"#fff",
            "strokeWidth":"1.5px"
          }}
        />
        <text x={node.x} y={node.y}>
          {node[chartDataGroupBy]}
        </text>
      </g>
    )
  );

  return nodeGArray;
};
