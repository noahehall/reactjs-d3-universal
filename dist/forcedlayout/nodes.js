"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.nodeGs=void 0;var _react=require("react"),_react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var nodeGs=exports.nodeGs=function(_ref){var a=_ref.chartDataGroupBy,b=_ref.colorScale,c=_ref.nodes,d=[];return c.forEach(function(e){return void 0!==e.x&&void 0!==e.y&&d.push(_react2.default.createElement("g",{key:e[a]},_react2.default.createElement("circle",{r:e.r||5,cx:e.x,cy:e.y,style:{fill:b(e.group),stroke:"#fff",strokeWidth:"1.5px"}}),_react2.default.createElement("text",{x:e.x,y:e.y},e[a])))}),d};/*
    on each circle suppose to call
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
    review how you did it in /lib/axes.js
  */