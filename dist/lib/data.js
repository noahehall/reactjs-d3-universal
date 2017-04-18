'use strict';Object.defineProperty(exports,'__esModule',{value:!0});exports.format=exports.groupBy=exports.createDataValues=exports.sumGroupedData=exports.formatTime=exports.checkTimeFormat=void 0;var _extends=Object.assign||function(target){for(var source,i=1;i<arguments.length;i++)for(var key in source=arguments[i],source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key]);return target};var _time=require('./time.js'),time=_interopRequireWildcard(_time);function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;var newObj={};if(null!=obj)for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&(newObj[key]=obj[key]);return newObj.default=obj,newObj}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var checkTimeFormat=exports.checkTimeFormat=function(_ref){var c=_ref.data,f=_ref.parseTime,g=_ref.timeProperty,h=_ref.xScaleTimeFormat;try{return!f(c[0][g])&&time.format({format:h});// return parseTime(time.format({ format: xScaleTimeFormat })(new Date("Fri Mar 17 16:50:48 +0000 2017")))
}catch(i){return new Error('something went wrong accessing data[0]['+g+'] inside lib/data.js.checkTimeFormat(), or creating a time formatter with format '+h+', heres the message '+i.message)}};var formatTime=exports.formatTime=function(_ref2){var c=_ref2.data,_ref2$timeProperty=_ref2.timeProperty,f=void 0===_ref2$timeProperty?'':_ref2$timeProperty,_ref2$xScaleTimeForma=_ref2.xScaleTimeFormat,g=void 0===_ref2$xScaleTimeForma?'':_ref2$xScaleTimeForma;if(!f||!g||appFuncs._.isEmpty(c))return appFuncs.logError({data:[c,f,g],loc:__filename,msg:'timeProperty and xScaleTimeFormat must be valid variables in data.formatTime(), returning data without transformations'}),c;var h=time.parse({format:g}),i=[],j=checkTimeFormat({data:c,parseTime:h,timeProperty:f,xScaleTimeFormat:g});// parse time as is
return(j||c.forEach(function(k){return i.push(_extends({},k,_defineProperty({},f,h(k[f]))))}),j instanceof Error)?(appFuncs.logError({data:[c,f,g,j],loc:__filename,msg:j.message+', returning data without processing time, your chart is likely fucked up'}),c):(j&&c.forEach(function(k){return i.push(_extends({},k,_defineProperty({},f,h(j(new Date(k[f]))))))}),i)};var sumGroupedData=exports.sumGroupedData=function(_ref3){var c=_ref3.chartDataGroupBy,f=_ref3.data,g=_ref3.xValue,h=_ref3.yValue,i={};return f.forEach(function(j){var _i$j$g;i[j[g]]?(i[j[g]][h]+=j[h],i[j[g]].originalDataList.push(j)):i[j[g]]=(_i$j$g={},_defineProperty(_i$j$g,c,j[c]),_defineProperty(_i$j$g,'originalDataList',[j]),_defineProperty(_i$j$g,g,j[g]),_defineProperty(_i$j$g,h,j[h]),_i$j$g)}),Object.values(i).sort(function(j,k){return j.date-k.date})};// groups an array of objects by some property value
// returns an object where each property is an array of objects with a matching property  value
// in separate function for VM compiler optimization
var createDataValues=exports.createDataValues=function(_ref4){var c=_ref4.chartDataGroupBy,f=_ref4.data,g=void 0;try{g=appFuncs._.groupBy(f,function(h){if('undefined'==typeof h[c])throw new Error('key '+c+' does not exist in '+JSON.stringify(Object.keys(h))+'. exiting lib/data.groupBy. here is the entire object '+h);return h[c]})}catch(h){g=h}return g};var groupBy=exports.groupBy=function(_ref5){var _ref5$chartDataGroupB=_ref5.chartDataGroupBy,g=void 0===_ref5$chartDataGroupB?'':_ref5$chartDataGroupB,_ref5$chartDataSumGro=_ref5.chartDataSumGroupBy,h=void 0!==_ref5$chartDataSumGro&&_ref5$chartDataSumGro,c=_ref5.data,f=_ref5.xScaleTime,_ref5$xValue=_ref5.xValue,i=void 0===_ref5$xValue?'':_ref5$xValue,_ref5$yValue=_ref5.yValue,j=void 0===_ref5$yValue?'':_ref5$yValue;if(appFuncs._.isEmpty(c)||!g||!j)return appFuncs.logError({data:[g,j,c],loc:__filename,msg:'data and chartDataGroupBy and yValue must be valid variables in data.groupBy(), returning data without transformations'}),c;// group all values by chartDataGroupBy, each group is a line on a chart
var k=createDataValues({chartDataGroupBy:g,chartDataSumGroupBy:h,data:c,xValue:i,yValue:j});if(appFuncs._.isEmpty(k)||k instanceof Error)return appFuncs.logError({data:[c,k],loc:__filename,msg:'could not create groups for data on key '+g+', returning data'}),c;var l=appFuncs._.minBy(c,'date').date,m=appFuncs._.maxBy(c,'date').date,n=Math.abs(m-l),o=n/86400000,p=3600<o// 1985
?'%Y':360<o// Dec 1985
?'%b%Y':27<o// 12/12/85
?'%m%d%y':6<o// 12/12/85
?'%m%d%y':3<o// 23 06/31/85
?'%H%m%d%y'// 2356 06/31/85
:'%H%M%m%d%y',q=Object.keys(k).map(function(r){var s=[];// transform time if required
return f&&p&&(s=formatTime({data:k[r],timeProperty:i,xScaleTimeFormat:p})),s.length&&h&&j&&i&&(s=sumGroupedData({chartDataGroupBy:g,data:s,xValue:i,yValue:j})),{id:r,values:s.length?s:k[r]}});// create object with values and keys for each lineValues group
return q};var format=exports.format=function(_ref6){var _ref6$chartDataGroupB=_ref6.chartDataGroupBy,f=void 0===_ref6$chartDataGroupB?'':_ref6$chartDataGroupB,_ref6$chartDataSumGro=_ref6.chartDataSumGroupBy,_ref6$chartType=_ref6.chartType,h=void 0===_ref6$chartType?'':_ref6$chartType,c=_ref6.data,_ref6$xScaleTime=_ref6.xScaleTime,i=void 0!==_ref6$xScaleTime&&_ref6$xScaleTime,_ref6$xScaleTimeForma=_ref6.xScaleTimeFormat,j=void 0===_ref6$xScaleTimeForma?'':_ref6$xScaleTimeForma,_ref6$xValue=_ref6.xValue,k=void 0===_ref6$xValue?'':_ref6$xValue,_ref6$yValue=_ref6.yValue,l=void 0===_ref6$yValue?'':_ref6$yValue;if(appFuncs._.isEmpty(c))return c;switch(h.toLowerCase()){case'pack':return c;case'forcedirectedgraph':/*
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
      */return c;case'table':case'line':case'scatterplot':case'bar':case'pie':default:// Group data and return
return f?groupBy({chartDataGroupBy:f,chartDataSumGroupBy:void 0!==_ref6$chartDataSumGro&&_ref6$chartDataSumGro,data:c,xScaleTime:i,xScaleTimeFormat:j,xValue:k,yValue:l}):i&&j?formatTime({data:c,timeProperty:k,xScaleTimeFormat:j}):c;// transform time and return
}};