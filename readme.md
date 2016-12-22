# CI
  - [![Build Status](https://api.travis-ci.org/noahehall/react-f-your-starterkit.svg?branch=master)

# Why are we here?
  - ReactJS + D3 = data viz happiness

# Status
  - definitely in alpha
  - [You can see a working version here](https://github.com/noahehall/udacity-corporate-dashboard)

# Chart Types
  - Bar Chart
  - Pie Chart
  - Scatter Plot

# Coming Soon
  - Line Chart
  - Radial Stacked Bar
  - histogram
  - combination chart
  - bubble chart
  - tooltips
  - legends
  - updated logic for color scales
  - animations

# Requirements
  1. Universal/Isomophoric rendering
  2. React handles all DOM node creation
    - except Axis creation
  3. D3 handles animation
    - animation coming soon
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

  // create a chart
  <Chart
    chart={data}
    chartType='scatterplot|bar|pie'
    colorScaleScheme='schemeAccent'
    colorScaleType='categorical'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    id='scatterplot-chart'
    labels={[ 'gender', 'age' ]}
    margins={margins}
    preserveAspectRatio='xMinYMin meet'
    r={3.5}
    xAxis={true}
    xAxisLabel='hours per week'
    xScale={true}
    xValue='hoursWorkedPerWeek'
    yAxis={true}
    yAxisLabel='salary'
    yScale={true}
    yValue='salary'
  />
```
