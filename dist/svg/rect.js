'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rect = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rect = exports.Rect = function Rect(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? 'rect' : _ref$className,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'blue' : _ref$fill,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 200 : _ref$height,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 200 : _ref$width,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y;
  return _react2.default.createElement('rect', {
    className: className,
    fill: fill,
    height: height,
    width: width,
    x: x,
    y: y
  });
};

Rect.propTypes = {
  className: _react2.default.PropTypes.string,
  fill: _react2.default.PropTypes.string,
  height: _react2.default.PropTypes.number,
  width: _react2.default.PropTypes.number,
  x: _react2.default.PropTypes.number,
  y: _react2.default.PropTypes.number
};

exports.default = Rect;