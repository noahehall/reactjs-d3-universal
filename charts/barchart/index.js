import { SVG } from '../svg';
import React from 'react';

export const BarChart = ({
  chart = { data: {}, margins: {}},
  chartType = '',
  containerHeight = 200,
  containerWidth = 200,
  id = 'barchart',
  margins = {
    bottom: 20,
    left: 60,
    right: 60,
    top: 20,
  },
}) =>
  <SVG
    chartType={chartType}
    colorScale='schemeAccent'
    data={chart.data}
    id={id}
    labels={[ 'lastName', 'total' ]}
    margins={appFuncs._.isEmpty(chart.margins) ? margins : chart.margins}
    svgHeight={containerHeight}
    svgWidth={containerWidth}
    value='total'
    xAxis={true}
    xScale={true}
    yAxis={true}
    yScale={true}
  />;

BarChart.propTypes = {
  chart: React.PropTypes.object,
  chartType: React.PropTypes.string,
  containerHeight: React.PropTypes.number,
  containerWidth: React.PropTypes.number,
  id: React.PropTypes.string,
  margins: React.PropTypes.object,
};

export default BarChart;
