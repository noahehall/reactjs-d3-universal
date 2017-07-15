import React from 'react';
import Chart from '../dist/index.js';
import m from 'moment';
//import packData from './fakedata/packtwitter.json';
//import timelineData from './fakedata/sites.js';
import formattedData from './fakedata/payingcustomers.json';
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
    /*
    const formattedData = timelineData.map((tweet) => {
      const afinn = JSON.parse(tweet.afinn);
      afinn.score =
        afinn.score > 0 ? 1
          : afinn.score < 0 ? -1
            : afinn.score;

      // date to start of month
      // new Date(new Date(tweet.date).setDate(1)).toLocaleDateString()
      return {
        ...tweet,
        afinn,
        date: new Date(tweet.date).getTime(),
        score: afinn.score,
        total: 1,
      };
    });
    */

    const newData = [];
    timelineData.forEach((site) => site.y.forEach((point, i) =>
      newData.push({
        site: site.site,
        date: site.x[i] // eslint-disable-line
          ? m(site.startdate).add(site.x[i], 'days').toDate().getTime()
          : m(site.startdate).subtract(site.x[i], 'days').toDate().getTime(),
        xlab: site.xlab,
        y: site.y[i],
      })
    ));

    return (
      <Chart
        chartDataGroupBy='y'
        chartDataSumGroupBy={true}
        chartType='line'
        colorScaleScheme='schemeCategory20'
        colorScaleType='random'
        data={newData}
        datumLabels={['xlab']}
        id='fake-chart'
        lineCurve='curveLinear'
        margins={{
          bottom: 70,
          left: 70,
          right: 10,
          top: 10,
        }}
        withDots={true}
        xAxis={true}
        xAxisLabel='Date'
        xScale={true}
        xScaleTime={true}
        xScaleTimeFormat='%I%M%p%a%d%y'
        xValue='date'
        yAxis={true}
        yAxisLabel='Number of Days'
        yScale={true}
        yValue='y'
      />
    );
  }
  //*/

}
