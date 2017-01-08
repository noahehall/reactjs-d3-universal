'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Thead = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

var _tr = require('./tr.js');

var _tr2 = _interopRequireDefault(_tr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Thead = exports.Thead = function Thead(_ref) {
  var data0 = _ref.data0,
      filterable = _ref.filterable,
      id = _ref.id;

  var theadKeys = Object.keys(data0);

  return _react2.default.createElement(
    'thead',
    null,
    filterable && _react2.default.createElement(_tr2.default, { filterable: filterable, id: id, length: theadKeys.length, th: true }),
    _react2.default.createElement(_tr2.default, { fields: theadKeys, id: id, th: true })
  );
};

Thead.propTypes = {
  data0: _react2.default.PropTypes.object,
  filterable: _react2.default.PropTypes.bool,
  id: _react2.default.PropTypes.string
};

exports.default = Thead;