import React from 'react';

export const Path = ({ // eslintignore https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
  chartType = 'pie',
  d,
  fill = 'blue',
  id = '',
  onClick = () => null,
  onMouseMove = () => null,
  stroke = 'gray',
}) => (
  <path
    className={`${chartType}-path`}
    d={d}
    fill={fill}
    id={id}
    onClick={onClick}
    onMouseMove={onMouseMove}
    stroke={stroke}
  />
);

Path.propTypes = {
  chartType: React.PropTypes.string,
  d: React.PropTypes.string.isRequired,
  fill: React.PropTypes.string,
  id: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onMouseMove: React.PropTypes.func,
  stroke: React.PropTypes.string,
};

export default Path;
