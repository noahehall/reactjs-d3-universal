import React from 'react';

export const Circle = ({
  cx = 50, // eslintignore x axis center of circle relative to upper left
  cy = 50, // eslintignore y axis center of circle relative to upper left
  r = 50, // eslintignore radius of circle
  style = {
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 3,
  },
}) => <circle
  cx={cx}
  cy={cy}
  r={r}
  style={style}
/>;

Circle.propTypes = {
  cx: React.PropTypes.number,
  cy: React.PropTypes.number,
  r: React.PropTypes.number,
  style: React.PropTypes.object,
};

export default Circle;
