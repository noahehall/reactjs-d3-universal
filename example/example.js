import React from 'react';
import Chart from '../dist/index.js';
import data from './fakedata/packtwitter.json';

export default class Table extends React.Component {
  static get defaultProps () {
    return {
      id: 'fake-table',
    };
  }

  render () {
    return (
      <section style={{ maxWidth: '600px' }}>
        <Chart
          chartType='pack'
          colorScaleScheme='schemeCategory20'
          colorScaleType='basic'
          data={data}
          datumLabels={['name']}
          figureObject={true}
          figureObjectType='table'
          id='pack'
          margins={{
            bottom: 10,
            left: 10,
            right: 10,
            top: 10,
          }}
        />
      </section>
    );
  }
}
