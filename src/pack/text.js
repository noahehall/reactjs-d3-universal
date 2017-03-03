import React from 'react';

export default class Text extends React.Component {
  static get defaultProps () {
    return {
      d: {},
      labels: [],
    };
  }

  static propTypes = {
    d: React.PropTypes.object,
    labels: React.PropTypes.array,
  }

  constructor (props) {
    super(props);
    this.state = {
      fontSize: '12px',
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
        length > 13 ? 0.7 :
        length > 9 ? 1.3 :
        length > 7 ? 1.8 :
        length > 5 ? 2.2 : 2.9,
      newSize = 25 * props.r * factor / window.innerWidth;

    return (Math.abs(parseInt(this.state.fontSize) - newSize) > 1)
      ? (this.setState({ fontSize: `${newSize}vw`}) && true)
      : false;
  }

  render () {
    const {
      d,
      labels,
    } = this.props;

    return (
      <text
        className='label'
        fontSize={this.state.fontSize}
        ref={(text) => this.text = text }
        style={{
          display: 'inline',
          fillOpacity: 1,
        }}
        textAnchor='middle'
      >
        {d.data[labels[0]]}
      </text>
    );
  }
}
