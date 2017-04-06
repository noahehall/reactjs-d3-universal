'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _createClass=function(){function defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,'value'in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();var _d=require('d3'),d3=_interopRequireWildcard(_d),_datalist=require('./datalist.js'),_datalist2=_interopRequireDefault(_datalist),_react=require('react'),_react2=_interopRequireDefault(_react),_stats=require('./stats.js'),_stats2=_interopRequireDefault(_stats),_label=require('./label.js'),_label2=_interopRequireDefault(_label);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return call&&('object'==typeof call||'function'==typeof call)?call:self}function _inherits(subClass,superClass){if('function'!=typeof superClass&&null!==superClass)throw new TypeError('Super expression must either be null or a function, not '+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}/* eslint-disable *//**
 * wraps a set of pack nodes inside a <g> element
 */var PackG=function(_React$Component){function PackG(a){_classCallCheck(this,PackG);var _this=_possibleConstructorReturn(this,(PackG.__proto__||Object.getPrototypeOf(PackG)).call(this,a));_initialiseProps.call(_this);var b=[];return _this.state={fontSize:'5px',opacity:1,pop:!1,previous:!1,r:0,scale:1,scaled:!1,scaling:!1,vizCon:!1,x:0,y:0,foreignObjects:b},a.foreignObject.length&&a.foreignObject.forEach(function(c,f){return b.push(_react2.default.createElement(_datalist2.default,{foreignObject:c,idx:f,key:f}))}),_this.state={fontSize:'5px',opacity:1,pop:!1,previous:!1,r:0,scale:1,scaled:!1,scaling:!1,vizCon:!1,x:0,y:0,foreignObjects:b},_this}return _inherits(PackG,_React$Component),_createClass(PackG,null,[{key:'defaultProps',get:function get(){return{colorScale:function colorScale(){return null},d:{},foreignObject:[],id:'',idx:'0',labels:[],nozoom:!1}}}]),_createClass(PackG,[{key:'componentDidMount',value:function componentDidMount(){var a=document.getElementById(this.props.id+'-visual-container').firstElementChild.firstElementChild;this.setState({pop:this.state.foreignObjects.length&&this.context.Popup.register({className:null,content:this.state.foreignObjects,title:null}),previous:this.g.previousElementSibling,vizCon:a})}/**
   * Queues a popup to be displayed
   *//**
   * updates x, y and r dimensions for a set of pack nodes
   *//**
   * zooms in/out of a pack node
   */},{key:'render',value:function render(){var _this2=this,_props=this.props,a=_props.colorScale,b=_props.d,c=_props.idx,f=_props.labels;return _react2.default.createElement('g',{className:'pack-g depth-'+b.depth,id:c,key:c,onClick:function onClick(h){h.stopPropagation(),_this2.props.nozoom||_this2.handleZoom()},ref:function ref(h){return _this2.g=h},style:{cursor:this.props.nozoom?'auto':'pointer',opacity:this.state.opacity,transform:'translate('+(this.state.x||this.props.d.x)+'px, '+(this.state.y||this.props.d.y)+'px) scale('+this.state.scale+')',transition:'transform 1s'}},// show label for white packs
2===b.depth&&_react2.default.createElement(_label2.default,{className:'pack-g-labeldepth-'+b.depth,d:b,idx:c,labels:['name'],scale:this.state.scale,r:b.r}),// show + icon
2===b.depth&&_react2.default.createElement('text',{className:'pack-g-handle depth-'+b.depth,textLength:'20',lengthAdjust:'spacing',style:{// TODO: add transform handle margin to modifiable props
transform:'translate(-'+(b.r+10)+'px) scale(1)',transition:'transform 1s',cursor:'pointer'}},1<this.state.scale?'-':'+'),_react2.default.createElement('circle',{className:'pack-g-circle depth-'+b.depth,r:this.props.d.r,style:{fill:b.children?a(b.depth):'white',stroke:'#fff',strokeWidth:'1.5px'},onClick:function onClick(){_this2.state.foreignObjects.length&&_this2.showPopup()}}),// show text for white packs
!b.children&&_react2.default.createElement(_label2.default,{className:'pack-g-circle-labeldepth-'+b.depth,d:b,idx:c,labels:f,scale:this.state.scale,r:b.r}),// show stats for foreignObjects
this.props.foreignObject.length&&_react2.default.createElement(_stats2.default,{className:'pack-g-circle-stats depth-'+b.depth,r:b.r,showPopup:this.showPopup,value:this.props.d.value+''}),this.props.children||null)}}]),PackG}(_react2.default.Component);PackG.propTypes={colorScale:_react2.default.PropTypes.func,d:_react2.default.PropTypes.object,foreignObject:_react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool,_react2.default.PropTypes.array]),id:_react2.default.PropTypes.string,idx:_react2.default.PropTypes.string,labels:_react2.default.PropTypes.array,nozoom:_react2.default.PropTypes.bool};PackG.contextTypes={Popup:_react2.default.PropTypes.func};var _initialiseProps=function(){var _this3=this;this.closePopup=function(){return _this3.context.Popup.prototype.handleButtonClick(function(a){return a.close()})},this.showPopup=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:_this3.context.Popup,b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:_this3.state.pop;return a.queue(b)},this.updateStateDimensions=function(){_this3.state.vizCon&&_this3.state.vizCon!==_this3.g&&(_this3.state.scaled?(_this3.setState({x:_this3.props.d.x,y:_this3.props.d.y,scale:1,scaled:!1}),setTimeout(function(){_this3.state.previous.parentNode.insertBefore(_this3.g,_this3.state.previous.nextSibling)},1e3)):_this3.setState({x:1,y:1,scale:_this3.props.chartWidth/2/_this3.props.d.r,scaled:!0}))},this.updateDimensions=function(){'undefined'==typeof window||_this3.props.foreignObject.length||(!_this3.state.scaled&&_this3.state.vizCon&&_this3.state.vizCon!==_this3.g&&_this3.state.vizCon.appendChild(_this3.g),window.requestAnimationFrame?window.requestAnimationFrame(_this3.updateStateDimensions):window.setTimeout(function(){return _this3.updateStateDimensions},1))},this.handleZoom=function(){_this3.updateDimensions()}};exports.default=PackG;