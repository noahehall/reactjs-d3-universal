'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.format=exports.groupBy=exports.formatTime=void 0;var _extends=Object.assign||function(target){for(var source,i=1;i<arguments.length;i++)for(var key in source=arguments[i],source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key]);return target};var _time=require('./time.js'),time=_interopRequireWildcard(_time);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var formatTime=exports.formatTime=function(_ref){var a=_ref.data,_ref$timeProperty=_ref.timeProperty,b=void 0===_ref$timeProperty?'':_ref$timeProperty,_ref$xScaleTimeFormat=_ref.xScaleTimeFormat,c=void 0===_ref$xScaleTimeFormat?'':_ref$xScaleTimeFormat;if(!b||!c||appFuncs._.isEmpty(a))return appFuncs.logError({data:[a,b,c],loc:__filename,msg:'timeProperty and xScaleTimeFormat must be valid variables in data.formatTime(), returning data without transformations'}),a;var e=time.parse({format:c}),f=[];return a.forEach(function(g){return f.push(_extends({},g,_defineProperty({},b,e(g[b]))))}),f};var groupBy=exports.groupBy=function(_ref2){var _ref2$chartDataGroupB=_ref2.chartDataGroupBy,e=void 0===_ref2$chartDataGroupB?'':_ref2$chartDataGroupB,a=_ref2.data,b=_ref2.xScaleTime,c=_ref2.xScaleTimeFormat,_ref2$xValue=_ref2.xValue,f=void 0===_ref2$xValue?'':_ref2$xValue;if(appFuncs._.isEmpty(a)||!e)return appFuncs.logError({data:[e,a],loc:__filename,msg:'data and chartDataGroupBy must be valid variables in data.groupBy(), returning data without transformations'}),a;// group all values by groupby
var g=appFuncs._.groupBy(a,function(i){return i[e]});if(appFuncs._.isEmpty(g))return appFuncs.logError({data:[a,g],loc:__filename,msg:'could not create groups for data on key '+e+', returning data'}),a;// create object with values and keys for each lineValues group
var h=Object.keys(g).map(function(i){var j=[];// transform time if required
return b&&c&&(j=formatTime({data:g[i],timeProperty:f,xScaleTimeFormat:c})),{id:i,values:j.length?j:g[i]}});return h};var format=exports.format=function(_ref3){var _ref3$chartDataGroupB=_ref3.chartDataGroupBy,b=void 0===_ref3$chartDataGroupB?'':_ref3$chartDataGroupB,_ref3$chartType=_ref3.chartType,c=void 0===_ref3$chartType?'':_ref3$chartType,a=_ref3.data,_ref3$xScaleTime=_ref3.xScaleTime,e=void 0!==_ref3$xScaleTime&&_ref3$xScaleTime,_ref3$xScaleTimeForma=_ref3.xScaleTimeFormat,f=void 0===_ref3$xScaleTimeForma?'':_ref3$xScaleTimeForma,_ref3$xValue=_ref3.xValue,g=void 0===_ref3$xValue?'':_ref3$xValue;if(appFuncs._.isEmpty(a))return a;switch(c.toLowerCase()){case'forcedirectedgraph':/*
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
return b?groupBy({chartDataGroupBy:b,data:a,xScaleTime:e,xScaleTimeFormat:f,xValue:g}):e&&f?formatTime({data:a,timeProperty:g,xScaleTimeFormat:f}):a;// transform time and return
}};