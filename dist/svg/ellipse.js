'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ellipse = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ellipse = exports.Ellipse = function Ellipse(_ref) {
  var _ref$cx = _ref.cx,
      cx = _ref$cx === undefined ? 200 : _ref$cx,
      _ref$cy = _ref.cy,
      cy = _ref$cy === undefined ? 80 : _ref$cy,
      _ref$rx = _ref.rx,
      rx = _ref$rx === undefined ? 100 : _ref$rx,
      _ref$ry = _ref.ry,
      ry = _ref$ry === undefined ? 50 : _ref$ry,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 3
  } : _ref$style;
  return _react2.default.createElement('ellipse', {
    cx: cx,
    cy: cy,
    rx: rx,
    ry: ry,
    style: style
  });
};

Ellipse.propTypes = {
  cx: _react2.default.PropTypes.number,
  cy: _react2.default.PropTypes.number,
  rx: _react2.default.PropTypes.number,
  ry: _react2.default.PropTypes.number,
  style: _react2.default.PropTypes.object
};

exports.default = Ellipse;