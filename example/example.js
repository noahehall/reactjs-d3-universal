import React from 'react';
import Chart from '../dist/index.js';
//import packData from './fakedata/packtwitter.json';
import timelineData from './fakedata/rawtwitter.json';

export default class Table extends React.Component {
  static get defaultProps () {
    return {
      id: 'fake-chart',
    };
  }

  /* pack
  render () {
    return (
      <section style={{ maxWidth: '1000px' }}>
        <Chart
          chartType='pack'
          colorScaleScheme='schemeCategory20'
          colorScaleType='basic'
          data={packData}
          datumLabels={['name']}
          figureObject={true}
          figureObjectType='table'
          id='pack'
          margins={{
            bottom: 10,
            left: 80,
            right: 50,
            top: 10,
          }}
        />
      </section>
    );
  }
  //*/

  //* timeline
   // y = sum aggregate sentiment for day
   // x = dates
   // groupBy = username ? possibly best option
    // could do: token
  render () {
    return (
      <Chart
        chartDataGroupBy='type'
        chartType='line'
        colorScaleScheme='schemeCategory10'
        colorScaleType='basic'
        data={timelineData}
        datumLabels={['total']}
        id='fake-chart'
        margins={{
          bottom: 70,
          left: 70,
          right: 10,
          top: 10,
        }}
        xAxis={true}
        xAxisLabel='Date'
        xScale={true}
        xScaleTime={true}
        xScaleTimeFormat='%Y/%m/%d'
        xValue='date'
        yAxis={true}
        yAxisLabel='Total Paying Customers'
        yScale={true}
        yValue='totalPayingCustomers'
      />
    );
  }
  //*/

}
