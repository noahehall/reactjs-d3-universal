import { SVG } from '../svg';
import React from 'react';

export const PieChart = ({
  chart = { data: {}, margins: {}},
  chartType = '',
  containerHeight = 200,
  containerWidth = 200,
  id = 'piechart',
  margins = {
    bottom: 20,
    left: 60,
    right: 60,
    top: 20,
  },
}) =>
  <SVG
    chartType={chartType}
    colorScale=''
    data={chart.data}
    id={id}
    labels={[ 'lastName', 'total' ]}
    margins={margins}
    svgHeight={containerHeight}
    svgWidth={containerWidth}
    value='total'
    xAxis={false}
    xScale={false}
    yAxis={false}
    yScale={false}
  />;

PieChart.propTypes = {
  chartType: React.PropTypes.string,
  containerHeight: React.PropTypes.number,
  containerWidth: React.PropTypes.number,
  id: React.PropTypes.string,
  margins: React.PropTypes.object,
  chart: React.PropTypes.object, // eslint-disable-line
};

export default PieChart;
