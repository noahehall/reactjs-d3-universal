'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.nodesArray=void 0;var _react=require('react'),_react2=_interopRequireDefault(_react),_packg=require('./packg.js'),_packg2=_interopRequireDefault(_packg);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var nodesArray=exports.nodesArray=function(_ref){var a=_ref.chartHeight,b=_ref.chartWidth,c=_ref.colorScale,e=_ref.id,f=_ref.labels,g=_ref.nodes,h=[];return g.forEach(function(i,j){return h.push(_react2.default.createElement(_packg2.default,{chartHeight:a,chartWidth:b,colorScale:c,d:i,id:e,idx:j,key:j,labels:f}))}),h};