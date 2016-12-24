# CI
  - [![Build Status](https://api.travis-ci.org/noahehall/react-f-your-starterkit.svg?branch=master)

# Why are we here?
  - ReactJS + D3 = data viz happiness

# Status
  - definitely in alpha
  - [You can see a working version here](https://github.com/noahehall/udacity-corporate-dashboard)
  - there is a hard dependency on [App Functions](https://github.com/noahehall/react-f-your-starterkit/tree/master/src/.globals)

# Chart Types
  - Bar Chart
  - Pie Chart
  - Scatter Plot
  - Line Chart

# Coming Soon
  - default CSS styling
  - Radial Stacked Bar
  - stacked bar (currently works with regular bar chart but can be improved)
  - histogram
  - combination chart
  - bubble chart
  - tooltips (with filtering)
  - legends (with filtering)
  - filtering
  - interactivity
  - update logic for color scales
  - update logic for 'groupBy'
  - animations

# Requirements
  1. Universal/Isomophoric rendering
  2. React handles all node creation (sans axis)
  3. Responsive design
  4. accessible
  5. semantic
  6. configurable with sensible defaults

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

  // create a chart,
  <Chart
    chart={data}
    chartDataGroupBy='gender'
    chartType='line|scatterplot|bar|pie'
    colorScaleScheme='schemeAccent'
    colorScaleType='categorical'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    datumLabels={[ 'gender' ]}
    id='line-chart'
    margins={margins}
    preserveAspectRatio='xMinYMin meet'
    r={3.5}
    xAxis={true}
    xAxisLabel='Date'
    xScale={true}
    xScaleTime={true}
    xScaleTimeFormat='%Y/%m/%d'
    xValue='lastName'
    xValue='Rock Stars Win'
    yAxis={true}
    yAxisLabel='total'
    yScale={true}
    yValue='Black Friday at Walmart'
  />
```
