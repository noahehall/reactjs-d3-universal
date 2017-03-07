import React from 'react';

export const getTextPath = (r, fontSize, text) =>
  `m-${r}, ${r * 0.1} a${r}, ${r * 0.83} 0 1 1 ${r * 2}, 0`;

export default class Text extends React.Component {
  static get defaultProps () {
    return {
      r: 2,
      d: {},
      idx: 0,
      labels: [],
      scale: 1,
    };
  }

  static propTypes = {
    r: React.PropTypes.number,
    d: React.PropTypes.object,
    idx: React.PropTypes.number,
    labels: React.PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      fontSize: '3',
    };
  }

  componentWillReceiveProps (nextProps) {
    if (!appFuncs._.isEqual(nextProps, this.props)) this.setSize(nextProps);
  }

  /**
   * retrieves container dimensions from client and updates state which triggers redraw
   */
  setSize = (props = this.props) => {
    const
      // TODO: update this to get the formatted label
      length = props.d.data[props.labels[0]].length,
      factor = // eslint-disable-line
        // TODO: convert this to automatically adjust based on width of container not length of chars
        length > 13 ? 0.3 :
        length > 9 ? 0.4 :
        length > 7 ? 0.5 :
        length > 5 ? 0.5 : 0.7,
      fontSize = factor * props.r/2;

    if (Math.abs(parseInt(this.state.fontSize) - fontSize) > 1)
      this.setState({ fontSize })
  }

  render () {
    const {
      d,
      labels,
      r,
      idx,
    } = this.props;
    //console.log(this.props.scale);
    return (
      <g>
        <defs>
          <path id={`path${idx}${d.value}${parseInt(d.r)}`} d={getTextPath(r, labels)} />
        </defs>
          <text
            className={`label${idx}`}
            ref={(text) => this.text = text }
            style={{
              display: 'inline',
              fillOpacity: 1,
              textTransform: 'uppercase',
              fontSize: `${this.state.fontSize/this.props.scale * 1.1}px`,
            }}
            textAnchor='middle'
          >
            <textPath xlinkHref={`#path${idx}${d.value}${parseInt(d.r)}`} startOffset='50%'>
              {d.data[labels[0]]}
            </textPath>
          </text>
      </g>
    );
  }
}
