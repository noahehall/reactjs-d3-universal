import React from 'react';

export const linkGs = ({
  links
}) => {
return  links.map((link, index) =>
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
}
