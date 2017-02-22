"use strict";Object.defineProperty(exports,"__esModule",{value:!0});exports.nodeGs=void 0;var _react=require("react"),_react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var nodeGs=exports.nodeGs=function(_ref){var a=_ref.nodes,b=_ref.colorScale;return a.map(function(c){return _react2.default.createElement("g",{key:c.id},_react2.default.createElement("circle",{r:5,cx:c.x,cy:c.y,style:{fill:b(c.group),stroke:"#fff",strokeWidth:"1.5px"}}),_react2.default.createElement("text",{x:c.x,y:c.y},c.id))})};/*
    on each circle suppose to call
    .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
    review how you did it in /lib/axes.js
  */