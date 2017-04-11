'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.Bars=void 0;var _rect=require('../svg/rect.js'),_react=require('react'),_react2=_interopRequireDefault(_react),_labels=require('../lib/labels.js'),label=_interopRequireWildcard(_labels);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Bars=exports.Bars=function(_ref){var _ref$chartHeight=_ref.chartHeight,g=void 0===_ref$chartHeight?200:_ref$chartHeight,a=_ref.colorScale,b=_ref.data,c=_ref.labels,_ref$yValue=_ref.yValue,h=void 0===_ref$yValue?'':_ref$yValue,e=_ref.xScale,f=_ref.yScale;if(!f||!e||!h)return appFuncs.logError({data:[e,f,h],loc:__filename,msg:'yScale, yValue and xScale must be valid variables in Bars(), returning null'}),null;var j=[];return b.forEach(function(k,l){// this is required for tick marks
var m=label.getLabelText({chartType:'bar',d:k,labels:c});j.push(_react2.default.createElement('g',{className:'bar',key:''+m.replace(/\s+/g,'-').toLowerCase()+l},_react2.default.createElement(_rect.Rect,{className:'rect',fill:a(l),height:g-f(k[h]),width:e.bandwidth()// `i * (barWidth + barOffset)` if you're not using scaleBands
,x:e(m),y:f(k[h])})))}),j};exports.default=Bars;