import React from 'react';

export const getFontSize = (props) => {
  if (props.placement === 'top')
    return props.d.r > 23
      ? 10
      : props.d.r > 15
      ? 6
      : 5;

  if (props.placement === 'bottom') return props.scale > 1
    ? 20
    : 10;

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
      placement: '',
      scale: 1,
    };
  }

  static propTypes = {
    d: React.PropTypes.object,
    idx: React.PropTypes.string,
    labels: React.PropTypes.array,
    placement: React.PropTypes.string,
    scale: React.PropTypes.number,
  }

  constructor (props) {
    super(props);
    this.state = {
      fontSize: getFontSize(props),
    };
  }

  componentWillReceiveProps (nextProps) {
    if (
      (nextProps.placement === '' || nextProps.placement === 'bottom')
      && !appFuncs._.isEqual(nextProps, this.props)) this.setSize(nextProps);
  }

  /**
   * gets the path of text: http://bl.ocks.org/jebeck/196406a3486985d2b92e
   * mX, y
     *  m = moveto
     * $1 = pos right, neg left
     * $2 = pos down, neg up
   * aRX, RY  xAxisRotation BooleanPath BooleanSweep X, Y
     * rx & ry = the raddi of the ellipse
     * $3 = pos right, neg left
     * $4 = pos up, neg down
   */
  getTextPath = () => {
    const
      placement = this.props.placement,
      r = this.props.d.r;

    const
      aRX = r,
      aRY = placement === 'bottom'
        ? this.state.fontSize
        : r * 0.83,
      aX = r * 2,
      aY = 0,
      booleanPath = 1,
      booleanSweep = placement === 'bottom'
        ? 0
        : 1,
      mX = -r,
      mY = placement === 'bottom'
        ? this.props.scale * r
        : placement === 'top'
        ? -r * 0.2
        : r * 0.2,
      xAxisRotation = 0;

    return `m${mX}, ${mY} a${aRX}, ${aRY} ${xAxisRotation} ${booleanPath} ${booleanSweep} ${aX}, ${aY}`;
  }

  /**
   * retrieves container dimensions from client and updates state which triggers redraw
   */
  setSize = (props = this.props) => {
    const setStateSize = () => {
      const fontSize = getFontSize(props);

      if (Math.abs(parseInt(this.state.fontSize) - fontSize) >= 0.5)
        this.setState({ fontSize });
    };

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
      <g
        className={`pack-g-label ${this.props.placement}`}
        style={{ cursor: 'pointer', transform: `scale(${this.props.placement === 'bottom' && this.props.scale > 1 ? 1/this.props.scale : 1})`}}
      >
        <defs>
          <path
            d={this.getTextPath()}
            id={`path${idx}${d.value}${parseInt(d.r)}`}
          />
        </defs>
        <text
          className='pack-g-label-text'
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
