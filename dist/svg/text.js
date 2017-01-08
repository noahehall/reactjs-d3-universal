'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = exports.Text = function Text(_ref) {
  var _ref$chartType = _ref.chartType,
      chartType = _ref$chartType === undefined ? '' : _ref$chartType,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? '' : _ref$className,
      _ref$dx = _ref.dx,
      dx = _ref$dx === undefined ? 0 : _ref$dx,
      _ref$dy = _ref.dy,
      dy = _ref$dy === undefined ? 0 : _ref$dy,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'black' : _ref$fill,
      _ref$text = _ref.text,
      text = _ref$text === undefined ? '' : _ref$text,
      _ref$transform = _ref.transform,
      transform = _ref$transform === undefined ? 'rotate(20, 30, 40)' : _ref$transform,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 20 : _ref$y;

  if (!text.length || !chartType) {
    appFuncs.logError({
      data: [chartType, dx, dy, fill, text, transform, x, y],
      msg: 'text must be a valid variable in svg/text.js, returning null'
    });

    return null;
  }

  var thisClassName = (className + ' ' + chartType + ' labels').trim();

  return _react2.default.createElement(
    'text',
    {
      className: thisClassName,
      dx: dx,
      dy: dy,
      fill: fill,
      transform: transform,
      x: x,
      y: y
    },
    text
  );
};

Text.propTypes = {
  chartType: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  dx: _react2.default.PropTypes.number,
  dy: _react2.default.PropTypes.number,
  fill: _react2.default.PropTypes.string,
  text: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.string]),
  transform: _react2.default.PropTypes.string,
  x: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),
  y: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string])
};

exports.default = Text;