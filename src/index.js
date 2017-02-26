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
import ForceLayout from './forcelayout/index.js';
import Pack from './pack/index.js';

/**
 * Represents a Chart
 * @constructor
 */
export default class Chart extends React.Component {
  static get defaultProps () {
    return {
      // required for line chart
      // group data by a specific property
      chartDataGroupBy: '',
      // bar|scatterplot|pie|line|table
      // scatterplot: requires x and y values to be integers
      chartType: '',
      // one of d3 color schemes, e.g. schemeCategory10|20|20b|20c or compatible object
      // @see ./lib/scales.js
      colorScaleScheme: '',
      // one of [basic, chromatic, sequential, random]
      // @see ./lib/scales.js
      colorScaleType: '',
      // data for this chart
      data: [],
      // used to create labels for bar charts
      // @see ./lib/scales.js (passed in as 'labels' to getXScale())
      datumLabels: [],
      // only applies to chartType='table'
      // @see ./table/index.js
      filterable: false,
      id: 'reactjs-d3-v4-universal',
      // used for chart margins to place scales
      // @see this file and ./lib/scales.js
      margins: {},
      // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
      // @see ./svg/index.js
      preserveAspectRatio: 'xMinYMin meet',
      // if chartType = 'table'
      // @see ./table/index.js
      sortable: false,
      // should we include an xAxis for this chart
      // @see ./lib/aces.jjs
      xAxis: false,
      // the text we should use for the x axis, defaults to the xValue provided in the data
      // @see ./lib/axes.js
      xAxisLabel:'',
      // creates an X-Scale for bar, line, and scatterplot charts
      xScale: false,
      // required for line chart
      xScaleTime: false,
      // required for line chart https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
      xScaleTimeFormat: '',
      xValue: '',
      // if this chart requires a y-axis
      yAxis: false,
      // the value to use for y axis label, defaults to
      yAxisLabel: '',
      // if this chart requires a scale on the y dimension
      yScale: false,
      // used for pie chart slice arc
      yValue: '',
    };
  }

  static propTypes = {
    chartDataGroupBy: React.PropTypes.string,
    chartType: React.PropTypes.string,
    colorScaleScheme: React.PropTypes.string,
    colorScaleType: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
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
    // default dimensions for isomorphic rendering
    // is updated client-side on mount + browser resizes
    this.state = {
      containerHeight: 200,
      containerWidth: 200,
    };
  }

  componentDidMount () {
    // initial filtering and sorting
    // TODO: separate and check sorting & filtering are enabled before initializing
    if (this.props.chartType === 'table') {
      appFuncs.filterTable.setFilterGrid('table');
      appFuncs.sortTable.init();
    }

    // initially set size based on current browser width
    this.setSize();
    // update chart size whenever browser resizes
    if (typeof window !== 'undefined') window.addEventListener(`resize`, this.setSize, false);

    this.renderChart();
  }

  shouldComponentUpdate (nextProps, nextState) {
    // only update if state or props have changed
    return !appFuncs._.isEqual(nextState, this.state)
      || !appFuncs._.isEqual(nextProps, this.props);
  }

  componentWillUnmount () {
    // remove event listener if in browser
    if (typeof window !== 'undefined') window.removeEventListener(`resize`, this.setSize);
  }

  /**
   * retrieves container dimensions from client and updates state which triggers redraw
   */
  setSize = () => {
    let containerHeight, containerWidth;

    // TODO: move all try blocks outside of this function
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

  /**
   * moves SVG container into its parent
   */
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

  renderChart = (width = this.state.containerWidth, height = this.state.containerHeight) => {
    /**
     * maps the chart type to required chart function
     * TODO: move to lib directory
     */
    const { chartType } = this.props;
    let chartFunction;
    switch (chartType.toLowerCase()) {
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
      case 'forcedirectedgraph':
        chartFunction = ForceLayout;
        break;
      case 'pack':
        chartFunction = Pack;
        break;
      default : {
        appFuncs.logError({
          data: [ chartType, this.props.data ],
          loc: __filename,
          msg: `did not find chart type ${chartType}, returning null`,
        });

        return null;
      }
    }

    // initialize variables required for chart
    const
      chartHeight = height - (this.props.margins.top + this.props.margins.bottom),
      chartWidth = width - (this.props.margins.left + this.props.margins.right),

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
        data: this.props.data,
        xScaleTime: this.props.xScaleTime,
        xScaleTimeFormat: this.props.xScaleTimeFormat,
        xValue: this.props.xValue,
      }),

      hasDocument = typeof document !== 'undefined',

      thisXAxisLabel = this.props.xAxis
        ? axes.getXAxisLabel({
          chartDataGroupBy: this.props.chartDataGroupBy,
          transform: 'rotate(0)',
          x: width / 2 - this.props.margins.left,
          xAxisLabel: this.props.xAxisLabel || this.props.xValue,
          y: height,
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
          svgWidth: width,
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
          x: -height / 2 - this.props.margins.top,
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
          svgHeight: height,
          yValue: this.props.yValue,
        })
        : null;

    // only create X and Y axis on client
    if (this.props.yAxis && thisYScale && hasDocument) axes.getYAxis({ id: this.props.id, thisYScale });
    if (this.props.xAxis && thisXScale && hasDocument) axes.getXAxis({ id: this.props.id, thisXScale });

    // creates chart based on above variable initializations
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
      margins: this.props.margins,
      sortable: this.props.sortable,
      xScale: thisXScale,
      xScaleTime: this.props.xScaleTime,
      xScaleTimeFormat: this.props.xScaleTimeFormat,
      xValue: this.props.xValue,
      yScale: thisYScale,
      yValue: this.props.yValue,
    });

    // Create an SVG containing the chart
    const renderedChart = this.props.chartType === 'table'
      ? thisChart
      : <SVG
        id={this.props.id}
        preserveAspectRatio={this.props.preserveAspectRatio}
        svgHeight={height}
        svgWidth={width}
      >
        <g
          className='chart-svg-g'
          height={chartHeight}
          transform={`translate(${this.props.margins.left}, ${this.props.margins.top})`}
          width={chartWidth}
          >
          <g
            className={`${this.props.chartType.toLowerCase()}-visual-container`}
            id={`${this.props.id}-visual-container`}
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

    // Return a div containing the SVG
    return (
      <div
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
      </div>
    );
  }

  render () {
    if (appFuncs._.isEmpty(this.props.data)) {
      appFuncs.logError({
        data: this.props.data,
        loc: __filename,
        msg: 'You need data to create a chart, returning null',
      });

      return null;
    }

    return this.renderChart();
  }
}
