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

  render () {
    //* timeline
    // y = sum aggregate sentiment for day
    // x = dates
    // groupBy = username ? possibly best option
    // could do: token
    const formattedData = timelineData.map((tweet) => ({
      ...tweet,
      // date: new Date(tweet.date).toLocaleDateString(),
      score: JSON.parse(tweet.afinn).score
    }));

    // console.dir(formattedData);

    return (
      <Chart
        chartDataGroupBy='score'
        chartType='line'
        colorScaleScheme='schemeCategory10'
        colorScaleType='basic'
        data={formattedData}
        datumLabels={['score']}
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
        xScaleTimeFormat='%m/%d/%Y'
        xValue='date'
        yAxis={true}
        yAxisLabel='Sentiment Score'
        yScale={true}
        yValue='score'
      />
    );
  }
  //*/

}
