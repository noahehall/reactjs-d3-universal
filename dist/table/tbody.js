'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tbody = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

var _tr = require('./tr.js');

var _tr2 = _interopRequireDefault(_tr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tbody = exports.Tbody = function Tbody(_ref) {
  var data = _ref.data,
      id = _ref.id;

  var rows = [];
  data.forEach(function (datum, idx) {
    return rows.push(_react2.default.createElement(_tr2.default, {
      fields: datum,
      id: id,
      idx: idx,
      key: 'row' + id + idx
    }));
  });

  return _react2.default.createElement(
    'tbody',
    null,
    rows
  );
};

Tbody.propTypes = {
  data: _react2.default.PropTypes.array,
  id: _react2.default.PropTypes.string
};

exports.default = Tbody;