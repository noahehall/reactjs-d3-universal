import Chart from 'reactjs-d3-universal';
import React, { PropTypes } from 'react';
import s from '../styles/exampleComponent.style';

const data = [{
  "totalEmployees": 151,
  "location": "Florida"
}, {
  "totalEmployees": 241,
  "location": "Pennsylvania"
}, {
  "totalEmployees": 472,
  "location": "Indiana"
}, {
  "totalEmployees": 280,
  "location": "New York"
}, {
  "totalEmployees": 270,
  "location": "Georgia"
}, {
  "totalEmployees": 343,
  "location": "Florida"
}, {
  "totalEmployees": 96,
  "location": "Wisconsin"
}, {
  "totalEmployees": 82,
  "location": "Virginia"
}, {
  "totalEmployees": 416,
  "location": "Georgia"
}, {
  "totalEmployees": 315,
  "location": "New York"
}, {
  "totalEmployees": 485,
  "location": "Arizona"
}, {
  "totalEmployees": 459,
  "location": "Texas"
}, {
  "totalEmployees": 145,
  "location": "District of Columbia"
}, {
  "totalEmployees": 129,
  "location": "Florida"
}, {
  "totalEmployees": 485,
  "location": "Florida"
}, {
  "totalEmployees": 336,
  "location": "New York"
}, {
  "totalEmployees": 289,
  "location": "Oklahoma"
}, {
  "totalEmployees": 142,
  "location": "Missouri"
}, {
  "totalEmployees": 354,
  "location": "California"
}, {
  "totalEmployees": 489,
  "location": "Virginia"
}, {
  "totalEmployees": 448,
  "location": "Georgia"
}];

const propTypes = {
  children: PropTypes.element,
};

function Bar({ children }) {
  return (
    <div style={{ maxWidth: '600px' }}>
        <Chart
          chartType='bar'
          colorScaleScheme='schemeCategory20'
          colorScaleType='basic'
          data={data}
          datumLabels={['totalEmployees']}
          xAxis={true}
          xAxisLabel='company locations'
          xScale={true}
          xValue='location'
          yAxis={true}
          yAxisLabel='total employees'
          yValue='totalEmployees'
          yScale={true}
          id='employees-at-each-location'
          margins={{
            bottom: 60,
            left: 50,
            right: 10,
            top: 10,
          }}
        />
      {children || null}
    </div>
  );
}

Bar.propTypes = propTypes;

export default Bar;
