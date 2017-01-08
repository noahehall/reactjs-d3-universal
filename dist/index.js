'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bars = require('./barchart/bars.js');

var _lines = require('./linechart/lines.js');

var _slices = require('./piechart/slices.js');

var _dots = require('./scatterplot/dots.js');

var _svg = require('./svg');

var _axes = require('./lib/axes.js');

var axes = _interopRequireWildcard(_axes);

var _data = require('./lib/data.js');

var dataFunctions = _interopRequireWildcard(_data);

var _scales = require('./lib/scales.js');

var scales = _interopRequireWildcard(_scales);

var _react = require('../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

var _table = require('./table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chart = function (_React$Component) {
  _inherits(Chart, _React$Component);

  _createClass(Chart, null, [{
    key: 'defaultProps',
    get: function get() {
      return {
        chart: { data: {}, margins: {} },
        chartDataGroupBy: '', // eslintignore required for line chart
        // bar|scatterplot|pie|line
        // scatterplot: requires x and y values to be integers
        chartType: '',
        colorScaleScheme: '',
        colorScaleType: '',
        datumLabels: [],
        filterable: false,
        id: 'reactjs-d3-v4-universal',
        margins: {},
        preserveAspectRatio: 'xMinYMin meet',
        sortable: false,
        xAxis: false,
        xAxisLabel: '',
        xScale: false,
        xScaleTime: false, // eslintignore required for line chart
        xScaleTimeFormat: '', // eslintignore required for line chart https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
        xValue: '',
        yAxis: false,
        yAxisLabel: '',
        yScale: false,
        yValue: '' };
    }
  }]);

  function Chart(props) {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props));

    _this.setSize = function () {
      var containerHeight = void 0,
          containerWidth = void 0;

      try {
        containerHeight = _this.container.offsetHeight;
      } catch (err) {
        containerHeight = _this.state.containerHeight;
      }

      try {
        containerWidth = _this.container.offsetWidth;
      } catch (err) {
        containerWidth = _this.state.containerWidth;
      }

      _this.setState({
        containerHeight: containerHeight,
        containerWidth: containerWidth
      });

      return true;
    };

    _this.getVisualContainerTransform = function (_ref) {
      var chartHeight = _ref.chartHeight,
          chartType = _ref.chartType,
          chartWidth = _ref.chartWidth;

      switch (chartType.toLowerCase()) {
        case 'pie':
          return 'translate(' + [chartWidth / 2, chartHeight / 2] + ')';
        default:
          return 'translate(0, 0)';
      }
    };

    _this.state = {
      containerHeight: 200,
      containerWidth: 200
    };
    return _this;
  }

  _createClass(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // filter the table
      if (this.props.chartType === 'table') {
        appFuncs.filterTable.setFilterGrid('table');
        appFuncs.sortTable.init();
      }

      this.setSize();
      if (typeof window !== 'undefined') window.addEventListener('resize', this.setSize, false);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !appFuncs._.isEqual(nextState, this.state) || !appFuncs._.isEqual(nextProps, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (typeof window !== 'undefined') window.removeEventListener('resize', this.setSize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (appFuncs._.isEmpty(this.props.chart.data)) {
        appFuncs.logError({
          data: this.props.chart,
          loc: __filename,
          msg: 'You need data to create a chart, return null'
        });

        return null;
      }

      var chartFunction = void 0;
      switch (this.props.chartType.toLowerCase()) {
        case 'pie':
          chartFunction = _slices.PieSlices;
          break;
        case 'bar':
          chartFunction = _bars.Bars;
          break;
        case 'scatterplot':
          chartFunction = _dots.ScatterPlotDots;
          break;
        case 'line':
          chartFunction = _lines.Lines;
          break;
        case 'table':
          chartFunction = _table.Table;
          break;
        default:
          {
            appFuncs.logError({
              data: [this.props.chartType, this.props.chart],
              loc: __filename,
              msg: 'did not find chart type ' + this.props.chartType + ', returning null'
            });

            return null;
          }
      }

      var chartHeight = this.state.containerHeight - (this.props.margins.top + this.props.margins.bottom),
          chartWidth = this.state.containerWidth - (this.props.margins.left + this.props.margins.right),
          colorScale = this.props.colorScaleScheme ? scales.colorScale({
        chartDataGroupBy: this.props.chartDataGroupBy,
        colorScaleScheme: this.props.colorScaleScheme,
        colorScaleType: this.props.colorScaleType
      }) : null,
          data = dataFunctions.format({
        chartDataGroupBy: this.props.chartDataGroupBy,
        chartType: this.props.chartType,
        data: this.props.chart.data,
        xScaleTime: this.props.xScaleTime,
        xScaleTimeFormat: this.props.xScaleTimeFormat,
        xValue: this.props.xValue
      }),
          hasDocument = typeof document !== 'undefined',
          thisXAxisLabel = this.props.xAxis ? axes.getXAxisLabel({
        chartDataGroupBy: this.props.chartDataGroupBy,
        transform: 'rotate(0)',
        x: this.state.containerWidth / 2 - this.props.margins.left,
        xAxisLabel: this.props.xAxisLabel || this.props.xValue,
        y: this.state.containerHeight
      }) : null,
          thisXScale = this.props.xScale ? scales.getXScale({
        chartDataGroupBy: this.props.chartDataGroupBy,
        chartHeight: chartHeight,
        chartType: this.props.chartType,
        chartWidth: chartWidth,
        data: data,
        labels: this.props.datumLabels,
        margins: this.props.margins,
        svgWidth: this.state.containerWidth,
        xScaleTime: this.props.xScaleTime,
        xScaleTimeFormat: this.props.xScaleTimeFormat,
        xValue: this.props.xValue
      }) : null,
          thisYAxisLabel = this.props.yAxis ? axes.getYAxisLabel({
        chartDataGroupBy: this.props.chartDataGroupBy,
        transform: 'rotate(-90)',
        // x & y flip because of rotation
        x: -this.state.containerHeight / 2 - this.props.margins.top,
        y: '1em',
        yAxisLabel: this.props.yAxisLabel || this.props.yValue
      }) : null,
          thisYScale = this.props.yScale ? scales.getYScale({
        chartDataGroupBy: this.props.chartDataGroupBy,
        chartHeight: chartHeight,
        chartType: this.props.chartType,
        chartWidth: chartWidth,
        data: data,
        margins: this.props.margins,
        svgHeight: this.state.containerHeight,
        yValue: this.props.yValue
      }) : null;

      if (this.props.yAxis && thisYScale && hasDocument) axes.getYAxis({ id: this.props.id, thisYScale: thisYScale });

      if (this.props.xAxis && thisXScale && hasDocument) axes.getXAxis({ id: this.props.id, thisXScale: thisXScale });

      var thisChart = chartFunction({
        chartDataGroupBy: this.props.chartDataGroupBy,
        chartHeight: chartHeight,
        chartType: this.props.chartType,
        chartWidth: chartWidth,
        colorScale: colorScale,
        colorScaleScheme: this.props.colorScaleScheme,
        colorScaleType: this.props.colorScaleType,
        data: data,
        filterable: this.props.filterable,
        id: this.props.id,
        labels: this.props.datumLabels,
        sortable: this.props.sortable,
        xScale: thisXScale,
        xScaleTime: this.props.xScaleTime,
        xScaleTimeFormat: this.props.xScaleTimeFormat,
        xValue: this.props.xValue,
        yScale: thisYScale,
        yValue: this.props.yValue
      });

      var renderedChart = this.props.chartType === 'table' ? thisChart : _react2.default.createElement(
        _svg.SVG,
        {
          id: this.props.id,
          preserveAspectRatio: this.props.preserveAspectRatio,
          svgHeight: this.state.containerHeight,
          svgWidth: this.state.containerWidth
        },
        _react2.default.createElement(
          'g',
          {
            className: 'chart-svg-g',
            height: chartHeight,
            transform: 'translate(' + this.props.margins.left + ', ' + this.props.margins.top + ')',
            width: chartWidth
          },
          _react2.default.createElement(
            'g',
            {
              className: this.props.chartType.toLowerCase() + '-visual-container',
              transform: this.getVisualContainerTransform({ chartHeight: chartHeight, chartType: this.props.chartType, chartWidth: chartWidth })
            },
            thisChart
          )
        ),
        this.props.xAxis && _react2.default.createElement('g', {
          className: 'x axis',
          transform: 'translate(' + this.props.margins.left + ', ' + (chartHeight + this.props.margins.top) + ')'
        }),
        thisXAxisLabel,
        this.props.yAxis && _react2.default.createElement('g', {
          className: 'y axis',
          transform: 'translate(' + this.props.margins.left + ', ' + this.props.margins.top + ')'
        }),
        thisYAxisLabel,
        _react2.default.createElement('section', {
          id: this.props.id + '-tooltip',
          style: {
            backgroundColor: 'black',
            border: '2px red dashed',
            borderRadius: '4px',
            opacity: 0,
            padding: '10px',
            position: 'absolute'
          }
        })
      );

      return _react2.default.createElement(
        'section',
        {
          className: 'chart-container',
          ref: function ref(container) {
            return _this2.container = container;
          },
          style: {
            display: 'block',
            overflow: 'scroll',
            position: 'relative',
            verticalAlign: 'top',
            width: '100%'
          }
        },
        renderedChart
      );
    }
  }]);

  return Chart;
}(_react2.default.Component);

Chart.propTypes = {
  chart: _react2.default.PropTypes.object,
  chartDataGroupBy: _react2.default.PropTypes.string,
  chartType: _react2.default.PropTypes.string,
  colorScaleScheme: _react2.default.PropTypes.string,
  colorScaleType: _react2.default.PropTypes.string,
  datumLabels: _react2.default.PropTypes.array,
  filterable: _react2.default.PropTypes.bool,
  id: _react2.default.PropTypes.string,
  margins: _react2.default.PropTypes.object,
  preserveAspectRatio: _react2.default.PropTypes.string,
  sortable: _react2.default.PropTypes.bool,
  xAxis: _react2.default.PropTypes.bool,
  xAxisLabel: _react2.default.PropTypes.string,
  xScale: _react2.default.PropTypes.bool,
  xScaleTime: _react2.default.PropTypes.bool,
  xScaleTimeFormat: _react2.default.PropTypes.string,
  xValue: _react2.default.PropTypes.string,
  yAxis: _react2.default.PropTypes.bool,
  yAxisLabel: _react2.default.PropTypes.string,
  yScale: _react2.default.PropTypes.bool,
  yValue: _react2.default.PropTypes.string
};
exports.default = Chart;