'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.format=exports.groupBy=exports.createDataValues=exports.formatTime=void 0;var _extends=Object.assign||function(target){for(var source,i=1;i<arguments.length;i++)for(var key in source=arguments[i],source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key]);return target};var _time=require('./time.js'),time=_interopRequireWildcard(_time);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var formatTime=exports.formatTime=function(_ref){var a=_ref.data,_ref$timeProperty=_ref.timeProperty,b=void 0===_ref$timeProperty?'':_ref$timeProperty,_ref$xScaleTimeFormat=_ref.xScaleTimeFormat,c=void 0===_ref$xScaleTimeFormat?'':_ref$xScaleTimeFormat;if(!b||!c||appFuncs._.isEmpty(a))return appFuncs.logError({data:[a,b,c],loc:__filename,msg:'timeProperty and xScaleTimeFormat must be valid variables in data.formatTime(), returning data without transformations'}),a;var f=time.parse({format:c}),g=[];return a.forEach(function(h){return g.push(_extends({},h,_defineProperty({},b,f(h[b]))))}),g};// creates dataValues for groupBy()
var createDataValues=exports.createDataValues=function(a,b){var c=void 0;try{c=appFuncs._.groupBy(a,function(f){if(f[b])return f[b];// TODO: ${d} shows up as [object object], toString() doesnt fix it, resolve later
throw new Error(f+' does not contain '+b+'. exiting lib/data.groupBy')})}catch(f){c=f}return c};var groupBy=exports.groupBy=function(_ref2){var _ref2$chartDataGroupB=_ref2.chartDataGroupBy,f=void 0===_ref2$chartDataGroupB?'':_ref2$chartDataGroupB,a=_ref2.data,b=_ref2.xScaleTime,c=_ref2.xScaleTimeFormat,_ref2$xValue=_ref2.xValue,g=void 0===_ref2$xValue?'':_ref2$xValue;if(appFuncs._.isEmpty(a)||!f)return appFuncs.logError({data:[f,a],loc:__filename,msg:'data and chartDataGroupBy must be valid variables in data.groupBy(), returning data without transformations'}),a;// group all values by groupby
var h=createDataValues(a);if(appFuncs._.isEmpty(h)||h instanceof Error)return appFuncs.logError({data:[a,h],loc:__filename,msg:'could not create groups for data on key '+f+', returning data'}),a;// create object with values and keys for each lineValues group
var i=Object.keys(h).map(function(j){var k=[];// transform time if required
return b&&c&&(k=formatTime({data:h[j],timeProperty:g,xScaleTimeFormat:c})),{id:j,values:k.length?k:h[j]}});return console.dir(['data values',h,i]),i};var format=exports.format=function(_ref3){var _ref3$chartDataGroupB=_ref3.chartDataGroupBy,b=void 0===_ref3$chartDataGroupB?'':_ref3$chartDataGroupB,_ref3$chartType=_ref3.chartType,c=void 0===_ref3$chartType?'':_ref3$chartType,a=_ref3.data,_ref3$xScaleTime=_ref3.xScaleTime,f=void 0!==_ref3$xScaleTime&&_ref3$xScaleTime,_ref3$xScaleTimeForma=_ref3.xScaleTimeFormat,g=void 0===_ref3$xScaleTimeForma?'':_ref3$xScaleTimeForma,_ref3$xValue=_ref3.xValue,h=void 0===_ref3$xValue?'':_ref3$xValue;if(appFuncs._.isEmpty(a))return a;switch(c.toLowerCase()){case'pack':return a;case'forcedirectedgraph':/*
      const
        links = data.links,
        nodeByGroup = data.nodes.map((node) => node[chartDataGroupBy]),
        nodes = data.nodes;

      links.forEach((link) => {
        const
          source = nodeByGroup.find((node) => { if (node) return node[link.source[chartDataGroupBy]]}),
          target = nodeByGroup.find((node) => { if (node) return node[link.target[chartDataGroupBy]]});

        links.push(
          { source, target },
          { source: intermediate, target },
        );
      });

      return { links, nodeByGroup, nodes };
      */return a;case'table':case'line':case'scatterplot':case'bar':case'pie':default:// Group data and return
return b?groupBy({chartDataGroupBy:b,data:a,xScaleTime:f,xScaleTimeFormat:g,xValue:h}):f&&g?formatTime({data:a,timeProperty:h,xScaleTimeFormat:g}):a;// transform time and return
}};