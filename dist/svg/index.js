'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVG = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SVG = exports.SVG = function SVG(_ref) {
  var children = _ref.children,
      _ref$id = _ref.id,
      id = _ref$id === undefined ? 'chart' : _ref$id,
      _ref$preserveAspectRa = _ref.preserveAspectRatio,
      preserveAspectRatio = _ref$preserveAspectRa === undefined ? 'xMinYMin meet' : _ref$preserveAspectRa,
      _ref$svgHeight = _ref.svgHeight,
      svgHeight = _ref$svgHeight === undefined ? 200 : _ref$svgHeight,
      _ref$svgWidth = _ref.svgWidth,
      svgWidth = _ref$svgWidth === undefined ? 200 : _ref$svgWidth;
  return _react2.default.createElement(
    'svg',
    {
      className: 'chart-svg',
      id: id,
      preserveAspectRatio: preserveAspectRatio,
      style: {
        display: 'block',
        position: 'relative'
      },
      viewBox: '0 0 ' + svgWidth + ' ' + svgHeight,
      xmlns: 'http://www.w3.org/2000/svg'
    },
    children
  );
};

SVG.propTypes = {
  children: _react2.default.PropTypes.node,
  id: _react2.default.PropTypes.string,
  preserveAspectRatio: _react2.default.PropTypes.string,
  svgHeight: _react2.default.PropTypes.number,
  svgWidth: _react2.default.PropTypes.number
};

exports.default = SVG;