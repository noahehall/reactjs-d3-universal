'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _createClass=function(){function defineProperties(target,props){for(var descriptor,i=0;i<props.length;i++)descriptor=props[i],descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,'value'in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();var _react=require('react'),_react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return call&&('object'==typeof call||'function'==typeof call)?call:self}function _inherits(subClass,superClass){if('function'!=typeof superClass&&null!==superClass)throw new TypeError('Super expression must either be null or a function, not '+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var Text=function(_React$Component){function Text(a){_classCallCheck(this,Text);var _this=_possibleConstructorReturn(this,(Text.__proto__||Object.getPrototypeOf(Text)).call(this,a));return _this.state={fontSize:'12px'},_initialiseProps.call(_this),_this.state={fontSize:'12px'},_this}return _inherits(Text,_React$Component),_createClass(Text,null,[{key:'defaultProps',get:function get(){return{d:{},labels:[]}}}]),_createClass(Text,[{key:'componentWillReceiveProps',value:function componentWillReceiveProps(a){appFuncs._.isEqual(a,this.props)||this.setSize(a)}/**
   * retrieves container dimensions from client and updates state which triggers redraw
   */},{key:'render',value:function render(){var _this2=this,_props=this.props,a=_props.d,b=_props.labels;return _react2.default.createElement('text',{className:'label',fontSize:this.state.fontSize,ref:function ref(c){return _this2.text=c},style:{display:'inline',fillOpacity:1},textAnchor:'middle'},a.data[b[0]])}}]),Text}(_react2.default.Component);Text.propTypes={d:_react2.default.PropTypes.object,labels:_react2.default.PropTypes.array};var _initialiseProps=function(){var _this3=this;this.setSize=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:_this3.props,// TODO: update this to get the formatted label
b=a.d.data[a.labels[0]].length,c=// eslint-disable-line
9<b?1:5<b?2.2:2.9,e=25*a.r*c/window.innerWidth;return!!(1<Math.abs(parseInt(_this3.state.fontSize)-e))&&_this3.setState({fontSize:e+'vw'})&&!0}};exports.default=Text;