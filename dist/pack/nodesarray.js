'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.nodesArray=exports.createNest=exports.getDimensionOffsets=void 0;var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!(i&&_arr.length===i));_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i['return']&&_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}();/* eslint-disable */var _react=require('react'),_react2=_interopRequireDefault(_react),_packg=require('./packg.js'),_packg2=_interopRequireDefault(_packg),_d2=require('d3'),d3=_interopRequireWildcard(_d2);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
  * nodesArray - Description
  *
  * @param {number} [chartHeight=200] height of SVG
  * @param {number} [chartWidth=200]  width of SVG
  * @param {type}   [colorScale=empty function] function returning color
  * @param {string} [id=] id of this chart
  * @param {array}  [labels=[]] array of labels for each datum
  * @param {array}  [nodes=[]] array of nodes containing data for each circle and text
  *
  * @return {type} Description
  */var getDimensionOffsets=exports.getDimensionOffsets=function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return b+=a.x,c+=a.y,a.parent.parent?getDimensionOffsets(a.parent,b,c):[b,c,a]};var createNest=exports.createNest=function(a,b,c,d,e,f,g,h,i,j){switch(a.depth){case 0:break;case 1:{a.x-=h,a.y-=i;break}default:{var _getDimensionOffsets=getDimensionOffsets(a.parent),_getDimensionOffsets2=_slicedToArray(_getDimensionOffsets,2),k=_getDimensionOffsets2[0],l=_getDimensionOffsets2[1];a.x-=h+k,a.y-=i+l}}return _react2.default.createElement(_packg2.default,{chartHeight:b,chartWidth:c,colorScale:d,d:a,id:g,idx:e,key:e,labels:f},' ',a.children&&a.children.map(function(k,l){return createNest(k,b,c,d,l,f,g,h,i,j)}))};var nodesArray=exports.nodesArray=function(_ref){var _ref$chartHeight=_ref.chartHeight,a=void 0===_ref$chartHeight?200:_ref$chartHeight,_ref$chartWidth=_ref.chartWidth,b=void 0===_ref$chartWidth?200:_ref$chartWidth,_ref$colorScale=_ref.colorScale,c=void 0===_ref$colorScale?function(){return null}:_ref$colorScale,_ref$id=_ref.id,d=void 0===_ref$id?'':_ref$id,_ref$labels=_ref.labels,e=void 0===_ref$labels?[]:_ref$labels,_ref$nodes=_ref.nodes,f=void 0===_ref$nodes?[]:_ref$nodes;/*
  nodes.forEach((d, idx) =>
    nodeArray.push(
      <PackG
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        colorScale={colorScale}
        d={d}
        id={id}
        idx={idx}
        key={idx}
        labels={labels}
      />
    )
  );
  return nodeArray;
//*/return 1>f.length?null:createNest(f[0],a,b,c,1,e,d,f[0].children[0].parent.x,f[0].children[0].parent.y,f[0].children[0].parent.r)};