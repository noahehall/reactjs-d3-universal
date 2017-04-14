import { Bars } from './barchart/bars.js';
import { Lines } from './linechart/lines.js';
import { PieSlices } from './piechart/slices.js';
import { ScatterPlotDots } from './scatterplot/dots.js';
import { SVG } from './svg';
import { Table } from './table';
import * as axes from './lib/axes.js';
import * as dataFunctions from './lib/data.js';
import * as scales from './lib/scales.js';
import ForceLayout from './forcelayout/index.js';
import Pack from './pack/index.js';
import Popup from 'react-popup';
import React from 'react';

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
      // if this chart contains data to be embedded in a svg#foreignObject
      foreignObject: false,
      // the type of figure object to create, e.g. 'table' creates an html table
      foreignObjectType: 'table',
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
    foreignObject: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    foreignObjectType: React.PropTypes.string,
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

  static childContextTypes = {
    Popup: React.PropTypes.func,
  }

  constructor (props) {
    super(props);

    /**
     * maps the chart type to required chart function
     * TODO: move to lib directory
     */
    let chartFunction;
    switch (props.chartType.toLowerCase()) {
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
          data: [ props.chartType, props.data ],
          loc: __filename,
          msg: `did not find chart type ${props.chartType}, setting to null`,
        });

        chartFunction = null;
      }
    }

    this.state = {
      chartFunction,
      colorScale: props.colorScaleScheme
      ? scales.colorScale({
        chartDataGroupBy: props.chartDataGroupBy,
        colorScaleScheme: props.colorScaleScheme,
        colorScaleType: props.colorScaleType,
      })
      : null,
      containerHeight: 200,
      containerWidth: 200,
      data: dataFunctions.format({
        chartDataGroupBy: props.chartDataGroupBy,
        chartType: props.chartType,
        data: props.data,
        xScaleTime: props.xScaleTime,
        xScaleTimeFormat: props.xScaleTimeFormat,
        xValue: props.xValue,
      }),
    };
  }

  getChildContext () {
    return {
      Popup,
    };
  }

  componentDidMount () {
    // initial filtering and sorting
    if (this.props.chartType === 'table') {
      if (this.props.filterable)
        appFuncs.filterTable.setFilterGrid(this.props.id);
      if (this.props.sortable)
        appFuncs.sortTable.init();
    }

    // update chart size whenever browser resizes
    if (typeof window !== 'undefined') {
      window.addEventListener(`resize`, this.setSize, false);
      window.addEventListener(`orientationchange`, this.setSize, false);
    }

    // initially set size based on current browser width
    this.setSize();
    this.renderChart();
  }

  componentWillReceiveProps (nextProps) {
    if (!appFuncs._.isEqual(nextProps.data, this.props.data))
      this.setState({
        data: dataFunctions.format({
          chartDataGroupBy: nextProps.chartDataGroupBy,
          chartType: nextProps.chartType,
          data: nextProps.data,
          xScaleTime: nextProps.xScaleTime,
          xScaleTimeFormat: nextProps.xScaleTimeFormat,
          xValue: nextProps.xValue,
        })
      });
  }

  shouldComponentUpdate (nextProps, nextState) {
    // only update if state or props have changed
    return !appFuncs._.isEqual(nextState, this.state)
      || !appFuncs._.isEqual(nextProps, this.props);
  }

  componentWillUnmount () {
    // remove event listener if in browser
    if (typeof window !== 'undefined') {
      window.removeEventListener(`resize`, this.setSize);
      window.removeEventListener('orientationchange', this.setSize);
    }
  }


  /**
   * retrieves container dimensions from client and updates state which triggers redraw
   */
  setSize = () => {
    let containerHeight, containerWidth;

    try {
      containerHeight = Math.min(this.container.offsetHeight, window.screen.height);
    } catch (err) {
      containerHeight = this.state.containerHeight;
    }

    try {
      containerWidth = Math.min(this.container.offsetWidth, window.screen.width);
    } catch (err) {
      containerWidth = this.state.containerWidth;
    }

    const updateStateDimenions = () => {
      this.setState({
        containerHeight,
        containerWidth,
      });

      return true;
    };

    if (typeof window !== 'undefined') {
      if (window.requestAnimationFrame)
        return window.requestAnimationFrame(updateStateDimenions);

      return window.setTimeout(() => updateStateDimenions(), 1);
    }

    return false;
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
      case 'pie': return `translate(${chartWidth/2}px, ${chartHeight/2}px)`;
      default : return 'translate(0, 0)';
    }
  }

  renderChart = () => {
    // dont continue if chartFunction not valid;
    if (!this.state.chartFunction) return null;

    // initialize variables required for chart
    const
      chartHeight = this.state.containerHeight - (this.props.margins.top + this.props.margins.bottom),
      chartWidth = this.state.containerWidth - (this.props.margins.left + this.props.margins.right),

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
          data: this.state.data,
          labels: this.props.datumLabels,
          margins: this.props.margins,
          svgWidth: chartWidth,
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
          data: this.state.data,
          margins: this.props.margins,
          svgHeight: this.state.containerHeight,
          yValue: this.props.yValue,
        })
        : null;

    // only create X and Y axis on client
    if (hasDocument) {
      if (this.props.yAxis && thisYScale) axes.getYAxis({ id: this.props.id, thisYScale });
      if (this.props.xAxis && thisXScale) axes.getXAxis({ id: this.props.id, thisXScale });
    }

    // creates chart based on above variable initializations
    const thisChart = this.state.chartFunction({
      chartDataGroupBy: this.props.chartDataGroupBy,
      chartHeight,
      chartType: this.props.chartType,
      chartWidth,
      colorScale: this.state.colorScale,
      colorScaleScheme: this.props.colorScaleScheme,
      colorScaleType: this.props.colorScaleType,
      data: this.state.data,
      filterable: this.props.filterable,
      foreignObject: this.props.foreignObject,
      foreignObjectType: this.props.foreignObjectType,
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
        style={{
          position: 'relative'
        }}
        svgHeight={this.state.containerHeight}
        svgWidth={this.state.containerWidth}
        xmlns='http://www.w3.org/2000/svg'
      >
        <g
          className='chart-svg-g'
          style={{
            height: chartHeight,
            transform: `translate(${this.props.margins.left}px, ${this.props.margins.top}px)`,
            transition: 'transform 1s',
            width: chartWidth,
          }}
          >
          <g
            className={`${this.props.chartType.toLowerCase()}-visual-container`}
            id={`${this.props.id}-visual-container`}
            style={{
              transform: this.getVisualContainerTransform({ chartHeight, chartType: this.props.chartType, chartWidth }),
              transition: 'transform 1s',
            }}
          >
            {thisChart}
          </g>
        </g>
        { this.props.xAxis &&
          <g
            className='x axis'
            style={{
              transform: `translate(${this.props.margins.left}px, ${chartHeight + this.props.margins.top}px)`,
              transition: 'transform 1s',
            }}
          />
        }
        { thisXAxisLabel }
        { this.props.yAxis &&
          <g
            className='y axis'
            style={{
              tansform: `translate(${this.props.margins.left}px, ${this.props.margins.top}px)`,
              transition: 'transform 1s',
            }}
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
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Popup />
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
