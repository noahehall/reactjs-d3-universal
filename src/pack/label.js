import React from 'react';

export const getFontSize = (props) => {
  if (props.d.depth === 2) return '10';
  // TODO: update this to get the formatted label
  const length = props.d.data[props.labels[0]].length;

  let factor = // eslint-disable-line
      // TODO: convert this to automatically adjust based on width of container not length of chars
      length > 13 ? 0.3 :
      length > 9 ? 0.4 :
      length > 7 ? 0.5 :
      length > 5 ? 0.6 : 0.7;

  // if (props.d.depth === 2) factor *= 0.5;

  return factor * props.d.r/2;
};

export default class Label extends React.Component {
  static get defaultProps () {
    return {
      d: {},
      idx: '0',
      labels: [],
    };
  }

  static propTypes = {
    d: React.PropTypes.object,
    idx: React.PropTypes.string,
    labels: React.PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      fontSize: props.d.depth === 2 ? '10' : getFontSize(props),
    };
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.d.depth !== 2 && !appFuncs._.isEqual(nextProps, this.props)) this.setSize(nextProps);
  }

  /**
   * gets the path of text
   * $1 = pos right, neg left
   * $2 = pos down, neg up
   */
  getTextPath = (r = this.props.d.r, depth = this.props.d.depth === 2) =>
    `m-${r}, ${!depth ? r * 0.2 : -r * 0.2} a${r}, ${r * 0.83} 0 1 1 ${r * 2}, 0`;

  /**
   * retrieves container dimensions from client and updates state which triggers redraw
   */
  setSize = (props = this.props) => {
    function setStateSize () {
      const fontSize = getFontSize(props);

      if (Math.abs(parseInt(this.state.fontSize) - fontSize) >= 0.5)
        this.setState({ fontSize });
    }

    if (typeof window !== 'undefined')
      if (window.requestAnimationFrame)
        window.requestAnimationFrame(setStateSize);
      else window.setTimeout(() => setStateSize, 1);
  }

  render () {
    const {
      d,
      labels,
      idx,
    } = this.props;

    return (
      <g style={{ cursor: 'pointer' }}>
        <defs>
          <path
            d={this.getTextPath()}
            id={`path${idx}${d.value}${parseInt(d.r)}`}
          />
        </defs>
        <text
          className={`label${idx}`}
          ref={(text) => this.text = text }
          style={{
            display: 'inline',
            fontSize: `${this.state.fontSize}px`,
            textTransform: 'uppercase',
          }}
          textAnchor='middle'
        >
          <textPath
            startOffset='50%'
            xlinkHref={`#path${idx}${d.value}${parseInt(d.r)}`}
          >
            {d.data[labels[0]]}
          </textPath>
        </text>
      </g>
    );
  }
}
