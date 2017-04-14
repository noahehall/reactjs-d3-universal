'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.format=exports.groupBy=exports.createDataValues=exports.formatTime=exports.checkTimeFormat=void 0;var _extends=Object.assign||function(target){for(var source,i=1;i<arguments.length;i++)for(var key in source=arguments[i],source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key]);return target};var _time=require('./time.js'),time=_interopRequireWildcard(_time);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var checkTimeFormat=exports.checkTimeFormat=function(_ref){var a=_ref.data,b=_ref.parseTime,c=_ref.timeProperty,f=_ref.xScaleTimeFormat;try{return!b(a[0][c])&&time.format({format:f});// return parseTime(time.format({ format: xScaleTimeFormat })(new Date("Fri Mar 17 16:50:48 +0000 2017")))
}catch(g){return new Error('something went wrong accessing data[0]['+c+'] inside lib/data.js.checkTimeFormat(), or creating a time formatter with format '+f+', heres the message '+g.message)}};var formatTime=exports.formatTime=function(_ref2){var a=_ref2.data,_ref2$timeProperty=_ref2.timeProperty,b=void 0===_ref2$timeProperty?'':_ref2$timeProperty,_ref2$xScaleTimeForma=_ref2.xScaleTimeFormat,c=void 0===_ref2$xScaleTimeForma?'':_ref2$xScaleTimeForma;if(!b||!c||appFuncs._.isEmpty(a))return appFuncs.logError({data:[a,b,c],loc:__filename,msg:'timeProperty and xScaleTimeFormat must be valid variables in data.formatTime(), returning data without transformations'}),a;var f=time.parse({format:c}),g=[],h=checkTimeFormat({data:a,parseTime:f,timeProperty:b,xScaleTimeFormat:c});// parse time as is
return(h||a.forEach(function(i){return g.push(_extends({},i,_defineProperty({},b,f(i[b]))))}),h instanceof Error)?(appFuncs.logError({data:[a,b,c,h],loc:__filename,msg:h.message+', returning data without processing time, your chart is likely fucked up'}),a):(h&&a.forEach(function(i){return g.push(_extends({},i,_defineProperty({},b,f(h(new Date(i[b]))))))}),g)};// creates dataValues for groupBy()
// in separate function for VM compiler optimization
var createDataValues=exports.createDataValues=function(a,b){var c=void 0;try{c=appFuncs._.groupBy(a,function(f){if('undefined'==typeof f[b])throw new Error('key '+b+' does not exist in '+JSON.stringify(Object.keys(f))+'. exiting lib/data.groupBy. here is the entire object '+f);return f[b]})}catch(f){c=f}return c};var groupBy=exports.groupBy=function(_ref3){var _ref3$chartDataGroupB=_ref3.chartDataGroupBy,f=void 0===_ref3$chartDataGroupB?'':_ref3$chartDataGroupB,a=_ref3.data,b=_ref3.xScaleTime,c=_ref3.xScaleTimeFormat,_ref3$xValue=_ref3.xValue,g=void 0===_ref3$xValue?'':_ref3$xValue;if(appFuncs._.isEmpty(a)||!f)return appFuncs.logError({data:[f,a],loc:__filename,msg:'data and chartDataGroupBy must be valid variables in data.groupBy(), returning data without transformations'}),a;// group all values by chartDataGroupBy
var h=createDataValues(a,f);if(appFuncs._.isEmpty(h)||h instanceof Error)return appFuncs.logError({data:[a,h],loc:__filename,msg:'could not create groups for data on key '+f+', returning data'}),a;// create object with values and keys for each lineValues group
var i=Object.keys(h).map(function(j){var k=[];// transform time if required
return b&&c&&(k=formatTime({data:h[j],timeProperty:g,xScaleTimeFormat:c})),{id:j,values:k.length?k:h[j]}});return console.dir(['data groups',i,a]),i};var format=exports.format=function(_ref4){var _ref4$chartDataGroupB=_ref4.chartDataGroupBy,b=void 0===_ref4$chartDataGroupB?'':_ref4$chartDataGroupB,_ref4$chartType=_ref4.chartType,c=void 0===_ref4$chartType?'':_ref4$chartType,a=_ref4.data,_ref4$xScaleTime=_ref4.xScaleTime,f=void 0!==_ref4$xScaleTime&&_ref4$xScaleTime,_ref4$xScaleTimeForma=_ref4.xScaleTimeFormat,g=void 0===_ref4$xScaleTimeForma?'':_ref4$xScaleTimeForma,_ref4$xValue=_ref4.xValue,h=void 0===_ref4$xValue?'':_ref4$xValue;if(appFuncs._.isEmpty(a))return a;switch(c.toLowerCase()){case'pack':return a;case'forcedirectedgraph':/*
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