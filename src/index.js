import { Bars } from './barchart/bars.js';
import { Lines } from './linechart/lines.js';
import { PieSlices } from './piechart/slices.js';
import { ScatterPlotDots } from './scatterplot/dots.js';
import { SVG } from './svg';
import * as axes from './lib/axes.js';
import * as dataFunctions from './lib/data.js';
import * as scales from './lib/scales.js';
import React from 'react';
import { Table } from './table';

export default class Chart extends React.Component {
  static get defaultProps () {
    return {
      chart: { data: {}, margins: {}},
      chartDataGroupBy: '', // eslintignore required for line chart
      // bar|scatterplot|pie|line
      // scatterplot: requires x and y values to be integers
      chartType: '',
      colorScaleScheme: '',
      colorScaleType: '',
      datumLabels: [],
      filterable: false,
      id: 'reactjs-d3-v4-universal',
      margins: { },
      preserveAspectRatio: 'xMinYMin meet',
      sortable: false,
      xAxis: false,
      xAxisLabel:'',
      xScale: false,
      xScaleTime: false, // eslintignore required for line chart
      xScaleTimeFormat: '', // eslintignore required for line chart https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
      // the data[propertyf] to use for the x-scale data point
      xValue: '',
      // if this chart requires a y-axis
      yAxis: false,
      // the value to use for y axis label, defaults to
      yAxisLabel: '',
      // if this chart requires a scale on the y dimension
      yScale: false,
      // the data[property] to use for the x-scale data point
      // eslintignore used for pie chart slice arc
      yValue: '',
    };
  }

  static propTypes = {
    chart: React.PropTypes.object,
    chartDataGroupBy: React.PropTypes.string,
    chartType: React.PropTypes.string,
    colorScaleScheme: React.PropTypes.string,
    colorScaleType: React.PropTypes.string,
    datumLabels: React.PropTypes.array,
    filterable: React.PropTypes.bool,
    id: React.PropTypes.string,
    margins: React.PropTypes.object,
    preserveAspectRatio: React.PropTypes.string,
    sortable: React.PropTypes.bool,
    xAxis: React.PropTypes.bool,
    xAxisLabel: React.PropTypes.string,
    xScale: React.PropTypes.bool,
    xScaleTime: React.PropTypes.bool,
    xScaleTimeFormat: React.PropTypes.string,
    xValue: React.PropTypes.string,
    yAxis: React.PropTypes.bool,
    yAxisLabel: React.PropTypes.string,
    yScale: React.PropTypes.bool,
    yValue: React.PropTypes.string,
  }

  constructor (props) {
    super(props);
    this.state = {
      containerHeight: 200,
      containerWidth: 200,
    };
  }

  componentDidMount () {
    // filter the table
    if (this.props.chartType === 'table') {
      appFuncs.filterTable.setFilterGrid('table');
      appFuncs.sortTable.init();
    }

    this.setSize();
    if (typeof window !== 'undefined') window.addEventListener(`resize`, this.setSize, false);
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !appFuncs._.isEqual(nextState, this.state)
      || !appFuncs._.isEqual(nextProps, this.props);
  }

  componentWillUnmount () {
    if (typeof window !== 'undefined') window.removeEventListener(`resize`, this.setSize);
  }

  setSize = () => {
    let containerHeight, containerWidth;

    try {
      containerHeight = this.container.offsetHeight;
    } catch (err) {
      containerHeight = this.state.containerHeight;
    }

    try {
      containerWidth = this.container.offsetWidth;
    } catch (err) {
      containerWidth = this.state.containerWidth;
    }

    this.setState({
      containerHeight,
      containerWidth,
    });

    return true;
  }

  getVisualContainerTransform = ({
    chartHeight,
    chartType,
    chartWidth,
  }) => {
    switch(chartType.toLowerCase()) {
      case 'pie': return `translate(${[ chartWidth/2, chartHeight/2 ]})`;
      default : return 'translate(0, 0)';
    }
  }

  render () {
    if (appFuncs._.isEmpty(this.props.chart.data)) {
      appFuncs.logError({
        data: this.props.chart,
        loc: __filename,
        msg: 'You need data to create a chart, return null',
      });

      return null;
    }

    let chartFunction;
    switch (this.props.chartType.toLowerCase()) {
      case 'pie':
        chartFunction = PieSlices;
        break;
      case 'bar':
        chartFunction = Bars;
        break;
      case 'scatterplot':
        chartFunction = ScatterPlotDots;
        break;
      case 'line':
        chartFunction = Lines;
        break;
      case 'table':
        chartFunction = Table;
        break;
      default : {
        appFuncs.logError({
          data: [ this.props.chartType, this.props.chart ],
          loc: __filename,
          msg: `did not find chart type ${this.props.chartType}, returning null`,
        });

        return null;
      }
    }

    const
      chartHeight = this.state.containerHeight - (this.props.margins.top + this.props.margins.bottom),

      chartWidth = this.state.containerWidth - (this.props.margins.left + this.props.margins.right),

      colorScale = this.props.colorScaleScheme
        ? scales.colorScale({
          chartDataGroupBy: this.props.chartDataGroupBy,
          colorScaleScheme: this.props.colorScaleScheme,
          colorScaleType: this.props.colorScaleType,
        })
        : null,

      data = dataFunctions.format({
        chartDataGroupBy: this.props.chartDataGroupBy,
        chartType: this.props.chartType,
        data: this.props.chart.data,
        xScaleTime: this.props.xScaleTime,
        xScaleTimeFormat: this.props.xScaleTimeFormat,
        xValue: this.props.xValue,
      }),

      hasDocument = typeof document !== 'undefined',

      thisXAxisLabel = this.props.xAxis
        ? axes.getXAxisLabel({
          chartDataGroupBy: this.props.chartDataGroupBy,
          transform: 'rotate(0)',
          x: this.state.containerWidth / 2 - this.props.margins.left,
          xAxisLabel: this.props.xAxisLabel || this.props.xValue,
          y: this.state.containerHeight,
        })
        : null,

      thisXScale = this.props.xScale
        ? scales.getXScale({
          chartDataGroupBy: this.props.chartDataGroupBy,
          chartHeight,
          chartType: this.props.chartType,
          chartWidth,
          data,
          labels: this.props.datumLabels,
          margins: this.props.margins,
          svgWidth: this.state.containerWidth,
          xScaleTime: this.props.xScaleTime,
          xScaleTimeFormat: this.props.xScaleTimeFormat,
          xValue: this.props.xValue,
        })
        : null,

      thisYAxisLabel = this.props.yAxis
        ? axes.getYAxisLabel({
          chartDataGroupBy: this.props.chartDataGroupBy,
          transform: 'rotate(-90)',
          // x & y flip because of rotation
          x: -this.state.containerHeight / 2 - this.props.margins.top,
          y: '1em',
          yAxisLabel: this.props.yAxisLabel || this.props.yValue,
        })
        : null,

      thisYScale = this.props.yScale
        ? scales.getYScale({
          chartDataGroupBy: this.props.chartDataGroupBy,
          chartHeight,
          chartType: this.props.chartType,
          chartWidth,
          data,
          margins: this.props.margins,
          svgHeight: this.state.containerHeight,
          yValue: this.props.yValue,
        })
        : null;

    if (this.props.yAxis && thisYScale && hasDocument) axes.getYAxis({ id: this.props.id, thisYScale });

    if (this.props.xAxis && thisXScale && hasDocument) axes.getXAxis({ id: this.props.id, thisXScale });

    const thisChart = chartFunction({
      chartDataGroupBy: this.props.chartDataGroupBy,
      chartHeight,
      chartType: this.props.chartType,
      chartWidth,
      colorScale,
      colorScaleScheme: this.props.colorScaleScheme,
      colorScaleType: this.props.colorScaleType,
      data,
      filterable: this.props.filterable,
      id: this.props.id,
      labels: this.props.datumLabels,
      sortable: this.props.sortable,
      xScale: thisXScale,
      xScaleTime: this.props.xScaleTime,
      xScaleTimeFormat: this.props.xScaleTimeFormat,
      xValue: this.props.xValue,
      yScale: thisYScale,
      yValue: this.props.yValue,
    });

    const renderedChart = this.props.chartType === 'table'
      ? thisChart
      : <SVG
        id={this.props.id}
        preserveAspectRatio={this.props.preserveAspectRatio}
        svgHeight={this.state.containerHeight}
        svgWidth={this.state.containerWidth}
      >
        <g
          className='chart-svg-g'
          height={chartHeight}
          transform={`translate(${this.props.margins.left}, ${this.props.margins.top})`}
          width={chartWidth}
          >
          <g
            className={`${this.props.chartType.toLowerCase()}-visual-container`}
            transform={this.getVisualContainerTransform({ chartHeight, chartType: this.props.chartType, chartWidth })}
          >
            {thisChart}
          </g>
        </g>
        { this.props.xAxis &&
          <g
            className='x axis'
            transform={`translate(${this.props.margins.left}, ${chartHeight + this.props.margins.top})`}
          />
        }
        { thisXAxisLabel }
        { this.props.yAxis &&
          <g
            className='y axis'
            transform={`translate(${this.props.margins.left}, ${this.props.margins.top})`}
          />
        }
        { thisYAxisLabel }
        <section
          id={`${this.props.id}-tooltip`}
          style={{
            backgroundColor: 'black',
            border: '2px red dashed',
            borderRadius: '4px',
            opacity: 0,
            padding: '10px',
            position: 'absolute',
          }}
        />
      </SVG>;

    return (
      <section
        className='chart-container'
        ref={(container) => this.container = container}
        style={{
          display: 'block',
          overflow: 'scroll',
          position: 'relative',
          verticalAlign: 'top',
          width: '100%',
        }}
      >
        {renderedChart}
      </section>
    );
  }
}
