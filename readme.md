# CI
  - [![Build Status](https://api.travis-ci.org/noahehall/react-f-your-starterkit.svg?branch=master)

# Why are we here?
  - ReactJS + D3 = data viz happiness

# Chart Types
  - Bar Chart
  - Pie Chart
  - Scatter Plot
  - Line Chart
  - Table
  - Force-Directed Graph

# Coming Soon
  - classnames for everything
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
  - animations

# Requirements
  1. Universal/Isomophoric rendering
  2. React handles all node creation (sans axis)
  3. Responsive design
  4. accessible
  5. semantic
  6. configurable with sensible defaults

# Examples
```
  import Chart from 'reactjs-d3-universal';
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
```
## example table
```
  <Chart
    chartType='table'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    data={data}
    filterable={true}
    id='table1'
    margins={margins}
    sortable={true}
  />
```

## example bar
```
  <Chart
    // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
    chartType='bar'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    data={data}
    datumLabels={['location']}
    id='employees-at-each-location'
    margins={margins}
  />
```

## example pie
```
  <Chart
    // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
    chartType='pie'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    data={data}
    datumLabels={[ 'status', 'total' ]}
    id='open-issues'
    margins={margins}
  />
```

## example line
```
  <Chart
    chartDataGroupBy='type'
    chartType='line'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    data={data}
    datumLabels={['total']}
    id='paying-customers'
    margins={margins}
    xAxis={true}
    xAxisLabel='Date'
    xScale={true}
    xScaleTime={true}
    xScaleTimeFormat='%Y/%m/%d'
    xValue='date'
    yAxis={true}
    yAxisLabel='Total Paying Customers'
    yScale={true}
    yValue='totalPayingCustomers'
  />
```
## example force-directed graph
```
  <Chart
    chartDataGroupBy='id'
    chartType='forceDirectedGraph'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    // you must structure your data like this https://bl.ocks.org/mbostock/4062045
    data={data}
    id='graph'
    margins={{
      bottom: 10,
      left: 10,
      right: 10,
      top: 10,
    }}
  />
```
