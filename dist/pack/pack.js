'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.pack=void 0;var _d=require('d3'),d3=_interopRequireWildcard(_d);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}/**
  * pack - https://github.com/d3/d3-hierarchy/blob/master/README.md#pack
  * Enclosure diagrams use containment (nesting) to represent a hierarchy.
  *
  * @param {number} [chartWidth=200] Width of SVG
  *
  * @return {type} d3 pack layout
  */var pack=exports.pack=function(_ref){var _ref$chartWidth=_ref.chartWidth,a=void 0===_ref$chartWidth?200:_ref$chartWidth,_ref$chartHeight=_ref.chartHeight,b=void 0===_ref$chartHeight?200:_ref$chartHeight;return d3.pack().size([a,b]).padding(function(c){return'undefined'==typeof c.data.padding?5:c.data.padding})};/* eslint-disable */