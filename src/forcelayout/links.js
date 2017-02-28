import React from 'react';

export const linkGs = ({
  links
}) => {
  if (links.length < 1) return [];

  const linkGArray = [];
  links.map((link, index) => link.source.x !== undefined && link.source.y !== undefined && link.target.x !== undefined && link.target.y !== undefined
    && linkGArray.push(
      <g key={index}>
        <line
          style={{
            "stroke":"#999",
            "strokeOpacity":".6",
            "strokeWidth": Math.sqrt(link.value)
          }}
          x1={link.source.x}
          x2={link.target.x}
          y1={link.source.y}
          y2={link.target.y}
        />
      </g>
    )
  );

  return linkGArray;
};
