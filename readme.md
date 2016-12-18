# CI
  - [![Build Status](https://api.travis-ci.org/noahehall/react-f-your-starterkit.svg?branch=master)

# Why are we here?
  - ReactJS + D3 = data viz happiness

# Status
  - definitely in alpha
  - [You can see a working version here](https://github.com/noahehall/udacity-corporate-dashboard)

# Coming Soon
  - Bar Chart
  - Line Chart
  - Radial Stacked Bar
  - Scatter Plot
  - any requests, open an issue ;)
  - more examples

# Requirements
  1. Universal/Isomophoric rendering
  2. React handles all DOM node creation
  3. D3 handles animation
  4. Responsive design
  5. accessible
  6. semantic
  7. configurable with sensible defaults

# Examples
## Pie Chart
```
  import { SVG } from './svg.js';
  import React from 'react';

  const exampleMarginObject = {
    bottom: 20,
    left: 60,
    right: 60,
    top: 20,
  };

  const exampleDataObject = [
    {
      gender: 'Male',
      lastName: 'Hall',
      total: 141.92,
    }, {
      gender: 'Female',
      lastName: 'Jenny',
      total: 149.79,
    }, {
      gender: 'Klingon',
      lastName: 'Warf',
      total: 134.23,
    },
  ];

  export const PieChart = () =>
    <section
      id='your-piechart-id'
      style={{
        display: 'block',
        height: {height-of-container}
        overflow: 'hidden',
        position: 'relative',
        verticalAlign: 'top',
        width: {width-of-container},
      }}
    >
      <SVG
        chartHeight={chartHeight}
        chartType='pie'
        chartWidth={chartWidth}
        data={exampleDataObject}
        labels={[ 'lastName', 'total' ]}
        margin={exampleMarginObject}
        svgHeight={chartHeight - (margin.top + margin.bottom)}
        svgWidth={chartWidth - (margin.left + margin.right)}
        value='total'
      />
    </section>;
```
