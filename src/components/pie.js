import Chart from 'reactjs-d3-universal';
import React, { PropTypes } from 'react';
import s from '../styles/exampleComponent.style';

const data = [
  {
    "status": "open",
    "total": 40
  },
  {
    "status": "in progress",
    "total": 10
  },
  {
    "status": "QA",
    "total": 30
  }
];

const propTypes = {
  children: PropTypes.element,
};

function Bar({ children }) {
  return (
    <div style={{ maxWidth: '600px' }}>
      <Chart
        chartType='pie'
        colorScaleScheme='schemeCategory20'
        colorScaleType='basic'
        data={data}
        datumLabels={['status', 'total']}
        id='open-issues'
        margins={{
          bottom: 40,
          left: 80,
          right: 80,
          top: 40,
        }}
        xAxis={true}
        xAxisLabel='ISSUES BY TYPE'
        yValue='total'
      />
      {children || null}
    </div>
  );
}

Bar.propTypes = propTypes;

export default Bar;
