import React from 'react';
import * as d3 from 'd3';

export class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: '12px',
    };
  }

  componentDidMount () {

    // initially set size based on current browser width
    // this.setSize();
    // update chart size whenever browser resizes
  }

  componentWillReceiveProps (nextProps) {
    if (!appFuncs._.isEqual(nextProps, this.props)) this.setSize();
  }

  shouldComponentUpdate (nextProps, nextState) {
    // only update if state or props have changed
    return !appFuncs._.isEqual(nextState, this.state)
      || !appFuncs._.isEqual(nextProps, this.props);
  }

  /**
   * retrieves container dimensions from client and updates state which triggers redraw
   */
  setSize = () => {
    const
      length = this.props.d.data[this.props.labels[0]].length,
      factor =
        length > 9 ? 1 :
        length > 5 ? 2.2 : 2.9,
      newSize = 25 * this.props.r * factor / window.innerWidth;

    if (Math.abs(parseInt(this.state.fontSize) - newSize) > 1)
      this.setState({
        fontSize: `${newSize}vw`
      });

    return true;
  }

  render() {
    const {
      d,
      labels,
    } = this.props;

    return (
      <text
        ref={(text) => this.text = text }
        textAnchor='middle'
        className='label'
        fontSize={this.state.fontSize}
        style={{
          display: 'inline',
          fillOpacity: 1,
        }}
      >
        {d.data[labels[0]]}
      </text>
    )
  }
}

export class PackG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.d.x,
      y: props.d.y,
      r: props.d.r,
      ox: props.d.x,
      oy: props.d.y,
      or: props.d.r,
      scaleX: 1,
      scaleY: 1,
      scaled: false,
      vizConRect: {},
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.d.x !== this.state.ox || nextProps.d.y !== this.state.oy)
      this.setState({
        x: nextProps.d.x,
        ox: nextProps.d.x,
        y: nextProps.d.y,
        oy: nextProps.d.y,
        r: nextProps.d.r,
        or: nextProps.d.r,
        vizConRect: document.getElementById(`${this.props.id}-visual-container`).getBoundingClientRect()
      });
  }

  handleZoom = () => {
    if(!this.state.scaled)
      this.setState({
        x: this.state.vizConRect.left + (this.state.vizConRect.width /2),
        y: this.state.vizConRect.top + (this.state.vizConRect.height /2),
        r: Math.min(this.state.vizConRect.width, this.state.vizConRect.height) / 2,
        scaled: true,
      });
    else
      this.setState({
        x: this.state.ox,
        y: this.state.oy,
        r: this.state.or,
        scaled: false,
      });
  }

  render () {
    const {
      idx,
      d,
      colorScale,
      labels,
    } = this.props;

    return (
      <g
        key={idx}
        transform={`translate(${this.state.x}, ${this.state.y})`}
        ref={(g) => this.g = g}
        onClick={(e) => {
          e.stopPropagation();
          if (!d.children) this.handleZoom();
        }}
      >
        <circle
          r={this.state.r}
          className={d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root' }
          ref={(circle) => this.circle = circle}
          style={{
            fill: d.children ? colorScale(d.depth) : 'white',
            "stroke":"#fff",
            "strokeWidth":"1.5px",
          }}
        />
        { !d.children && <Text d={d} r={this.state.r} labels={labels} /> }
      </g>
    );
  }
}
export const nodesArray = ({
  nodes,
  colorScale,
  labels,
  chartHeight,
  chartWidth,
  id,
}) => {
  const nodeArray = [];
  nodes.forEach((d, idx) =>
    nodeArray.push(
      // TODO: add click handler to each circle for zoom
      <PackG
        idx={idx}
        d={d}
        colorScale={colorScale}
        labels={labels}
        id={id}
        chartWidth={chartWidth}
        chartHeight={chartHeight}
      />
    )
  );

  return nodeArray;
};
