import React from 'react';

// TODO: likely move this entire thing to lib dir
export const labelsArray = ({
  nodes,
  labels,
  root,
}) => {
  const labelArray = [];
  nodes.forEach((d) =>
    labelArray.push(
      <text
        x={d.x}
        y={d.y}
        textAnchor='middle'
        className='label'
        style={{
          display: d.parent === root ? 'inline' : 'none',
          fillOpacity: d.parent === root ? 1 : 0,
        }}
      >
        {d.data[labels[0]]}
      </text>
    )
  );

  return labelArray;
};
