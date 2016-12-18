import * as d3 from 'd3';
import React from 'react';

export class PieLabel extends React.Component {
  static propTypes = {
    arc: React.PropTypes.object,
    chartHeight: React.PropTypes.number,
    chartWidth: React.PropTypes.number,
    idx: React.PropTypes.number,
    labels: React.PropTypes.array,
  }

  constructor (props) {
    super(props);

    this.state = {
      dx: 20,
      dy: 0,
      fontSize: '10px',
      textAnchor: 'start',
      x: 0,
      y: 0,
    };
  }

  componentDidMount () {
    this.updateSize({ props: this.props });
  }

  componentWillReceiveProps (nextProps) {
    if (
      nextProps.chartWidth !== this.props.chartWidth ||
      nextProps.chartHeight !== this.props.chartHeight
    ) this.updateSize({ props: nextProps });
  }

  generateLabelArc = ({ chartHeight, chartWidth, endAngle, startAngle }) => d3
    .arc()
    .endAngle(endAngle)
    .innerRadius(Math.min(chartHeight, chartWidth)) // eslintignore bigger number = smaller donut
    .outerRadius(Math.min(chartHeight, chartWidth)) // eslintignore bigger number = smaller pie
    .startAngle(startAngle);

  getLabel = () => {
    const label = [];
    if (this.props.labels.length)
      this.props.labels.forEach((thisLabel, idx) =>
        label.push(
          <tspan
            className={'chart-label'}
            key={`${thisLabel}-${idx}`}
          >
            {`${this.props.arc.data[thisLabel]}  `}
          </tspan>
        )
      );

    return label;
  }
  updateSize = ({ props }) => {
    const thisArc = this.generateLabelArc({
      chartHeight: props.chartHeight,
      chartWidth: props.chartWidth,
      endAngle: props.arc.endAngle,
      startAngle: props.arc.startAngle,
    });
    // appFuncs.console('dir')(this.text.getComputedTextLength());

    const [ x, y ] = thisArc.centroid(props.arc);
    this.setState({
      dx: (props.arc.endAngle + props.arc.startAngle)/2 > Math.PI
        ? -15
        : 15,
      textAnchor: 'middle',
        /* alternative for textAnchor
          (props.arc.endAngle + props.arc.startAngle)/2 > Math.PI
            ? 'start' // eslintignore left side of chart
            : 'end', // eslintignore right side of chart
        */
      x: x/2,
      y: y/2,
    });

    return true;
  }

  render () {
    return (
      <text
        dx={this.state.dx}
        dy={this.state.dy}
        ref={(text) => this.text = text}
        style={{fontSize: this.state.fontSize}}
        textAnchor={this.state.textAnchor}
        x={this.state.x}
        xlinkHref={`#arc-${this.props.idx}`}
        y={this.state.y}
      >
        {this.getLabel()}
      </text>
    );
  }
}
