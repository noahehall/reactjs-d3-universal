import React from 'react';
import Chart from '../dist/index.js';
import force from './fakedata/forcedlayout.json';

export default class Table extends React.Component {
  static get defaultProps () {
    return {
      id: 'fake-table',
    };
  }

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <Chart
        chart={{ data: force }}
        chartDataGroupBy='id'
        chartType='forceDirectedGraph'
        colorScaleScheme='schemeCategory20'
        colorScaleType='basic'
        datumLabels={[]}
        filterable={true}
        id='graph'
        margins={{
          bottom: 50,
          left: 50,
          right: 50,
          top: 50,
        }}
        preserveAspectRatio=''
        r=''
        sortable={false}
        xAxis={false}
        xAxisLabel=''
        xScale={false}
        xScaleTime={false}
        xScaleTimeFormat=''
        xValue=''
        yAxis={false}
        yAxisLabel=''
        yScale={false}
        yValue=''
      />
    );
  }
}
