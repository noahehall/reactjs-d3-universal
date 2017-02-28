import React from 'react';
import PackG from './packg.js';


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
};
