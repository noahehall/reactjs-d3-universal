'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.ToolTip=void 0;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,'value'in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}();var _react=require('react'),_react2=_interopRequireDefault(_react),_d=require('d3'),d3=_interopRequireWildcard(_d);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError('Cannot call a class as a function')}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');return call&&('object'==typeof call||'function'==typeof call)?call:self}function _inherits(subClass,superClass){if('function'!=typeof superClass&&null!==superClass)throw new TypeError('Super expression must either be null or a function, not '+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var ToolTip=exports.ToolTip=function(_React$Component){function ToolTip(a){return _classCallCheck(this,ToolTip),_possibleConstructorReturn(this,(ToolTip.__proto__||Object.getPrototypeOf(ToolTip)).call(this,a))}return _inherits(ToolTip,_React$Component),_createClass(ToolTip,[{key:'componentDidMount',value:function componentDidMount(){// single tooltip used for all charts
var a=d3.select('body').append('section').style('background','black').style('border','2px red dashed').style('borderRadius','4px').style('opacity',0).style('padding','10px').style('position','absolute'),b=d3.transition().duration(250).delay(100).ease(d3.easePolyIn);// this needs to be inside somed3Component.on() mouseover & click
try{a.transition(b).style('opacity',1).style('color','white').style('left',d3.event.pageX+'px').style('top',d3.event.pageY+'px')}catch(c){// do nothing on err when too many interrupts of transitions
}a.html(d);// this needs to be inside somed3Component.on() mouseout
try{a.transition(b).style('opacity',0)}catch(c){appFuncs.console('dir')(c)}}}]),ToolTip}(_react2.default.Component);/*
// single tooltip used for all charts
const appToolTip = d3.select(`#${this.props.id}-tooltip`);

// consoles the data associated with the specific bar
barChart.on('click', (d) => appFuncs.console('dir')(d));
// changes fill color on mouseover
barChart.on('mouseover', function (d) { // eslint-disable-line
  const barColor = this.style.fill; // eslint-disable-line
  const thisItem = d3.select(this)
    .style('opacity', 0.7)
    .style('fill', 'green');

  // transition on
  const appToolTipTransitionOn = d3
    .transition()
    .duration(250)
    .delay(100)
    .ease(d3.easePolyIn);

  // transition off
  const appToolTipTransitionOff = d3
    .transition()
    .duration(100)
    .delay(100)
    .ease(d3.easePolyIn);

  try{
    appToolTip
      .transition(appToolTipTransitionOn)
      .style('opacity', 1)
      .style('color', 'white')
      .style('left', `${d3.event.pageX}px`)
      .style('top', `${d3.event.pageY}px`);
  } catch (err) {
    appFuncs.console('dir')(err);
  }

  appToolTip
    .html(d);

  thisItem.on('mouseout', function () { // eslint-disable-line
    thisItem
      .style('opacity', 1)
      .style('fill', barColor);

    try {
      // eslintignore if too many transitions, will throw err, read https://github.com/d3/d3-transition#the-life-of-a-transition
      d3.interrupt(appToolTip, appToolTipTransitionOn);

      if (appToolTip.style('opacity'))
        appToolTip
          .transition(appToolTipTransitionOff)
          .style('opacity', 0);
    } catch (err) {
      appFuncs.console('dir')(err);
    }
  });
});

 */