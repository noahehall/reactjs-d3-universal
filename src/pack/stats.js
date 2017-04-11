import React from 'react';

export default class Stats extends React.Component {
  static get defaultProps () {
    return {
      r: 2,
      showPopup: () => null,
      value: '',
    };
  }

  static propTypes = {
    r: React.PropTypes.number,
    showPopup: React.PropTypes.func,
    value: React.PropTypes.string,
  }

  render () {
    return (
      <g
        className='circle-label-container'
        onClick={() => this.props.showPopup()}
        style={{
          transform: `translate(0, ${this.props.r/2}px)`
        }}
      >
        <text
          className='circle-label'
          style={{
            display: 'inline',
            fontSize: this.props.value.length < 3 ? `${this.props.r * 1.2}px`: `${this.props.r * 0.9}px`,
            textTransform: 'uppercase',
          }}
          textAnchor='middle'
        >
          {this.props.value}
        </text>
      </g>
    );
  }
}
