import * as d3 from 'd3';
import React from 'react';
import Text from './text.js';

export default class PackG extends React.Component {
  static get defaultProps () {
    return {
      colorScale: () => null,
      d: {},
      id: '',
      idx: 0,
      labels: [],
    };
  }

  static propTypes = {
    colorScale: React.PropTypes.func,
    d: React.PropTypes.object,
    id: React.PropTypes.string,
    idx: React.PropTypes.number,
    labels: React.PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      previous: {},
      r: 0,
      scaled: false,
      x: 0,
      y: 0,
      zIndex: 0,
    };
  }

  componentWillReceiveProps (nextProps) {
    // update state on browser resize
    if (nextProps.d.x !== this.props.d.x || nextProps.d.y !== this.props.d.y)
      this.setState({
        r: nextProps.d.r,
        x: nextProps.d.x,
        y: nextProps.d.y,
      });
  }

  handleZoom = () => {
    const vizConRect = document.getElementById(`${this.props.id}-visual-container`).getBoundingClientRect();

    if (!this.state.scaled) {
      const i = d3.interpolate(
        [
          this.state.x,
          this.state.y,
          this.state.r,
        ],
        [ vizConRect.left + (vizConRect.width /2),
          vizConRect.top + (vizConRect.height /2),
          Math.min(vizConRect.width, vizConRect.height) / 2,
        ]
      );
      this.setState({
        previous: this.g.previousElementSibling,
        scaled: true,
      });
      document.getElementById(`${this.props.id}-visual-container`).appendChild(this.g);

      let t = 0;
      const timer = d3.interval(() => {
        t += 0.1;
        this.setState({
          r: i(t)[2],
          x: i(t)[0],
          y: i(t)[1],
        });
        if (t > 0.9) timer.stop();
      }, 10);
    } else {
      const i = d3.interpolate(
        [
          this.state.x,
          this.state.y,
          this.state.r,
        ],
        [
          this.props.d.x,
          this.props.d.y,
          this.props.d.r,
        ]
      );
      let t = 0;
      const timer = d3.interval(() => {
        t += 0.1;
        this.setState({
          r: i(t)[2],
          x: i(t)[0],
          y: i(t)[1],
        });
        if (t > 0.9) {
          timer.stop();
          this.state.previous.parentNode.insertBefore(this.g, this.state.previous.nextSibling);
          this.setState({
            scaled: false,
          });
        }
      }, 10);
    }

    return true;
  }

  render () {
    const {
      colorScale,
      d,
      idx,
      labels,
    } = this.props;

    return (
      <g
        key={idx}
        onClick={(e) => {
          e.stopPropagation();
          if (!d.children) this.handleZoom();
        }}
        ref={(g) => this.g = g}
        transform={`translate(${this.state.x || this.props.d.x}, ${this.state.y || this.props.d.y})`}
      >
        <circle
          className={d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root' }
          r={this.state.r || this.props.d.r}
          ref={(circle) => this.circle = circle}
          style={{
            fill: d.children ? colorScale(d.depth) : 'white',
            "stroke":"#fff",
            "strokeWidth":"1.5px",
          }}
        />
        { !d.children &&
          <Text
            d={d}
            idx={idx}
            labels={labels}
            r={this.state.r || this.props.d.r}
          />
        }
      </g>
    );
  }
}
