'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Line = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Line = exports.Line = function Line(_ref) {
  var _ref$x = _ref.x1,
      x1 = _ref$x === undefined ? 0 : _ref$x,
      _ref$x2 = _ref.x2,
      x2 = _ref$x2 === undefined ? 100 : _ref$x2,
      _ref$y = _ref.y1,
      y1 = _ref$y === undefined ? 0 : _ref$y,
      _ref$y2 = _ref.y2,
      y2 = _ref$y2 === undefined ? 100 : _ref$y2,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {
    stroke: 'red',
    strokeWidth: 4
  } : _ref$style;
  return _react2.default.createElement('line', {
    style: style,
    x1: x1,
    x2: x2,
    y1: y1,
    y2: y2
  });
};

Line.propTypes = {
  style: _react2.default.PropTypes.object,
  x1: _react2.default.PropTypes.number,
  x2: _react2.default.PropTypes.number,
  y1: _react2.default.PropTypes.number,
  y2: _react2.default.PropTypes.number
};

exports.default = Line;