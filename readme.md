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
## Pie Chart
```
  <Chart
    chart={data}
    chartDataGroupBy='gender'
    chartType='line|scatterplot|bar|pie|table'
    colorScaleScheme='schemeAccent'
    colorScaleType='categorical'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    datumLabels={[ 'gender' ]}
    filterable={false} // currently only for table
    id='line-chart'
    margins={margins}
    preserveAspectRatio='xMinYMin meet'
    r={3.5}
    sortable={false} // currently only for table
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
## example table
```
  <Chart
    data={data}
    chartDataGroupBy=''
    chartType='table'
    colorScaleScheme=''
    colorScaleType=''
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    datumLabels={[]}
    filterable={true}
    id='table'
    margins={margins}
    preserveAspectRatio=''
    r=''
    sortable={true}
    xAxis={false}
    xAxisLabel=''
    xScale={false}
    xScaleTime={false}
    xScaleTimeFormat=''
    xValue=''
    yAxis={false}
    yAxisLabel=''
    yScale={false}
    yValue=''
  />
```

## example bar
```
  <Chart
    // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
    data={data}
    chartDataGroupBy=''
    chartType='bar'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    datumLabels={['location']}
    id='employees-at-each-location'
    margins={tmargins}
    preserveAspectRatio='xMinYMin meet'
    r={3.5}
    xAxis={true}
    xAxisLabel='Employees at Each Location'
    xScale={true}
    xScaleTime={false}
    xScaleTimeFormat='' // eslintlignore must match the format of your dates
    xValue='location'
    yAxis={true}
    yAxisLabel='Total Employees'
    yScale={true}
    yValue='totalEmployees'
  />
```

## example pie
```
  <Chart
    // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
    data={data}
    chartDataGroupBy='' // eslintignore only used if xScaleTime = true
    chartType='pie'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    datumLabels={[ 'status', 'total' ]}
    id='open-issues'
    margins={margins}
    preserveAspectRatio='xMinYMin meet'
    r=''
    xAxis={false}
    xAxisLabel=''
    xScale={false}
    xScaleTime={false}
    xScaleTimeFormat='' // eslintlignore must match the format of your dates
    xValue=''
    yAxis={false}
    yAxisLabel=''
    yScale={true}
    yValue='total'
  />
```

## example line
```
  <Chart
    data={data}
    chartDataGroupBy='type'
    chartType='line'
    colorScaleScheme='schemeCategory20'
    colorScaleType='basic'
    containerHeight={containerHeight}
    containerWidth={containerWidth}
    datumLabels={['total']}
    id='paying-customers'
    margins={margins}
    preserveAspectRatio='xMinYMin meet'
    r=''
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
    datumLabels={[]}
    filterable={true}
    id='graph'
    margins={{
      bottom: 10,
      left: 10,
      right: 10,
      top: 10,
    }}
    preserveAspectRatio=''
    r=''
    sortable={false}
    xAxis={false}
    xAxisLabel=''
    xScale={false}
    xScaleTime={false}
    xScaleTimeFormat=''
    xValue=''
    yAxis={false}
    yAxisLabel=''
    yScale={false}
    yValue=''
  />
```
