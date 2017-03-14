'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.hierarchy=void 0;var _d=require('d3'),d3=_interopRequireWildcard(_d);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}/**
  * hierarchy - https://github.com/d3/d3-hierarchy
  *
  * @param {object} data an object representing the root node
  *
  * @returns {object} a root node
  */var hierarchy=exports.hierarchy=function(_ref){var _ref$data=_ref.data,c=void 0===_ref$data?{}:_ref$data;return d3.hierarchy(c,function(e){return e.children&&'metadata'!==e.children[0].type?e.children:null}).sum(function(e){return+e.size}).sort(function(e,f){return+f.value-+e.value})};