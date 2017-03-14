# CI
  - [![Build Status](https://api.travis-ci.org/noahehall/react-f-your-starterkit.svg?branch=master)

# Why are we here?
  - ReactJS + D3 = data viz happiness

# [See demo here](https://noahehall.github.io/reactjs-d3-universal/)

# Chart Types
  - Bar Chart
  - Pie Chart
  - Scatter Plot
  - Line Chart
  - Table
  - Force-Directed Graph
  - Pack Chart

# Coming Soon
  - classnames for everything
  - default CSS styling
  - Radial Stacked Bar
  - stacked bar (currently works with regular bar chart but can be improved)
  - histogram
  - combination chart
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
    data={data}
    filterable={true}
    id='paying-customers-table'
    sortable={true}
  />
```

## example bar
```
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
```

## example pie
```
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
```

## example line
```
  <Chart
    chartDataGroupBy='type'
    chartType='line'
    colorScaleScheme='schemeCategory10'
    colorScaleType='basic'
    data={data}
    datumLabels={['total']}
    id='paying-customers'
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
    margins={{
      bottom: 70,
      left: 70,
      right: 10,
      top: 10,
    }}
  />
```
## example force-directed graph
```
  <Chart
    chartDataGroupBy='id'
    chartType='forceDirectedGraph'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    data={data}
    id='force-graph'
    margins={{
      bottom: 60,
      left: 50,
      right: 50,
      top: 60,
    }}
  />
```
## example pack chart
```
  <Chart
    chartType='pack'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    // you must structure your data like this https://bl.ocks.org/mbostock/7607535
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
```
