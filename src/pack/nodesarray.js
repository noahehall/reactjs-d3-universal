/* eslint-disable */
import React from 'react';
import PackG from './packg.js';

export const getDimensionOffsets = (node, x = 0, y = 0) => {
  x += node.x;
  y += node.y;

  return Boolean(node.parent.parent)
    ? getDimensionOffsets(node.parent, x, y)
    : [x,y, node];
}
export const createNest = (parent, chartHeight, chartWidth, colorScale, idx, labels, id, rootx, rooty) => {

  switch (parent.depth) {
    case 0: break;
    case 1: {
      parent.x -= rootx;
      parent.y -= rooty;
      break;
    }
    default: {
      const [x, y] = getDimensionOffsets(parent.parent);
      parent.x -= (rootx + x);
      parent.y -= (rooty + y);
    }
  }
  return <PackG
    chartHeight={chartHeight}
    chartWidth={chartWidth}
    colorScale={colorScale}
    d={parent}
    id={id}
    idx={idx}
    key={idx}
    labels={labels}
  > {parent.children && parent.children.map((child, idx2) => createNest(child, chartHeight, chartWidth, colorScale, idx2, labels, id, rootx, rooty))}
  </PackG>;

}
/**
  * nodesArray - Description
  *
  * @param {number} [chartHeight=200] height of SVG
  * @param {number} [chartWidth=200]  width of SVG
  * @param {type}   [colorScale=empty function] function returning color
  * @param {string} [id=] id of this chart
  * @param {array}  [labels=[]] array of labels for each datum
  * @param {array}  [nodes=[]] array of nodes containing data for each circle and text
  *
  * @return {type} Description
  */
export const nodesArray = ({
  chartHeight = 200,
  chartWidth = 200,
  colorScale = () => null,
  id = '',
  labels = [],
  nodes = [],
}) => {
  const nodeArray = [];
  if (nodes.length < 1) return null;
  return createNest(nodes[0], chartHeight, chartWidth, colorScale, 1, labels, id, nodes[0].children[0].parent.x, nodes[0].children[0].parent.y)

/* if you want the normal d3 nesting scheme (no nesting)
  nodes.forEach((d, idx) =>
    nodeArray.push(
      <PackG
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        colorScale={colorScale}
        d={d}
        id={id}
        idx={idx}
        key={idx}
        labels={labels}
      />
    )
  );
  return nodeArray;
//*/
};
