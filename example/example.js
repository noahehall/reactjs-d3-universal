import React from 'react';
import Chart from '../dist/index.js';
//import packData from './fakedata/packtwitter.json';
import timelineData from './fakedata/rawtwitter.json';
//import formattedData from './fakedata/payingcustomers.json';
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
    const formattedData = timelineData.map((tweet) => {
      const afinn = JSON.parse(tweet.afinn);
      afinn.score =
        afinn.score > 5 ? 5
          : afinn.score < -5 ? -5
            : afinn.score;

      // date to start of month
      // new Date(new Date(tweet.date).setDate(1)).toLocaleDateString()
      return {
        ...tweet,
        afinn,
        date: new Date(tweet.date).toLocaleDateString(),
        score: afinn.score,
        total: 1,
      };
    });

    return (
      <Chart
        chartDataGroupBy='score'
        chartDataSumGroupBy={true}
        chartType='line'
        colorScaleScheme={{
          '-1': 'red',
          '-2': 'Tomato',
          '-3': 'OrangeRed',
          '-4': 'Crimson',
          '-5': 'DarkRed',
          '0': 'black',
          '1': 'DarkSeaGreen',
          '2': 'GreenYellow',
          '3': 'LawnGreen',
          '4': 'Lime',
          '5': 'ForestGreen',
        }}
        colorScaleType='custom'
        data={formattedData}
        datumLabels={['score']}
        id='fake-chart'
        lineCurve='curveNatural'
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
        xScaleTimeFormat='%b %Y'
        xValue='date'
        yAxis={true}
        yAxisLabel='Total Tweets by Sentiment Score'
        yScale={true}
        yValue='total'
      />
    );
  }
  //*/

}
