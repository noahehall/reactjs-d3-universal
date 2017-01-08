'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tr = undefined;

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tr = exports.Tr = function Tr(_ref) {
  var fields = _ref.fields,
      filterable = _ref.filterable,
      length = _ref.length,
      id = _ref.id,
      idx = _ref.idx,
      th = _ref.th;

  var cells = [];
  var i = 0;
  if (th && length && id && filterable) while (i < length) {
    cells.push(_react2.default.createElement(
      'th',
      { key: '' + id + i },
      _react2.default.createElement('input', {
        className: i === length - 1 ? 'flt_s' : 'flt',
        id: 'flt' + i + '_' + id,
        onKeyUp: appFuncs.filterTable.Filter,
        type: 'text'
      })
    ));
    i++;
  } else if (fields.length && th) fields.forEach(function (field, i2) {
    cells.push(_react2.default.createElement(
      'th',
      { key: '' + field + i2 },
      field
    ));
  });else if (!appFuncs._.isEmpty(fields)) for (var field in fields) {
    cells.push(_react2.default.createElement(
      'td',
      { key: '' + id + fields[field] + idx },
      fields[field]
    ));
  }return _react2.default.createElement(
    'tr',
    null,
    cells
  );
};

Tr.propTypes = {
  fields: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.object]),
  filterable: _react2.default.PropTypes.bool,
  id: _react2.default.PropTypes.string,
  idx: _react2.default.PropTypes.number,
  length: _react2.default.PropTypes.number,
  th: _react2.default.PropTypes.bool
};

exports.default = Tr;