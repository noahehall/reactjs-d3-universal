/* eslint-disable */
import * as d3 from 'd3';
import React from 'react';
import Text from './text.js';
import Chart from '../index.js';

export const createTable = ({
  metadata,
  diameter,
  id,
  idx,
  margins = {top: 2, right: 2, bottom: 2, left: 2}
}) =>
  <Chart
    chartType='table'
    containerHeight={diameter}
    containerWidth={diameter}
    data={metadata}
    filterable={false}
    id={`${id}-table-${idx}`}
    margins={margins}
    sortable={false}
  />
export const createText = ({
  d,
  idx,
  labels,
  r,
}) =>
  <Text
    d={d}
    idx={idx}
    labels={labels}
    r={r}
  />

export default class PackG extends React.Component {
  static get defaultProps () {
    return {
      colorScale: () => null,
      d: {},
      foreignObject: false,
      id: '',
      idx: 0,
      labels: [],
    };
  }

  static propTypes = {
    colorScale: React.PropTypes.func,
    d: React.PropTypes.object,
    foreignObject: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.array,
    ]),
    id: React.PropTypes.string,
    idx: React.PropTypes.number,
    labels: React.PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      previous: {},
      r: 0,
      scale: 1,
      scaled: false,
      x: 0,
      y: 0,
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

  updateDimensions = (vizConRect, vizCon) => {
    if (!this.state.scaled) {
      this.setState({ previous: this.g.previousElementSibling });
      vizCon.appendChild(this.g);
      const i = d3.interpolate(
        [
          this.state.x,
          this.state.y,
          1,
        ],
        [
          0,
          0,
          vizConRect.width/2/this.state.r,
        ]
      );

      let t = 0;
      const timer = d3.interval(() => {
        t += 0.1;
        this.setState({
          x: i(t)[0],
          y: i(t)[1],
          scale: i(t)[2],
        });
        if (t > 0.9 || this.state.scaled) {
          timer.stop();
          this.setState({ scaled: true });
        }
      }, 10);
    } else {
      const i = d3.interpolate(
        [ this.state.x, this.state.y, this.state.scale ],
        [ this.props.d.x, this.props.d.y, 1 ]
      );
      let t = 0;
      const timer = d3.interval(() => {
        t += 0.1;
        this.setState({ x: i(t)[0], y: i(t)[1], scale: i(t)[2] });
        if (t > 0.9 || !this.state.scaled) {
          timer.stop();
          this.state.previous.parentNode.insertBefore(this.g, this.state.previous.nextSibling);
          this.setState({ scaled: false })
        }
      }, 10);
    }

    return true;
  }

  handleZoom = () => {
    const vizCon = document.getElementById(`${this.props.id}-visual-container`).firstElementChild.firstElementChild;

    if (!Boolean(vizCon) || vizCon === this.g) return false;

    return this.updateDimensions(vizCon.getBoundingClientRect(), vizCon);

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
          this.handleZoom();
        }}
        ref={(g) => this.g = g}
        transform={`translate(${this.state.x || this.props.d.x}, ${this.state.y || this.props.d.y}) scale(${this.state.scale})`}
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
          createText({
            d,
            idx,
            labels,
            r: this.state.r || this.props.d.r,
          })
        }
        {
          this.props.foreignObject &&
          <g transform={`translate(-${this.state.r/2}, 0)`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
            >
              <a xlinkHref={`${this.props.foreignObject[0].url}`} target='_blank'>
                  <image
                    xlinkHref={this.props.foreignObject[0].imageUrl}
                    height={this.state.r/2}
                    width={this.state.r/2} />
                  <svg xmlns='http://www.w3.org/2000/svg'
                    width={this.state.r/2}
                    height={this.state.r/2}
                    viewBox={`0 0 ${this.state.r/2} ${this.state.r/2}`}
                  >

                  </svg>
              </a>
            </svg>
            <text
              fontSize={10}
              fill='black'
              textAnchor='middle'
              transform={`translate(${this.state.r+1}, 10)`}
              fontFamily="'Lucida Grande', sans-serif"
            >{this.props.foreignObject[0].tweet.substring(0,10)}</text>
            <text
              fontSize={10}
              fill='black'
              textAnchor='middle'
              transform={`translate(${this.state.r+1}, 20)`}
              fontFamily="'Lucida Grande', sans-serif"
            >{this.props.foreignObject[0].tweet.substring(10,18)}</text>
          </g>
        }
        {this.props.children || null}
      </g>
    );
  }
}
