/* eslint-disable */
import React from 'react';
import PackG from './packg.js';

/**
 * calculates x and y offsets when creating nested HTML hierarchy
 */
export const getDimensionOffsets = (node, x = 0, y = 0) => {
  x += node.x;
  y += node.y;

  return Boolean(node.parent.parent)
    ? getDimensionOffsets(node.parent, x, y)
    : [x,y, node];
}

/**
 * retrieves foreign object if exists, else false
 */
export const getForeignObject = (parent) => {
  try {
    return parent.data.children[0].metadata;
  } catch (err) {
    return [];
  }
}

/**
 * creates nested HTML hierarchy from pack nodes
 */
let total = 0;
export const createNest = (parent, chartHeight, chartWidth, colorScale, idx, labels, id, rootx, rooty) => {
  let nozoom = false;
  switch (parent.depth) {
    case 0: {
      nozoom = true;
      break;
    }
    case 1: {
      nozoom = true;
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
    nozoom={nozoom}
    chartHeight={chartHeight}
    chartWidth={chartWidth}
    colorScale={colorScale}
    d={parent}
    id={id}
    idx={`${id}-${parent.depth}-${idx}-${++total}`}
    key={`${id}-${parent.depth}-${idx}-${++total}`}
    labels={labels}
    foreignObject={getForeignObject(parent)}
  >
    {parent.children && parent.children.map((child) =>
      createNest(child, chartHeight, chartWidth, colorScale, ++idx, labels, id, rootx, rooty))}
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
  foreignObject = false,
  foreignObjectType = '',
  id = '',
  labels = [],
  nodes = [],
}) => {
  if (nodes.length < 1) return null;
  return createNest(nodes[0], chartHeight, chartWidth, colorScale, 1, labels, id, nodes[0].children[0].parent.x, nodes[0].children[0].parent.y)

/* if you want the normal d3 nesting scheme (no nesting)
  // TODO: add 'nested' boolean property so users can switch between the two
  const nodeArray = [];
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
