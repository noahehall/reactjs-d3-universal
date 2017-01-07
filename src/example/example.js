import React from 'react';
import Chart from '../index.js';
import table from './fakedata/table.json';

export default class Table extends React.Component {
  static get defaultProps () {
    return {
      id: 'tweets-per-day',
    };
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
    appFuncs.filterTable.setFilterGrid('table');
    appFuncs.sortTable.init();

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
      containerHeight = 200;
    }

    try {
      containerWidth = this.container.offsetWidth;
    } catch (err) {
      containerWidth = 200;
    }

    this.setState({
      containerHeight,
      containerWidth,
    });

    return true;
  }

  render () {
    appFuncs.console('dir')(table);

    return (
      <section
        className='chart-container'
        ref={(container) => this.container = container}
        style={{
          display: 'block',
          fontSize: '8px',
          maxHeight: '400px',
          overflow: 'scroll',
          position: 'relative',
          verticalAlign: 'top',
          width: '100%',
        }}
      >
        <Chart
          chart={{ data: table }}
          chartDataGroupBy=''
          chartType='table'
          colorScaleScheme=''
          colorScaleType=''
          containerHeight={this.state.containerHeight}
          containerWidth={this.state.containerWidth}
          datumLabels={[]}
          filterable={true}
          id='table'
          margins={{
            bottom: 10,
            left: 10,
            right: 10,
            top: 10,
          }}
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
      </section>
    );
  }
}
