'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Path = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Path = exports.Path = function Path(_ref) {
  var _ref$chartType = _ref.chartType,
      chartType = _ref$chartType === undefined ? 'pie' : _ref$chartType,
      d = _ref.d,
      _ref$fill = _ref.fill,
      fill = _ref$fill === undefined ? 'blue' : _ref$fill,
      _ref$id = _ref.id,
      id = _ref$id === undefined ? '' : _ref$id,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === undefined ? 'gray' : _ref$stroke;
  return _react2.default.createElement('path', {
    className: chartType + '-path',
    d: d,
    fill: fill,
    id: id,
    stroke: stroke
  });
};

Path.propTypes = {
  chartType: _react2.default.PropTypes.string,
  d: _react2.default.PropTypes.string.isRequired,
  fill: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  stroke: _react2.default.PropTypes.string
};

exports.default = Path;