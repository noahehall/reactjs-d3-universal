'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = undefined;

var _d = require('../../node_modules/d3/build/d3.node');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var parse = exports.parse = function parse(_ref) {
  var _ref$format = _ref.format,
      format = _ref$format === undefined ? '' : _ref$format;

  if (!format) {
    appFuncs.logError({
      data: format,
      loc: __filename,
      msg: 'format must be valid variables in time.parse(), returning null'
    });

    return null;
  }

  return d3.timeParse(format);
};