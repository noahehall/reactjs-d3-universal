'use strict';

var _react = require('../../node_modules/react/react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../node_modules/react-dom/index');

var _index2 = _interopRequireDefault(_index);

var _example = require('./example.js');

var _example2 = _interopRequireDefault(_example);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('../../node_modules/node-globals/dist/index').default({});

_index2.default.render(_react2.default.createElement(_example2.default, null), document.querySelector('#app'));