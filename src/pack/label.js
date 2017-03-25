import React from 'react';

export default class Text extends React.Component {
  static get defaultProps () {
    return {
      d: {},
      idx: '0',
      labels: [],
      r: 2,
      scale: 1,
    };
  }

  static propTypes = {
    d: React.PropTypes.object,
    idx: React.PropTypes.string,
    labels: React.PropTypes.array,
    r: React.PropTypes.number,
    scale: React.PropTypes.number,
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
   * gets the path of text
   */
  getTextPath = (r = this.props.r) =>
    `m-${r}, ${r * 0.1} a${r}, ${r * 0.83} 0 1 1 ${r * 2}, 0`;

  /**
   * retrieves container dimensions from client and updates state which triggers redraw
   */
  setSize = (props = this.props) => {
    function setStateSize () {
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
      <g>
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
            fillOpacity: 1,
            fontSize: `${this.state.fontSize/this.props.scale * 1.1}px`,
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
