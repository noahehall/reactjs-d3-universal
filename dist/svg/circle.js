'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Circle = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Circle = exports.Circle = function Circle(_ref) {
  var _ref$className = _ref.className,
      className = _ref$className === undefined ? 'circle' : _ref$className,
      _ref$cx = _ref.cx,
      cx = _ref$cx === undefined ? 50 : _ref$cx,
      _ref$cy = _ref.cy,
      cy = _ref$cy === undefined ? 50 : _ref$cy,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'blue' : _ref$fill,
      _ref$r = _ref.r,
      r = _ref$r === undefined ? 50 : _ref$r;
  return _react2.default.createElement('circle', {
    className: className,
    cx: cx,
    cy: cy,
    fill: fill,
    r: r
  });
};

Circle.propTypes = {
  className: _react2.default.PropTypes.string,
  cx: _react2.default.PropTypes.number,
  cy: _react2.default.PropTypes.number,
  fill: _react2.default.PropTypes.string,
  r: _react2.default.PropTypes.number
};

exports.default = Circle;