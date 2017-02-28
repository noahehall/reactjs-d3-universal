import React from 'react';
import Chart from '../dist/index.js';
import data from './fakedata/pack.json';

export default class Table extends React.Component {
  static get defaultProps () {
    return {
      id: 'fake-table',
    };
  }

  render () {
    return (
      <Chart
        chartType='pack'
        colorScaleScheme='schemeCategory20'
        colorScaleType='basic'
        data={data}
        datumLabels={['name']}
        id='pack'
        margins={{
          bottom: 10,
          left: 10,
          right: 10,
          top: 10,
        }}
      />
    );
  }
}
