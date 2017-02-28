'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.getSimulation=void 0;var _d=require('d3'),d3=_interopRequireWildcard(_d);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}// https://github.com/d3/d3-force
var getSimulation=exports.getSimulation=function(_ref){var _ref$chartDataGroupBy=_ref.chartDataGroupBy,a=void 0===_ref$chartDataGroupBy?'':_ref$chartDataGroupBy,_ref$chartHeight=_ref.chartHeight,b=void 0===_ref$chartHeight?200:_ref$chartHeight,_ref$chartWidth=_ref.chartWidth,c=void 0===_ref$chartWidth?200:_ref$chartWidth;return d3.forceSimulation()// default spacing, dont use if display text with eact circle
//.force("link", d3.forceLink().id((d) => d[chartDataGroupBy]))
// add extra spacing, e.g. for text
.force('link',d3.forceLink().id(function(e){return e[a]}).distance(150)// you need to create a count function, see docs
// this is required for a responsive graph
//.strength((d) => 1 / Math.min(count(d.source), count(d.target)))
).force('charge',d3.forceManyBody()).force('center',d3.forceCenter(c/2,b/2))};// forces bunches them together
// see here https://bl.ocks.org/shimizu/e6209de87cdddde38dadbb746feaf3a3
//.force("y", d3.forceY(0))
//.force("x", d3.forceX(0));