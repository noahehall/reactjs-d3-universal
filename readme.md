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
  import Chart from './charts';
  import React from 'react';

  const margins = {
    bottom: 20,
    left: 60,
    right: 60,
    top: 20,
  };

  const data = [
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

  // create a bar chart
  <Chart
    chart={data}
    chartType='scatterplot' // bar, pie, scatterplot
    colorScaleScheme='schemeAccent'
    colorScaleType='categorical'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    id='scatterplot-chart' // must be unique
    labels={[ 'gender', 'age' ]}
    margins={margins}
    preserveAspectRatio='xMinYMin meet'
    r={3.5} // only required for scatterplot
    xAxis={true}
    xScale={true}
    xValue='hoursWorkedPerWeek'
    yAxis={true}
    yScale={true}
    yValue='salary'
  />
```
