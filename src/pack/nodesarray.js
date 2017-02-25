import React from 'react';
import * as d3 from 'd3';

export class Text extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: '12px',
    };
  }

  componentDidMount() {

    // initially set size based on current browser width
    // this.setSize();
    // update chart size whenever browser resizes
  }

  componentWillReceiveProps(nextProps) {
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
      newSize = 25 * this.props.d.r * factor / window.innerWidth;

    if (Math.abs(parseInt(this.state.fontSize) - newSize) > 1)
      this.setState({
        fontSize: `${newSize}vw`
      });

    return true;
  }

  render() {
    const {
      d,
      root,
      labels,
    } = this.props;

    return (
      <text
        ref={(text) => this.text = text }
        x={d.x}
        y={d.y}
        textAnchor='middle'
        data-diameter={d.r*2}
        className='label'
        fontSize={this.state.fontSize}
        style={{
          display: d.parent === root ? 'inline' : 'inline', // 'none',
          fillOpacity: d.parent === root ? 1 : 1,//0,
        }}
      >
        {d.data[labels[0]]}
      </text>
    )
  }
}
export const nodesArray = ({
  nodes,
  colorScale,
  zoom,
  root,
  labels,
}) => {
  const nodeArray = [];
  nodes.forEach((d, idx) =>
    nodeArray.push(
      // TODO: add click handler to each circle for zoom
      <g key={idx}>
        <circle
          r={d.r}
          cx={d.x}
          cy={d.y}
          className={d.parent ? d.children ? 'node' : 'node node--leaf' : 'node node--root' }
          onClick={zoom}
          style={{
            fill: d.children ? colorScale(d.depth) : 'white',
            "stroke":"#fff",
            "strokeWidth":"1.5px",
          }}
        />
        { !d.children && <Text d={d} root={root} labels={labels} /> }
      </g>
    )
  );

  return nodeArray;
};
