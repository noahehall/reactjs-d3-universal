import React from 'react';
import Chart from '../index.js';
import table from './fakedata/table.json';

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
        chart={{ data: table }}
        chartDataGroupBy=''
        chartType='table'
        colorScaleScheme=''
        colorScaleType=''
        datumLabels={[]}
        filterable={true}
        id='table'
        margins={{
          bottom: 10,
          left: 10,
          right: 10,
          top: 10,
        }}
        preserveAspectRatio=''
        r=''
        sortable={true}
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
