'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.nodesArray=exports.createNest=exports.getForeignObject=exports.getDimensionOffsets=void 0;var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!(i&&_arr.length===i));_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i['return']&&_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError('Invalid attempt to destructure non-iterable instance')}}();/* eslint-disable */var _react=require('react'),_react2=_interopRequireDefault(_react),_packg=require('./packg.js'),_packg2=_interopRequireDefault(_packg);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}/**
 * calculates x and y offsets when creating nested HTML hierarchy
 */var getDimensionOffsets=exports.getDimensionOffsets=function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;return b+=a.x,c+=a.y,!a.parent.parent?[b,c,a]:getDimensionOffsets(a.parent,b,c)};/**
 * retrieves foreign object if exists, else false
 */var getForeignObject=exports.getForeignObject=function(a){try{return a.data.children[0].metadata}catch(b){return[]}};/**
 * creates nested HTML hierarchy from pack nodes
 */var total=0;var createNest=exports.createNest=function(a,b,c,d,e,f,g,h,i){var j=!1;switch(a.depth){case 0:{j=!0;break}case 1:{j=!0,a.x-=h,a.y-=i;break}default:{var _getDimensionOffsets=getDimensionOffsets(a.parent),_getDimensionOffsets2=_slicedToArray(_getDimensionOffsets,2),k=_getDimensionOffsets2[0],l=_getDimensionOffsets2[1];a.x-=h+k,a.y-=i+l}}return _react2.default.createElement(_packg2.default,{nozoom:j,chartHeight:b,chartWidth:c,colorScale:d,d:a,id:g,idx:g+'-'+a.depth+'-'+e+'-'+ ++total,key:g+'-'+a.depth+'-'+e+'-'+ ++total,labels:f,foreignObject:getForeignObject(a)},a.children&&a.children.map(function(k){return createNest(k,b,c,d,++e,f,g,h,i)}))};/**
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
  */var nodesArray=exports.nodesArray=function(_ref){var _ref$chartHeight=_ref.chartHeight,a=void 0===_ref$chartHeight?200:_ref$chartHeight,_ref$chartWidth=_ref.chartWidth,b=void 0===_ref$chartWidth?200:_ref$chartWidth,_ref$colorScale=_ref.colorScale,c=void 0===_ref$colorScale?function(){return null}:_ref$colorScale,_ref$foreignObject=_ref.foreignObject,_ref$foreignObjectTyp=_ref.foreignObjectType,e=void 0===_ref$foreignObjectTyp?'':_ref$foreignObjectTyp,_ref$id=_ref.id,f=void 0===_ref$id?'':_ref$id,_ref$labels=_ref.labels,g=void 0===_ref$labels?[]:_ref$labels,_ref$nodes=_ref.nodes,h=void 0===_ref$nodes?[]:_ref$nodes;/* if you want the normal d3 nesting scheme (no nesting)
  // TODO: add 'nested' boolean property so users can switch between the two
  const nodeArray = [];
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
//*/return 1>h.length?null:createNest(h[0],a,b,c,1,g,f,h[0].children[0].parent.x,h[0].children[0].parent.y)};