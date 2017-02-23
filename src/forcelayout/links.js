import React from 'react';

export const linkGs = ({
  links
}) => {
  const linkGArray = [];
  links.map((link, index) => link.source.x !== undefined && link.source.y !== undefined && link.target.x !== undefined && link.target.y !== undefined
    && linkGArray.push(
      <g key={index}>
        <line
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          style={{
            "stroke":"#999",
            "strokeOpacity":".6",
            "strokeWidth": Math.sqrt(link.value)
          }}
        />
      </g>
    )
  );

  return linkGArray;
}
