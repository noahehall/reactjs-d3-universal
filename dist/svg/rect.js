'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.Rect=void 0;var _react=require('react'),_react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Rect=exports.Rect=function(_ref){var _ref$className=_ref.className,a=void 0===_ref$className?'rect':_ref$className,_ref$fill=_ref.fill,b=void 0===_ref$fill?'blue':_ref$fill,_ref$height=_ref.height,c=void 0===_ref$height?200:_ref$height,_ref$width=_ref.width,d=void 0===_ref$width?200:_ref$width,_ref$x=_ref.x,e=void 0===_ref$x?0:_ref$x,_ref$y=_ref.y,f=void 0===_ref$y?0:_ref$y;return _react2.default.createElement('rect',{className:a,fill:b,height:c,width:d,x:e,y:f})};Rect.propTypes={className:_react2.default.PropTypes.string,fill:_react2.default.PropTypes.string,height:_react2.default.PropTypes.number,width:_react2.default.PropTypes.number,x:_react2.default.PropTypes.number,y:_react2.default.PropTypes.number};exports.default=Rect;