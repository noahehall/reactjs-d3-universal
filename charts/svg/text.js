import React from 'react';

export const Text = ({
  dx = 0, // eslintignore x offset from current position
  dy = 0, // eslintignore y offset from current position
  fill = 'red',
  text = 'add some text',
  textAnchor = 'start', // eslintignore start|middle|end
  transform = 'rotate(20, 30, 40)',
  x = 0, // eslintignore relative to upper left
  y = 20, // eslintignore relative to upper left
}) => <text
  dx={dx}
  dy={dy}
  fill={fill}
  textAnchor={textAnchor}
  transform={transform}
  x={x}
  y={y}
  >{text}</text>;

Text.propTypes = {
  dx: React.PropTypes.number,
  dy: React.PropTypes.number,
  fill: React.PropTypes.string,
  text: React.PropTypes.string,
  textAnchor: React.PropTypes.string,
  transform: React.PropTypes.string,
  x: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
  y: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]),
};

export default Text;
