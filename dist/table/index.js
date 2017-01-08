'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

var _thead = require('./thead.js');

var _thead2 = _interopRequireDefault(_thead);

var _tbody = require('./tbody.js');

var _tbody2 = _interopRequireDefault(_tbody);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = exports.Table = function Table(_ref) {
  var className = _ref.className,
      data = _ref.data,
      id = _ref.id,
      filterable = _ref.filterable,
      sortable = _ref.sortable;

  var thisClassName = className ? className : '';
  if (sortable) thisClassName += ' sortable';

  return _react2.default.createElement(
    'table',
    { className: thisClassName, id: id },
    _react2.default.createElement(_thead2.default, {
      data0: data[0],
      filterable: filterable,
      id: id
    }),
    _react2.default.createElement(_tbody2.default, { data: data, id: id }),
    _react2.default.createElement(
      'tfoot',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement('td', null)
      )
    )
  );
};

Table.propTypes = {
  className: _react2.default.PropTypes.string,
  data: _react2.default.PropTypes.array,
  filterable: _react2.default.PropTypes.bool,
  id: _react2.default.PropTypes.string,
  sortable: _react2.default.PropTypes.bool
};

exports.default = Table;